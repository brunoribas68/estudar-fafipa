#!/usr/bin/env node
/* ===================== GERADOR DE ÁUDIO (ElevenLabs) =====================
   Mesma ideia do tools/generate-audio.js (Gemini), só que usando a ElevenLabs em vez
   do Gemini — pra dar pra comparar qual voz soa melhor. Gera um .mp3 por matéria em
   /audio/elevenlabs, uma vez só.

   Como usar:
     1. Garanta que .env.local (na raiz do projeto) tem:
          ELEVENLABS_API_KEY=sua_chave_aqui
        (esse arquivo foi criado pelo `npx @elevenlabs/cli onboard init` — se não existir,
        rode esse comando primeiro ou copie .env.example pra ele.)
     2. Rode:  node tools/generate-audio-elevenlabs.js
     3. Os arquivos aparecem em /audio/elevenlabs/teoria-<materia>.mp3

   O app.js tenta primeiro a pasta elevenlabs e, se não achar o arquivo, cai pro gemini,
   e só usa a voz do navegador se nenhum dos dois tiver sido gerado pra aquela matéria.
   Pra trocar a ordem de preferência, edite AUDIO_PROVIDERS no topo do app.js. */

const fs = require("fs");
const path = require("path");
const https = require("https");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");

function loadEnv(){
  // ElevenLabs CLI usa .env.local; aceitamos .env.local OU .env (o que existir).
  const candidates = [path.join(ROOT, ".env.local"), path.join(ROOT, ".env")];
  const envPath = candidates.find(p=>fs.existsSync(p));
  if(!envPath){
    console.error("Não encontrei .env.local nem .env na raiz do projeto.");
    console.error("Rode: npx -y @elevenlabs/cli@latest onboard init  (ou copie .env.example)");
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

function synthesizeElevenLabs(apiKey, text, voiceId, modelId){
  return new Promise((resolve, reject)=>{
    const body = JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    });
    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${voiceId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
        "xi-api-key": apiKey,
        "Content-Length": Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res=>{
      const chunks = [];
      res.on("data", d=> chunks.push(d));
      res.on("end", ()=>{
        const buf = Buffer.concat(chunks);
        if(res.statusCode !== 200){
          reject(new Error(`HTTP ${res.statusCode}: ${buf.toString("utf8").slice(0,400)}`));
          return;
        }
        resolve(buf);
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main(){
  const env = loadEnv();
  const apiKey = env.ELEVENLABS_API_KEY;
  if(!apiKey){
    console.error("ELEVENLABS_API_KEY não está definida em .env.local / .env");
    process.exit(1);
  }
  // Voz padrão multilíngue (funciona bem em pt-BR com o modelo multilingual_v2).
  // Pra trocar, defina ELEVENLABS_VOICE_ID no .env.local com o ID de outra voz da sua conta.
  const voiceId = env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // "Rachel"
  const modelId = env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

  const TEORIA = loadTeoria();
  const outDir = path.join(ROOT, "audio", "elevenlabs");
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Matérias com mais de um dia de conteúdo novo guardam a teoria como array —
  // uma entrada de áudio por parte (teoria-<materia>-parteN.mp3).
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
  const filtro = process.argv.slice(2);
  const selected = filtro.length ? jobs.filter(j=>filtro.includes(j.materia)) : jobs;

  console.log(`Gerando áudio para ${selected.length} parte(s) de teoria — ElevenLabs, voz ${voiceId}, modelo ${modelId}...\n`);
  if(filtro.length) console.log(`Filtro aplicado: ${filtro.join(", ")}\n`);

  for(const job of selected){
    const outFile = path.join(outDir, `teoria-${job.id}.mp3`);
    if(fs.existsSync(outFile)){
      console.log(`⏭  ${job.id} — já existe, pulando`);
      continue;
    }
    try{
      const text = htmlToPlainText(job.texto);
      const chunks = chunkText(text, 2000);
      console.log(`🎙  ${job.id} (${text.length} caracteres, ${chunks.length} parte(s))...`);
      const buffers = [];
      for(const chunk of chunks){
        buffers.push(await synthesizeElevenLabs(apiKey, chunk, voiceId, modelId));
      }
      fs.writeFileSync(outFile, Buffer.concat(buffers));
      console.log(`   ✅ ${path.relative(ROOT, outFile)}`);
    }catch(err){
      console.error(`   ❌ erro em ${job.id}: ${err.message}`);
      if(/401|unauthorized|invalid_api_key/i.test(err.message)){
        console.error("   → Confira se ELEVENLABS_API_KEY em .env.local está certa e ativa.");
      }
    }
  }
  console.log("\nPronto. Os áudios ficam em /audio/elevenlabs e o app já sabe usá-los automaticamente.");
}

main();
