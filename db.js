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
   - Pra levar progresso de um navegador/computador pra outro (ex.: duas
     pessoas estudando, cada uma no seu aparelho), cada pessoa exporta só o
     PRÓPRIO progresso como um arquivo .json pequeno (ex.: progresso-bruno.json)
     e sobe no git/GitHub — como é um arquivo por pessoa, nunca dá conflito
     de merge (cada um só toca no próprio arquivo). A outra pessoa dá um git
     pull e importa esse .json; ele só atualiza/cria aquela pessoa no banco,
     sem apagar ninguém mais que já esteja salvo ali.
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

  let avisouFalhaSalvar = false;
  function persistDb(){
    try{
      localStorage.setItem(LS_DB_KEY, bytesToB64(db.export()));
    }catch(e){
      // localStorage indisponível/bloqueado ou sem espaço — avisa uma vez só,
      // pra não incomodar a cada ação, mas garante que a pessoa saiba que o
      // progresso não está sendo salvo entre sessões.
      if(!avisouFalhaSalvar){
        avisouFalhaSalvar = true;
        alert("Não consegui salvar seu progresso neste navegador (" + e.message + "). Use \"⬇️ Exportar backup\" ao terminar de estudar para não perder nada.");
      }
    }
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

  // Acha o nome já cadastrado que corresponde a "nome" ignorando maiúsculas/
  // minúsculas e espaços nas pontas (ex.: digitar "bruno" ou "Bruno " deve
  // achar o perfil já existente "Bruno" em vez de criar um novo do zero).
  function findExistingName(nome){
    const alvo = nome.trim().toLowerCase();
    return listPessoas().find(n => n.trim().toLowerCase() === alvo) || null;
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
      nome = findExistingName(nome) || nome; // reusa o perfil já existente, se houver
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
    exportPersonJSON(){
      if(!currentPerson){ alert("Escolha uma pessoa antes de exportar."); return; }
      const payload = {
        nome: currentPerson,
        store: currentStore,
        exportado_em: new Date().toISOString(),
      };
      const slug = currentPerson.trim().toLowerCase()
        .replace(/[^a-z0-9áàâãéèêíïóôõöúçñ\s-]/g,"")
        .replace(/\s+/g,"-");
      const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "progresso-"+slug+".json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
    importPersonJSON(file){
      const reader = new FileReader();
      reader.onload = function(){
        let payload;
        try{ payload = JSON.parse(reader.result); }
        catch(e){ alert("Não consegui ler esse arquivo como progresso válido: "+e.message); return; }
        if(!payload || typeof payload.nome !== "string" || !payload.nome.trim() || !payload.store){
          alert("Esse arquivo não parece ser um progresso exportado pelo app.");
          return;
        }
        const nome = findExistingName(payload.nome) || payload.nome.trim();
        upsertStoreFor(nome, payload.store); // só cria/atualiza essa pessoa, não toca nas outras
        if(nome === currentPerson) currentStore = payload.store;
        renderGateList();
        alert(`Progresso de "${nome}" importado!`+(nome===currentPerson ? " A página vai recarregar." : ""));
        if(nome === currentPerson) location.reload();
      };
      reader.readAsText(file);
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
    document.getElementById("person-export-btn").addEventListener("click", ()=> window.FAFIPA_DB.exportPersonJSON());
    document.getElementById("person-import-input").addEventListener("change", (e)=>{
      const f = e.target.files[0];
      if(f) window.FAFIPA_DB.importPersonJSON(f);
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

    let savedB64 = null, storageBlocked = false;
    try{ savedB64 = localStorage.getItem(LS_DB_KEY); }
    catch(e){ storageBlocked = true; }

    if(savedB64){
      try{ db = new SQL.Database(b64ToBytes(savedB64)); }
      catch(e){ db = new SQL.Database(); }
    } else {
      db = new SQL.Database();
    }
    ensureSchema();

    const known = listPessoas();
    renderGateList();

    if(storageBlocked){
      // o navegador bloqueou localStorage (ex.: modo privado/restrições de
      // privacidade) — o app funciona, mas nada vai ficar salvo ao fechar.
      statusEl.textContent = "⚠️ Seu navegador está bloqueando o salvamento local — o progresso não vai persistir ao fechar a página. Exporte um backup ao terminar.";
    } else {
      statusEl.textContent = known.length
        ? `${known.length} perfil${known.length>1?'s':''} salvo${known.length>1?'s':''} neste navegador.`
        : "";
    }

    let lastPerson = null;
    try{ lastPerson = localStorage.getItem(LS_PERSON_KEY); }catch(e){ /* ignore */ }
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
