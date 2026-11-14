#!/usr/bin/env node
/* ===================== GERADOR DE ÁUDIO (TTS nativo do Gemini) =====================
   Gera, uma única vez, um .wav por matéria com a teoria lida em voz natural, salvando em
   /audio. O app usa esses arquivos prontos — não chama a API toda vez que alguém clica em
   "Ouvir", então não gera custo repetido.

   Usa a Generative Language API do Gemini (generativelanguage.googleapis.com), não a Cloud
   Text-to-Speech clássica — porque chaves geradas no Google AI Studio (o tipo mais comum
   pra quem usa Gemini/NotebookLM) só funcionam com essa API. Se você tiver uma chave de
   verdade do Google Cloud com a "Cloud Text-to-Speech API" ativada e faturamento vinculado,
   me avise que eu troco o script pra usar aquela (custa menos por caractere).

   Como usar:
     1. Copie .env.example para .env e cole sua chave em GOOGLE_API_KEY.
     2. Rode:  node tools/generate-audio.js
     3. Os arquivos aparecem em /audio/teoria-<materia>.wav

   Pode rodar de novo sem medo: matérias que já têm áudio gerado são puladas
   (apague o arquivo correspondente em /audio se quiser regenerar uma matéria específica).

   Para gerar áudio de outros conteúdos no futuro (flashcards, questões comentadas, dicas),
   é só duplicar o padrão deste script apontando para FLASHCARDS/QUIZZES/DICAS em data.js. */

const fs = require("fs");
const path = require("path");
const https = require("https");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

function loadEnv(){
  const envPath = path.join(ROOT, ".env");
  if(!fs.existsSync(envPath)){
    console.error("Não encontrei o arquivo .env na raiz do projeto.");
    console.error("Copie .env.example para .env e cole sua chave em GOOGLE_API_KEY.");
    process.exit(1);
  }
  const env = {};
  for(const line of fs.readFileSync(envPath, "utf8").split("\n")){
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*?)\s*$/);
    if(m && m[1] && !m[1].startsWith("#")) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function loadTeoria(){
  const code = fs.readFileSync(path.join(ROOT, "theory.js"), "utf8")
    .replace(/^const TEORIA/m, "var TEORIA")
    .replace(/^const IMAGENS/m, "var IMAGENS");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  if(!sandbox.TEORIA) throw new Error("Não consegui extrair TEORIA de theory.js");
  return sandbox.TEORIA;
}

