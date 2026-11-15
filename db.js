/* ===================== BANCO DE DADOS (SQLite local) =====================
   Guarda o progresso de cada pessoa (trilha, flashcards, questões, simulados)
   num banco SQLite de verdade, rodando inteiramente no navegador via sql.js
   (vendor/sql-wasm-inline.js — wasm embutido no próprio arquivo, então
   funciona 100% offline, mesmo abrindo o index.html direto por file://).

   Como funciona:
   - Uma única tabela `pessoas (nome, store_json, criado_em, atualizado_em)` —
     cada linha guarda o progresso inteiro daquela pessoa como JSON (mesmo
     formato que o app já usava no localStorage antes).
   - O banco inteiro (os bytes do .db) fica persistido em localStorage entre
     sessões, e também pode ser exportado como um arquivo .db de verdade
     (botão "Exportar backup") pra guardar fora do navegador ou levar pra
     outro computador, e reimportado depois (botão "Importar backup").
   - No início, se já existe uma pessoa usada antes (lembrada no navegador),
     o app entra direto na trilha dela — só pede o nome de novo se for a
     primeira vez, se o navegador foi limpo, ou se a pessoa clicar em
     "⚙️ Trocar" pra trocar/criar outro perfil.
   - app.js inteiro agora está dentro de uma função startApp(), que só é
     chamada por aqui, depois que a pessoa certa já foi carregada. */

