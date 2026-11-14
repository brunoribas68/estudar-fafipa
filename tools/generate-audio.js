#!/usr/bin/env node
/* ===================== GERADOR DE ÁUDIO (Google Cloud Text-to-Speech) =====================
   Gera, uma única vez, um .mp3 por matéria com a teoria lida em voz natural (voz Neural2
   do Google), salvando em /audio. O app usa esses arquivos prontos — não chama a API
   toda vez que alguém clica em "Ouvir", então não gera custo repetido.

   Como usar:
     1. Confirme que existe um arquivo .env na raiz do projeto com:
          GOOGLE_API_KEY=sua_chave_aqui
          GOOGLE_TTS_VOICE=pt-BR-Neural2-A   (opcional, essa já é o padrão)
     2. Rode:  node tools/generate-audio.js
     3. Os arquivos aparecem em /audio/teoria-<materia>.mp3

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
    console.error('Crie um arquivo .env com a linha: GOOGLE_API_KEY=sua_chave');
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

// A API aceita até 5000 bytes de texto por chamada — quebramos por frase,
// respeitando esse limite, e depois juntamos os pedaços de áudio num só arquivo.
function chunkText(text, maxBytes){
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let cur = "";
  for(const s of sentences){
    const candidate = cur ? cur + " " + s : s;
    if(Buffer.byteLength(candidate, "utf8") > maxBytes){
      if(cur) chunks.push(cur);
      cur = s;
    } else {
      cur = candidate;
    }
  }
  if(cur) chunks.push(cur);
  return chunks;
}

function synthesize(apiKey, text, voiceName){
  return new Promise((resolve, reject)=>{
    const body = JSON.stringify({
      input: { text },
      voice: { languageCode: "pt-BR", name: voiceName },
      audioConfig: { audioEncoding: "MP3", speakingRate: 0.98 }
    });
    const options = {
      hostname: "texttospeech.googleapis.com",
      path: "/v1/text:synthesize?key=" + apiKey,
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
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
          resolve(Buffer.from(JSON.parse(data).audioContent, "base64"));
        }catch(e){ reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function main(){
  const env = loadEnv();
  const apiKey = env.GOOGLE_API_KEY;
  if(!apiKey){
    console.error("GOOGLE_API_KEY não está definida no .env");
    process.exit(1);
  }
  const voice = env.GOOGLE_TTS_VOICE || "pt-BR-Neural2-A";

  const TEORIA = loadTeoria();
  const outDir = path.join(ROOT, "audio");
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const materias = Object.keys(TEORIA);
  console.log(`Gerando áudio para ${materias.length} matérias, voz ${voice}...\n`);

  for(const materia of materias){
    const outFile = path.join(outDir, `teoria-${materia}.mp3`);
    if(fs.existsSync(outFile)){
      console.log(`⏭  ${materia} — já existe, pulando`);
      continue;
    }
    try{
      const text = htmlToPlainText(TEORIA[materia]);
      const chunks = chunkText(text, 4800);
      console.log(`🎙  ${materia} (${text.length} caracteres, ${chunks.length} parte(s))...`);
      const buffers = [];
      for(const chunk of chunks){
        buffers.push(await synthesize(apiKey, chunk, voice));
      }
      fs.writeFileSync(outFile, Buffer.concat(buffers));
      console.log(`   ✅ ${path.relative(ROOT, outFile)}`);
    }catch(err){
      console.error(`   ❌ erro em ${materia}: ${err.message}`);
    }
  }
  console.log("\nPronto. Os áudios ficam em /audio e o app já sabe usá-los automaticamente.");
}

main();