function htmlToPlainText(html){
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Quebra o texto em pedaços menores (por frase) pra manter cada chamada rápida e segura.
function chunkText(text, maxChars){
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let cur = "";
  for(const s of sentences){
    const candidate = cur ? cur + " " + s : s;
    if(candidate.length > maxChars){
      if(cur) chunks.push(cur);
      cur = s;
    } else {
      cur = candidate;
    }
  }
  if(cur) chunks.push(cur);
  return chunks;
}

// Chama o Gemini pra gerar áudio (saída é PCM 16-bit bruto, sem cabeçalho).
function synthesizeGemini(apiKey, text, voiceName, model){
  return new Promise((resolve, reject)=>{
    const body = JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } }
      }
    });
    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${model}:generateContent`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
        "Content-Length": Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res=>{
      let data = "";
      res.on("data", d=> data += d);
      res.on("end", ()=>{
        if(res.statusCode !== 200){
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try{
          const json = JSON.parse(data);
          const part = json.candidates[0].content.parts[0];
          const pcm = Buffer.from(part.inlineData.data, "base64");
          const mime = part.inlineData.mimeType || "audio/L16;rate=24000";
          const rateMatch = mime.match(/rate=(\d+)/);
          const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;
          resolve({ pcm, sampleRate });
        }catch(e){
          reject(new Error("Resposta inesperada da API: " + e.message + " — " + data.slice(0, 400)));
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// O Gemini devolve PCM cru (sem cabeçalho) — embrulha num .wav pra ficar tocável.
function pcmToWav(pcmBuffer, sampleRate, numChannels, bitDepth){
  const byteRate = sampleRate * numChannels * bitDepth / 8;
  const blockAlign = numChannels * bitDepth / 8;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcmBuffer.length, 40);
  return Buffer.concat([header, pcmBuffer]);
}

async function main(){
  const env = loadEnv();
  const apiKey = env.GOOGLE_API_KEY;
  if(!apiKey){
    console.error("GOOGLE_API_KEY não está definida no .env");
    process.exit(1);
  }
  const voice = env.GOOGLE_TTS_VOICE || "Kore";
  const model = env.GOOGLE_TTS_MODEL || "gemini-2.5-flash-preview-tts";

  const TEORIA = loadTeoria();
  const outDir = path.join(ROOT, "audio", "gemini");
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Matérias com mais de um dia de conteúdo novo (ex.: Português tem 3 partes, Direito
  // Tributário tem 2) guardam a teoria como array em vez de texto único — uma entrada de
  // áudio por parte (teoria-<materia>-parteN.wav), pra não ler o texto errado no dia errado.
  const allMaterias = Object.keys(TEORIA);
  const jobs = [];
  for(const materia of allMaterias){
    const val = TEORIA[materia];
    if(Array.isArray(val)){
      val.forEach((texto, i)=> jobs.push({ materia, id: `${materia}-parte${i+1}`, texto }));
    } else {
      jobs.push({ materia, id: materia, texto: val });
    }
  }

  // O texto mais longo de teoria hoje tem ~3100 caracteres — usando um limite de 4000
  // por pedaço, cada parte cabe numa chamada só. Importa porque a conta gratuita do
  // Gemini tem cota bem curta por dia (10 chamadas/dia nesse modelo); cada chamada
  // economizada é uma parte a mais que dá pra gerar no mesmo dia.
  const filtro = process.argv.slice(2);
  const selected = filtro.length ? jobs.filter(j=>filtro.includes(j.materia)) : jobs;

  const pendentes = selected.filter(j=>!fs.existsSync(path.join(outDir, `teoria-${j.id}.wav`)));
  const prontas = selected.length - pendentes.length;
  console.log(`Partes de teoria: ${selected.length} selecionadas (${prontas} já prontas, ${pendentes.length} pendentes).`);
  console.log(`Modelo ${model}, voz ${voice}.`);
  if(filtro.length) console.log(`Filtro aplicado: ${filtro.join(", ")}`);
  console.log(`Dica: pra gerar só algumas matérias (rendendo a cota entre vários dias), rode:`);
  console.log(`  node tools/generate-audio.js ${allMaterias.slice(0,3).join(" ")}\n`);

  for(const job of selected){
    const outFile = path.join(outDir, `teoria-${job.id}.wav`);
    if(fs.existsSync(outFile)){
      console.log(`⏭  ${job.id} — já existe, pulando`);
      continue;
    }
    try{
      const text = htmlToPlainText(job.texto);
      const chunks = chunkText(text, 4000);
      console.log(`🎙  ${job.id} (${text.length} caracteres, ${chunks.length} parte(s))...`);
      let sampleRate = 24000;
      const pcmParts = [];
      for(const chunk of chunks){
        const r = await synthesizeGemini(apiKey, chunk, voice, model);
        sampleRate = r.sampleRate;
        pcmParts.push(r.pcm);
      }
      const wav = pcmToWav(Buffer.concat(pcmParts), sampleRate, 1, 16);
      fs.writeFileSync(outFile, wav);
      console.log(`   ✅ ${path.relative(ROOT, outFile)}`);
    }catch(err){
      console.error(`   ❌ erro em ${job.id}: ${err.message}`);
      if(/CREDENTIALS_MISSING|UNAUTHENTICATED|API key not valid|PERMISSION_DENIED/i.test(err.message)){
        console.error("   → Verifique se GOOGLE_API_KEY no .env é uma chave válida do Google AI Studio (ai.google.dev) com a API Gemini habilitada.");
      }
      if(/RESOURCE_EXHAUSTED|429|quota/i.test(err.message)){
        console.error("\n⚠️  Cota diária do Gemini esgotada. Parando aqui pra não desperdiçar tentativas —");
        console.error("    o que já foi gerado está salvo; rode o script de novo quando a cota renovar");
        console.error("    (o erro costuma trazer o tempo de espera em \"retryDelay\").");
        break;
      }
    }
  }
  console.log("\nPronto por agora. Os áudios gerados ficam em /audio/gemini e o app já sabe usá-los automaticamente.");
}

main();