(function(){
  const LS_DB_KEY = "fafipa_db_v1";
  const LS_PERSON_KEY = "fafipa_current_person";

  let SQL = null, db = null, currentPerson = null, currentStore = null;

  function b64ToBytes(b64){
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i);
    return arr;
  }
  function bytesToB64(bytes){
    let bin = "";
    const chunk = 0x8000; // evita "Maximum call stack size exceeded" em bancos maiores
    for(let i=0;i<bytes.length;i+=chunk){
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i+chunk));
    }
    return btoa(bin);
  }

  function persistDb(){
    try{ localStorage.setItem(LS_DB_KEY, bytesToB64(db.export())); }
    catch(e){ /* ignore — segue funcionando só na memória desta sessão */ }
  }

  function ensureSchema(){
    db.run(`CREATE TABLE IF NOT EXISTS pessoas (
      nome TEXT PRIMARY KEY,
      store_json TEXT NOT NULL,
      criado_em TEXT NOT NULL,
      atualizado_em TEXT NOT NULL
    );`);
  }

  function listPessoas(){
    const res = db.exec("SELECT nome FROM pessoas ORDER BY atualizado_em DESC");
    return res.length ? res[0].values.map(r=>r[0]) : [];
  }

  function defaultStore(){
    return {
      cards: {},
      quizStats: {attempted:0, correct:0, byId:{}},
      streak: {count:0, lastDay:null},
      cyclesToday: {day:null, count:0},
    };
  }

  function getStoreFor(nome){
    const stmt = db.prepare("SELECT store_json FROM pessoas WHERE nome = ?");
    stmt.bind([nome]);
    let json = null;
    if(stmt.step()) json = stmt.getAsObject().store_json;
    stmt.free();
    if(!json) return defaultStore();
    try{ return JSON.parse(json); }catch(e){ return defaultStore(); }
  }

  function upsertStoreFor(nome, storeObj){
    const now = new Date().toISOString();
    db.run(
      `INSERT INTO pessoas (nome, store_json, criado_em, atualizado_em) VALUES (?,?,?,?)
       ON CONFLICT(nome) DO UPDATE SET store_json=excluded.store_json, atualizado_em=excluded.atualizado_em`,
      [nome, JSON.stringify(storeObj), now, now]
    );
    persistDb();
  }

  function activate(nome){
    currentPerson = nome;
    currentStore = getStoreFor(nome);
    upsertStoreFor(nome, currentStore); // garante a linha criada e "atualizado_em" em dia
    try{ localStorage.setItem(LS_PERSON_KEY, nome); }catch(e){ /* ignore */ }
    updateBadge();
    hideGate();
  }

  function showGate(){
    document.getElementById("person-gate").style.display = "flex";
    renderGateList();
  }
  function hideGate(){
    document.getElementById("person-gate").style.display = "none";
  }
  function updateBadge(){
    const badge = document.getElementById("person-badge");
    if(!badge) return;
    if(currentPerson){
      badge.style.display = "flex";
      document.getElementById("person-badge-name").textContent = "👤 "+currentPerson;
    }
  }
  function renderGateList(){
    const wrap = document.getElementById("person-gate-list");
    const names = listPessoas();
    wrap.innerHTML = names.length
      ? names.map(n=>`<button class="person-chip${n===currentPerson?' active':''}" data-name="${n.replace(/"/g,'&quot;')}">${n}</button>`).join("")
      : `<p class="muted" style="margin:0 0 10px;">Ainda não há ninguém cadastrado — digite seu nome abaixo.</p>`;
    wrap.querySelectorAll(".person-chip").forEach(b=>{
      b.addEventListener("click", ()=> window.FAFIPA_DB.selectPerson(b.dataset.name));
    });
  }

  window.FAFIPA_DB = {
    getStore(){ return currentStore; },
    setStore(storeObj){
      currentStore = storeObj;
      if(currentPerson) upsertStoreFor(currentPerson, storeObj);
    },
    getCurrentPerson(){ return currentPerson; },
    listPessoas,
    selectPerson(nome){
      nome = (nome||"").trim();
      if(!nome) return;
      const switching = window.__FAFIPA_STARTED__ && nome !== currentPerson;
      activate(nome);
      if(!window.__FAFIPA_STARTED__){
        window.__FAFIPA_STARTED__ = true;
        startApp();
      } else if(switching){
        // troca de pessoa no meio do uso: recarrega a página pra reiniciar com
        // segurança todo o estado em memória (trilha aberta, filtros, etc.)
        location.reload();
      }
    },
    exportDb(){
      persistDb();
      const blob = new Blob([db.export()], {type:"application/x-sqlite3"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "estudos-fafipa.db";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
    importDb(file){
      const reader = new FileReader();
      reader.onload = function(){
        try{
          db = new SQL.Database(new Uint8Array(reader.result));
          ensureSchema();
          persistDb();
          alert("Backup importado! A página vai recarregar.");
          location.reload();
        }catch(e){
          alert("Não consegui ler esse arquivo como backup válido: "+e.message);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  function wireGateUI(){
    document.getElementById("person-gate-enter").addEventListener("click", ()=>{
      const val = document.getElementById("person-gate-input").value;
      if(val.trim()) window.FAFIPA_DB.selectPerson(val);
    });
    document.getElementById("person-gate-input").addEventListener("keydown", (e)=>{
      if(e.key==="Enter"){ e.preventDefault(); document.getElementById("person-gate-enter").click(); }
    });
    document.getElementById("person-switch-btn").addEventListener("click", showGate);
    document.getElementById("person-export-btn").addEventListener("click", ()=> window.FAFIPA_DB.exportDb());
    document.getElementById("person-import-input").addEventListener("change", (e)=>{
      const f = e.target.files[0];
      if(f) window.FAFIPA_DB.importDb(f);
    });
  }

  async function init(){
    wireGateUI();
    const statusEl = document.getElementById("person-gate-status");
    try{
      SQL = await initSqlJs();
    }catch(e){
      statusEl.textContent = "Não consegui carregar o banco de dados local — o progresso não vai ser salvo nesta sessão.";
      return;
    }
    const savedB64 = localStorage.getItem(LS_DB_KEY);
    if(savedB64){
      try{ db = new SQL.Database(b64ToBytes(savedB64)); }
      catch(e){ db = new SQL.Database(); }
    } else {
      db = new SQL.Database();
    }
    ensureSchema();
    statusEl.textContent = "";

    const lastPerson = localStorage.getItem(LS_PERSON_KEY);
    const known = listPessoas();
    renderGateList();
    if(lastPerson && known.includes(lastPerson)){
      activate(lastPerson);
      window.__FAFIPA_STARTED__ = true;
      startApp();
    }
    // se não há ninguém lembrado, o gate (já visível por padrão) fica esperando
    // a pessoa escolher um chip ou digitar o nome.
  }

  init();
})();
