/* ===================== VOZ (leitura em voz alta) =====================
   Usa a síntese de voz nativa do navegador (Web Speech API) em vez de um
   serviço de nuvem: funciona 100% offline, não depende de internet, e usa
   a melhor voz em português já instalada no seu computador — em Windows/Mac
   modernos isso costuma ser bem natural. */
const TTS_SUPPORTED = typeof window!=="undefined" && "speechSynthesis" in window;
let ttsVoices = [];
if(TTS_SUPPORTED){
  function loadVoices(){ ttsVoices = window.speechSynthesis.getVoices(); }
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function pickPtVoice(){
  const pt = ttsVoices.filter(v=>v.lang && v.lang.toLowerCase().startsWith("pt"));
  if(!pt.length) return null;
  const natural = pt.find(v=>/natural|online|neural|google/i.test(v.name));
  const br = pt.find(v=>v.lang.toLowerCase()==="pt-br");
  return natural || br || pt[0];
}
function htmlToPlainText(html){
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent.replace(/\s+/g," ").trim();
}
function speakText(text, btn){
  if(!TTS_SUPPORTED){ alert("Seu navegador não tem suporte a leitura em voz alta."); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "pt-BR";
  const v = pickPtVoice();
  if(v) utter.voice = v;
  utter.rate = 0.97;
  utter.pitch = 1.0;
  if(btn){
    utter.onstart = ()=>{ btn.textContent = "⏸️ Parar leitura"; };
    utter.onend = ()=>{ btn.textContent = "🔊 Ouvir este conteúdo"; };
    utter.onerror = ()=>{ btn.textContent = "🔊 Ouvir este conteúdo"; };
  }
  window.speechSynthesis.speak(utter);
}
function toggleSpeak(html, btn){
  if(window.speechSynthesis.speaking){
    window.speechSynthesis.cancel();
    btn.textContent = "🔊 Ouvir este conteúdo";
    return;
  }
  speakText(htmlToPlainText(html), btn);
}

/* ===================== ÁUDIO GRAVADO (voz natural, gerada 1x) =====================
   Dois provedores em paralelo pra comparar qualidade — cada um grava numa pasta própria
   (veja tools/generate-audio.js para o Gemini e tools/generate-audio-elevenlabs.js para a
   ElevenLabs). O app tenta cada um na ordem desta lista; o primeiro que tiver o arquivo pra
   aquela matéria é o que toca. Pra trocar de preferência (ex.: só ElevenLabs), basta reordenar
   ou remover itens aqui. Se nenhum provedor tiver áudio pra uma matéria ainda, cai pra voz do
   navegador (toggleSpeak) — pior, mas sempre funciona. */
const AUDIO_PROVIDERS = [
  { name: "elevenlabs", ext: "mp3" },
  { name: "gemini", ext: "wav" }
];
let theoryAudioEl = null;
function stopTheoryAudio(){
  if(theoryAudioEl){ theoryAudioEl.pause(); theoryAudioEl = null; }
}
function toggleTheoryAudio(materia, html, btn){
  if(theoryAudioEl && !theoryAudioEl.paused){
    stopTheoryAudio();
    btn.textContent = "🔊 Ouvir este conteúdo";
    return;
  }
  if(window.speechSynthesis && window.speechSynthesis.speaking){
    window.speechSynthesis.cancel();
    btn.textContent = "🔊 Ouvir este conteúdo";
    return;
  }
  btn.textContent = "⏳ Carregando áudio...";
  tryAudioProvider(0, materia, html, btn);
}
function tryAudioProvider(idx, materia, html, btn){
  if(idx >= AUDIO_PROVIDERS.length){
    // nenhum provedor tinha áudio gravado pra esta matéria — usa a voz do navegador
    toggleSpeak(html, btn);
    return;
  }
  const { name, ext } = AUDIO_PROVIDERS[idx];
  const audio = new Audio(`audio/${name}/teoria-${materia}.${ext}`);
  theoryAudioEl = audio;
  audio.addEventListener("playing", ()=>{ btn.textContent = "⏸️ Parar leitura"; });
  audio.addEventListener("ended", ()=>{ btn.textContent = "🔊 Ouvir este conteúdo"; theoryAudioEl = null; });
  audio.addEventListener("error", ()=>{
    theoryAudioEl = null;
    tryAudioProvider(idx + 1, materia, html, btn);
  });
  audio.play().catch(()=>{});
}

/* ===================== QUIZ ITEM (seleção + confirmação) =====================
   Antes, clicar numa alternativa já revelava a resposta na hora — fácil de
   responder errado sem querer. Agora: clica pra SELECIONAR, e só conta
   quando aperta "Confirmar resposta". */
function buildQuizItem(q, opts){
  const tagLabel = opts.tag;
  const explainId = opts.explainId;
  const trackStats = !!opts.trackStats;
  const el = document.createElement("div");
  el.className = "quiz-item";
  el.innerHTML = `<span class="quiz-tag">${tagLabel}</span>
    <div class="quiz-q">${q.enunciado}</div>
    <div class="quiz-opts">${q.opcoes.map((op,i)=>`<button class="quiz-opt" data-i="${i}">${String.fromCharCode(65+i)}) ${op}</button>`).join("")}</div>
    <div class="quiz-confirm-row">
      <button class="btn-primary quiz-confirm-btn" disabled>Confirmar resposta</button>
    </div>
    <div class="quiz-explain" id="${explainId}">${q.explicacao}</div>`;
  let selected = null;
  const optBtns = Array.from(el.querySelectorAll(".quiz-opt"));
  const confirmBtn = el.querySelector(".quiz-confirm-btn");
  optBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(el.dataset.answered) return;
      optBtns.forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
      selected = parseInt(btn.dataset.i,10);
      confirmBtn.disabled = false;
    });
  });
  confirmBtn.addEventListener("click", ()=>{
    if(el.dataset.answered || selected===null) return;
    el.dataset.answered = "1";
    const correct = selected===q.correta;
    optBtns[selected].classList.remove("selected");
    optBtns[selected].classList.add(correct?"correct":"wrong");
    if(!correct) optBtns[q.correta].classList.add("correct");
    optBtns.forEach(b=>b.disabled=true);
    confirmBtn.style.display = "none";
    document.getElementById(explainId).classList.add("show");
    if(trackStats){
      STORE.quizStats.attempted++;
      if(correct) STORE.quizStats.correct++;
      STORE.quizStats.byId[q.id] = correct;
      saveStore();
      if(typeof renderDashboard==="function") renderDashboard();
    }
  });
  return el;
}

/* ===================== STORAGE ===================== */
const STORE_KEY = "fafipa_estudos_v1";
function loadStore(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){ /* storage unavailable (private mode etc) */ }
  return {
    cards: {},       // id -> {due, interval, reps}
    quizStats: {attempted:0, correct:0, byId:{}},
    streak: {count:0, lastDay:null},
    cyclesToday: {day:null, count:0},
  };
}
function saveStore(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(STORE)); }catch(e){ /* ignore */ }
}
let STORE = loadStore();

function todayStr(){
  const d = new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}

/* streak bump once per day the app is opened/used */
function bumpStreak(){
  const t = todayStr();
  if(STORE.streak.lastDay === t) return;
  const y = new Date(); y.setDate(y.getDate()-1);
  const yStr = y.getFullYear()+"-"+String(y.getMonth()+1).padStart(2,"0")+"-"+String(y.getDate()).padStart(2,"0");
  if(STORE.streak.lastDay === yStr){ STORE.streak.count++; }
  else { STORE.streak.count = 1; }
  STORE.streak.lastDay = t;
  saveStore();
}
bumpStreak();

/* ===================== NAV ===================== */
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=> showTab(btn.dataset.tab));
});
function showTab(tab){
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active", p.id==="panel-"+tab));
  if(tab==="trilha") renderTrilha();
  if(tab==="flashcards") renderFlashcardPanel();
  if(tab==="quiz") renderQuizPanel();
  if(tab==="provas") renderProvasFafipa();
  if(tab==="dashboard") renderDashboard();
  if(tab==="cronograma") renderCronograma();
  if(tab==="dicas") renderDicas();
}
document.getElementById("go-review").addEventListener("click", ()=> showTab("flashcards"));

/* ===================== TRILHA (fluxo passo a passo tipo jogo) ===================== */
let trilhaState = null; // {date, stepIdx}

function dayProgress(){ STORE.dayProgress = STORE.dayProgress || {}; return STORE.dayProgress; }

function stepsForEntry(entry){
  if(entry.tipo==="prova") return ["fim"];
  if(entry.tipo==="simulado") return ["quiz","fim"];
  if(entry.tipo==="novo") return ["teoria","flashcards","quiz","fim"];
  return ["flashcards","quiz","fim"]; // revisao
}
const STEP_LABEL = {teoria:"Ler", flashcards:"Flashcards", quiz:"Questões", fim:"Concluir"};

function renderTrilha(){
  const area = document.getElementById("trilha-area");
  if(!trilhaState){
    renderTrilhaMap(area);
  } else {
    renderTrilhaStep(area);
  }
}

function renderTrilhaMap(area){
  const t = todayStr();
  const done = dayProgress();
  const map = CRONOGRAMA.map(entry=>{
    const isDone = !!done[entry.data];
    const isToday = entry.data===t;
    const isReview = entry.tipo==="revisao";
    let dotLabel = fmtDate(entry.data);
    if(isDone) dotLabel = "✓";
    return `<div class="node ${isDone?"done":""} ${isToday?"today":""} ${isReview?"review":""}" data-date="${entry.data}">
      <div class="node-dot">${dotLabel}</div>
      <div class="node-body">
        <div class="node-date">${fmtDate(entry.data)} · ${weekdayPt(entry.data)}${isToday?" · HOJE":""}</div>
        <div class="node-topic">${entry.topico}</div>
      </div>
      <div class="node-chevron">›</div>
    </div>`;
  }).join("");
  area.innerHTML = `
    <div class="trilha-intro">
      <h2>Sua trilha de estudo</h2>
      <p class="muted">Clique num dia para abrir o passo a passo: ler → praticar → testar → concluir. Pode escolher qualquer dia, não precisa ser em ordem.</p>
    </div>
    <div class="trilha-map">${map}</div>`;
  area.querySelectorAll(".node").forEach(n=>{
    n.addEventListener("click", ()=>{
      trilhaState = {date:n.dataset.date, stepIdx:0};
      renderTrilha();
    });
  });
}

function renderTrilhaStep(area){
  const entry = CRONOGRAMA.find(e=>e.data===trilhaState.date);
  const steps = stepsForEntry(entry);
  const step = steps[trilhaState.stepIdx];

  const dots = steps.map((s,i)=>{
    const cls = i<trilhaState.stepIdx ? "complete" : i===trilhaState.stepIdx ? "active" : "";
    return `<div class="step-dot ${cls}">${i<trilhaState.stepIdx ? "✓" : i+1}</div>`;
  }).join("");

  area.innerHTML = `
    <div class="step-flow">
      <div class="step-flow-header">
        <button class="back-link" id="trilha-back">← Voltar à trilha</button>
      </div>
      <div class="step-indicator">${dots}</div>
      <div class="step-title">${fmtDate(entry.data)} · ${entry.topico}</div>
      <div class="step-title-main">${STEP_LABEL[step]}</div>
      <div id="step-content"></div>
    </div>`;
  document.getElementById("trilha-back").addEventListener("click", ()=>{ window.speechSynthesis.cancel(); stopTheoryAudio(); trilhaState=null; renderTrilha(); });

  const content = document.getElementById("step-content");
  if(step==="teoria") renderStepTeoria(content, entry);
  else if(step==="flashcards") renderStepFlashcards(content, entry);
  else if(step==="quiz") renderStepQuiz(content, entry);
  else if(step==="fim") renderStepFim(content, entry);
}

function goToNextStep(entry){
  const steps = stepsForEntry(entry);
  trilhaState.stepIdx = Math.min(trilhaState.stepIdx+1, steps.length-1);
  renderTrilhaStep(document.getElementById("trilha-area"));
}

function renderStepTeoria(content, entry){
  const txt = TEORIA[entry.materia] || "<p>Sem material de teoria cadastrado para este dia — siga para a prática.</p>";
  const img = IMAGENS[entry.materia];
  content.innerHTML = `
    ${img ? `<div class="theory-image"><img src="images/${img}" alt="Diagrama de apoio — ${MATERIA_LABEL[entry.materia]||''}" /></div>` : ""}
    <div class="theory-box">
      <button class="speak-btn" id="speak-theory">🔊 Ouvir este conteúdo</button>
      ${txt}
    </div>
    <div class="mini-timer" id="mini-timer">
      <span class="mt-display" id="mt-display">12:00</span>
      <span class="mt-label">Quer cronometrar a leitura? Opcional — não precisa usar.</span>
      <button id="mt-start">Iniciar</button>
      <button id="mt-reset" class="secondary">Zerar</button>
    </div>
    <div class="step-nav">
      <span></span>
      <button class="btn-primary" id="step-next">Já li, continuar →</button>
    </div>`;
  initMiniTimer();
  document.getElementById("speak-theory").addEventListener("click", (e)=> toggleTheoryAudio(entry.materia, txt, e.target));
  document.getElementById("step-next").addEventListener("click", ()=>{ window.speechSynthesis.cancel(); stopTheoryAudio(); goToNextStep(entry); });
}

function renderStepFlashcards(content, entry){
  const t = todayStr();
  let queue;
  if(entry.materia) queue = FLASHCARDS.filter(c=>c.materia===entry.materia);
  else queue = FLASHCARDS.filter(c=>{ const st=STORE.cards[c.id]; return !st || st.due<=t; }).slice(0,10);
  if(queue.length===0) queue = FLASHCARDS.filter(c=>c.materia===entry.materia || true).slice(0,8);
  for(let i=queue.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [queue[i],queue[j]]=[queue[j],queue[i]]; }

  let idx = 0;
  content.innerHTML = `<div class="mini-step-area" id="mini-flash-wrap"></div>
    <div class="step-nav">
      <button class="btn-ghost" id="step-skip">Pular esta parte →</button>
      <button class="btn-primary" id="step-next" style="display:none;">Continuar →</button>
    </div>`;
  const wrap = document.getElementById("mini-flash-wrap");
  const nextBtn = document.getElementById("step-next");
  const skipBtn = document.getElementById("step-skip");

  function draw(){
    if(idx>=queue.length){
      wrap.innerHTML = `<p class="muted" style="text-align:center;">🎉 Cards deste bloco concluídos.</p>`;
      skipBtn.style.display="none"; nextBtn.style.display="inline-block";
      return;
    }
    const card = queue[idx];
    let shown=false;
    wrap.innerHTML = `
      <div class="deck-progress" style="text-align:center;">Card ${idx+1} de ${queue.length}</div>
      <div class="flashcard" id="mf-card">
        <span class="tag">${MATERIA_LABEL[card.materia]}</span>
        <button class="speak-mini" id="mf-speak">🔊</button>
        <div class="face" id="mf-face">${card.pergunta}</div>
        <div class="hint">clique para ver a resposta</div>
      </div>
      <div class="flash-grade" id="mf-grade" style="display:none;">
        <button class="grade-btn grade-hard" data-g="0">Difícil</button>
        <button class="grade-btn grade-ok" data-g="1">Médio</button>
        <button class="grade-btn grade-easy" data-g="2">Fácil</button>
      </div>`;
    document.getElementById("mf-speak").addEventListener("click", (e)=>{
      e.stopPropagation();
      speakText(htmlToPlainText(shown ? card.resposta : card.pergunta));
    });
    document.getElementById("mf-card").addEventListener("click", ()=>{
      if(shown) return; shown=true;
      document.getElementById("mf-face").innerHTML = card.resposta;
      document.getElementById("mf-face").classList.add("answer-face");
      document.getElementById("mf-grade").style.display="flex";
    });
    wrap.querySelectorAll(".grade-btn").forEach(b=>{
      b.addEventListener("click",(e)=>{
        e.stopPropagation();
        gradeCard(card, parseInt(b.dataset.g,10));
        idx++; draw();
      });
    });
  }
  draw();
  skipBtn.addEventListener("click", ()=> goToNextStep(entry));
  nextBtn.addEventListener("click", ()=> goToNextStep(entry));
}

function renderStepQuiz(content, entry){
  let list;
  if(entry.materia) list = QUIZZES.filter(q=>q.materia===entry.materia);
  else list = QUIZZES.slice();
  for(let i=list.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [list[i],list[j]]=[list[j],list[i]]; }
  const max = entry.tipo==="simulado" ? Math.min(15,list.length) : Math.min(5,list.length);
  list = list.slice(0,max);

  content.innerHTML = `<div id="mini-quiz-wrap"></div>
    <div class="step-nav">
      <span></span>
      <button class="btn-primary" id="step-next">Concluir este dia →</button>
    </div>`;
  const wrap = document.getElementById("mini-quiz-wrap");
  if(list.length===0){
    wrap.innerHTML = `<p class="muted">Ainda não há questões cadastradas para esta matéria — siga para concluir.</p>`;
  }
  list.forEach(q=>{
    const el = buildQuizItem(q, {tag: MATERIA_LABEL[q.materia], explainId: "exp-"+q.id+"-t", trackStats:true});
    wrap.appendChild(el);
  });
  if(entry.materia==="dir-tributario"){
    const note = document.createElement("p");
    note.className = "muted";
    note.style.textAlign = "center";
    note.innerHTML = `💡 Tem questões <strong>reais da FAFIPA</strong> sobre esse assunto — veja na aba "🏛️ Provas reais FAFIPA".`;
    wrap.appendChild(note);
  }
  document.getElementById("step-next").addEventListener("click", ()=> goToNextStep(entry));
}

function renderStepFim(content, entry){
  if(entry.tipo==="prova"){
    content.innerHTML = `<div class="complete-box">
      <span class="big-emoji">🏆</span>
      <h2>É hoje!</h2>
      <p class="muted">Chegou o dia da prova. Confie no que você estudou — você fez a trilha inteira para chegar até aqui.</p>
      <button class="btn-primary" id="back-map">Voltar à trilha</button>
    </div>`;
  } else {
    const d = dayProgress();
    const already = !!d[entry.data];
    d[entry.data] = true;
    saveStore();
    content.innerHTML = `<div class="complete-box">
      <span class="big-emoji">🎉</span>
      <h2>Dia concluído!</h2>
      <p class="muted">${already? "Você já tinha concluído este dia antes — reforço registrado!" : "Mais um passo na trilha. Hora de descansar a cabeça."}</p>
      <button class="btn-primary" id="back-map">Voltar à trilha</button>
    </div>`;
  }
  document.getElementById("back-map").addEventListener("click", ()=>{ trilhaState=null; renderTrilha(); renderDashboard(); });
}

/* mini timer usado dentro do passo "Ler" */
let mtInterval=null, mtSeconds=12*60;
function initMiniTimer(){
  clearInterval(mtInterval); mtInterval=null;
  mtSeconds = 12*60;
  document.getElementById("mt-display").textContent = fmtTime(mtSeconds);
  document.getElementById("mt-start").addEventListener("click", (e)=>{
    if(mtInterval) return;
    e.target.textContent="Pausar";
    mtInterval = setInterval(()=>{
      mtSeconds = Math.max(0, mtSeconds-1);
      document.getElementById("mt-display").textContent = fmtTime(mtSeconds);
      if(mtSeconds===0){ clearInterval(mtInterval); mtInterval=null; }
    },1000);
  });
  document.getElementById("mt-reset").addEventListener("click", ()=>{
    clearInterval(mtInterval); mtInterval=null;
    mtSeconds=12*60;
    document.getElementById("mt-display").textContent = fmtTime(mtSeconds);
    document.getElementById("mt-start").textContent="Iniciar";
  });
}

/* ===================== DASHBOARD ===================== */
function daysUntilExam(){
  const exam = new Date(EXAM_DATE+"T00:00:00");
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.round((exam-now)/86400000);
}
function dueCardsCount(){
  const t = todayStr();
  return FLASHCARDS.filter(c=>{
    const st = STORE.cards[c.id];
    return !st || st.due <= t;
  }).length;
}
function renderDashboard(){
  document.getElementById("stat-days").textContent = daysUntilExam();
  document.getElementById("stat-due").textContent = dueCardsCount();
  document.getElementById("stat-streak").textContent = STORE.streak.count + " 🔥";
  const qs = STORE.quizStats;
  document.getElementById("stat-answered").textContent = qs.attempted;
  document.getElementById("stat-accuracy").textContent = qs.attempted ? Math.round(100*qs.correct/qs.attempted)+"% de acerto" : "— % de acerto";

  // progress by matéria (cards marked "fácil" at least once / total)
  const byMateria = {};
  Object.keys(MATERIA_LABEL).forEach(m=>byMateria[m]={done:0,total:0});
  FLASHCARDS.forEach(c=>{
    byMateria[c.materia].total++;
    const st = STORE.cards[c.id];
    if(st && st.interval >= 4) byMateria[c.materia].done++;
  });
  const wrap = document.getElementById("materia-progress");
  wrap.innerHTML = "";
  Object.keys(byMateria).forEach(m=>{
    const {done,total} = byMateria[m];
    const pct = total ? Math.round(100*done/total) : 0;
    const row = document.createElement("div");
    row.className = "prog-row";
    row.innerHTML = `<div class="prog-top"><span>${MATERIA_LABEL[m]}</span><span>${pct}%</span></div>
      <div class="prog-track"><div class="prog-fill" style="width:${pct}%"></div></div>`;
    wrap.appendChild(row);
  });

  const t = todayStr();
  const todayEntry = CRONOGRAMA.find(c=>c.data===t);
  const todayBox = document.getElementById("today-topic");
  if(todayEntry){
    todayBox.innerHTML = `<p style="font-size:14px;margin:0 0 6px;"><strong>${fmtDate(todayEntry.data)}</strong> — ${todayEntry.topico}</p>
      <span class="crono-badge">${todayEntry.tipo==="novo"?"conteúdo novo":todayEntry.tipo==="revisao"?"revisão":todayEntry.tipo}</span>`;
  } else {
    todayBox.innerHTML = `<p class="muted">Fora do período do cronograma cadastrado.</p>`;
  }
}

/* ===================== FLASHCARDS (SM-2 simplificado) ===================== */
const deckFilter = document.getElementById("deck-filter");
function fillMateriaSelect(sel, withAll){
  sel.innerHTML = "";
  if(withAll){
    const o = document.createElement("option"); o.value="__all__"; o.textContent="Todos os cards (livre)"; sel.appendChild(o);
    const o2 = document.createElement("option"); o2.value="__due__"; o2.textContent="Para revisar hoje"; sel.appendChild(o2);
  }
  Object.keys(MATERIA_LABEL).forEach(m=>{
    const o = document.createElement("option"); o.value=m; o.textContent=MATERIA_LABEL[m]; sel.appendChild(o);
  });
}
fillMateriaSelect(deckFilter, true);
deckFilter.value = "__due__";
deckFilter.addEventListener("change", ()=>{ flashQueue = null; renderFlashcardPanel(); });

let flashQueue = null;
let flashIdx = 0;
let flashShowingAnswer = false;

function buildFlashQueue(){
  const val = deckFilter.value;
  const t = todayStr();
  let list;
  if(val==="__due__") list = FLASHCARDS.filter(c=>{ const st=STORE.cards[c.id]; return !st || st.due<=t; });
  else if(val==="__all__") list = FLASHCARDS.slice();
  else list = FLASHCARDS.filter(c=>c.materia===val);
  // shuffle lightly
  for(let i=list.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [list[i],list[j]]=[list[j],list[i]]; }
  flashQueue = list;
  flashIdx = 0;
}
function renderFlashcardPanel(){
  if(!flashQueue) buildFlashQueue();
  const area = document.getElementById("flashcard-area");
  if(flashIdx >= flashQueue.length){
    area.innerHTML = `<p class="muted">🎉 Você terminou este lote! Troque o filtro acima ou volte mais tarde para a próxima revisão.</p>`;
    return;
  }
  const card = flashQueue[flashIdx];
  flashShowingAnswer = false;
  area.innerHTML = `
    <div class="deck-progress">Card ${flashIdx+1} de ${flashQueue.length}</div>
    <div class="flashcard" id="flip-card">
      <span class="tag">${MATERIA_LABEL[card.materia]}</span>
      <button class="speak-mini" id="flip-speak">🔊</button>
      <div class="face" id="card-face">${card.pergunta}</div>
      <div class="hint">clique para ver a resposta</div>
    </div>
    <div class="flash-grade" id="grade-row" style="display:none;">
      <button class="grade-btn grade-hard" data-g="0">Difícil</button>
      <button class="grade-btn grade-ok" data-g="1">Médio</button>
      <button class="grade-btn grade-easy" data-g="2">Fácil</button>
    </div>`;
  document.getElementById("flip-speak").addEventListener("click", (e)=>{
    e.stopPropagation();
    speakText(htmlToPlainText(flashShowingAnswer ? card.resposta : card.pergunta));
  });
  document.getElementById("flip-card").addEventListener("click", ()=>{
    if(flashShowingAnswer) return;
    flashShowingAnswer = true;
    document.getElementById("card-face").innerHTML = card.resposta;
    document.getElementById("card-face").classList.add("answer-face");
    document.querySelector("#flip-card .hint").textContent = "resposta";
    document.getElementById("grade-row").style.display = "flex";
  });
  area.querySelectorAll(".grade-btn").forEach(b=>{
    b.addEventListener("click", (e)=>{
      e.stopPropagation();
      gradeCard(card, parseInt(b.dataset.g,10));
      flashIdx++;
      renderFlashcardPanel();
      renderDashboard();
    });
  });
}
function gradeCard(card, grade){
  const st = STORE.cards[card.id] || {interval:0, reps:0};
  let interval;
  if(grade===0) interval = 1;
  else if(grade===1) interval = Math.max(2, Math.round((st.interval||1)*1.5));
  else interval = Math.max(4, Math.round((st.interval||1)*2.3));
  const due = new Date(); due.setDate(due.getDate()+interval);
  STORE.cards[card.id] = {
    interval,
    reps: (st.reps||0)+1,
    due: due.getFullYear()+"-"+String(due.getMonth()+1).padStart(2,"0")+"-"+String(due.getDate()).padStart(2,"0")
  };
  saveStore();
}

/* ===================== QUIZ ===================== */
const quizFilter = document.getElementById("quiz-filter");
fillMateriaSelect(quizFilter, false);
(function(){ const o=document.createElement("option"); o.value="__all__"; o.textContent="Todas as matérias"; quizFilter.insertBefore(o, quizFilter.firstChild); quizFilter.value="__all__"; })();
quizFilter.addEventListener("change", renderQuizPanel);

function renderQuizPanel(){
  const val = quizFilter.value;
  const list = val==="__all__" ? QUIZZES : QUIZZES.filter(q=>q.materia===val);
  const area = document.getElementById("quiz-area");
  area.innerHTML = "";
  list.forEach(q=>{
    const el = buildQuizItem(q, {tag: MATERIA_LABEL[q.materia], explainId: "exp-"+q.id, trackStats:true});
    area.appendChild(el);
  });
}

/* ===================== PROVAS REAIS FAFIPA ===================== */
function renderProvasFafipa(){
  document.getElementById("provas-aviso").innerHTML =
    `São poucas as provas da FAFIPA publicamente disponíveis para cargos de fiscal tributário municipal.
    As questões abaixo vêm de uma prova real e recente da própria banca (FAFIPA 2025 — Prefeitura de
    Jaguapitã/PR — Agente Fiscal Tributário), reconstruídas a partir do PDF oficial. Onde o gabarito
    preliminar do PDF saiu ilegível, isso está dito na explicação, e a resposta foi conferida direto no CTN.`;
  const wrap = document.getElementById("provas-area");
  wrap.innerHTML = "";
  PROVAS_FAFIPA.forEach(q=>{
    const el = buildQuizItem(q, {tag: "🔵 "+q.fonte, explainId: "exp-"+q.id, trackStats:false});
    wrap.appendChild(el);
  });
}

/* ===================== POMODORO ===================== */
let timerInterval = null;
let timerSeconds = 0;
let onBreak = false;
const display = document.getElementById("timer-display");
const label = document.getElementById("timer-label");
const startBtn = document.getElementById("timer-start");
const pauseBtn = document.getElementById("timer-pause");
const resetBtn = document.getElementById("timer-reset");
const workMinInput = document.getElementById("work-min");
const breakMinInput = document.getElementById("break-min");

function fmtTime(s){
  const m = Math.floor(s/60), sec = s%60;
  return String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0");
}
function resetTimerDisplay(){
  onBreak = false;
  timerSeconds = parseInt(workMinInput.value||"12",10)*60;
  display.textContent = fmtTime(timerSeconds);
  label.textContent = "Pronta para focar?";
}
resetTimerDisplay();

function tick(){
  timerSeconds--;
  if(timerSeconds < 0){
    if(!onBreak){
      bumpCycle();
      onBreak = true;
      timerSeconds = parseInt(breakMinInput.value||"5",10)*60;
      label.textContent = "Pausa! Levante, beba água, mexa o corpo.";
      try{ new Audio(); }catch(e){}
    } else {
      onBreak = false;
      timerSeconds = parseInt(workMinInput.value||"12",10)*60;
      label.textContent = "De volta ao foco.";
    }
  }
  display.textContent = fmtTime(timerSeconds);
}
function bumpCycle(){
  const t = todayStr();
  if(STORE.cyclesToday.day !== t){ STORE.cyclesToday = {day:t, count:0}; }
  STORE.cyclesToday.count++;
  saveStore();
  document.getElementById("cycles-today").textContent = STORE.cyclesToday.count;
}
startBtn.addEventListener("click", ()=>{
  startBtn.disabled = true; pauseBtn.disabled = false;
  workMinInput.disabled = true; breakMinInput.disabled = true;
  label.textContent = onBreak ? "Pausa em andamento" : "Foco total nisso: " + (document.getElementById("task-input").value || "sua tarefa");
  timerInterval = setInterval(tick, 1000);
});
pauseBtn.addEventListener("click", ()=>{
  clearInterval(timerInterval);
  startBtn.disabled = false; pauseBtn.disabled = true;
  label.textContent = "Pausado — retome quando quiser.";
});
resetBtn.addEventListener("click", ()=>{
  clearInterval(timerInterval);
  startBtn.disabled = false; pauseBtn.disabled = true;
  workMinInput.disabled = false; breakMinInput.disabled = false;
  resetTimerDisplay();
});
(function initCycles(){
  const t = todayStr();
  if(STORE.cyclesToday.day === t) document.getElementById("cycles-today").textContent = STORE.cyclesToday.count;
})();

/* ===================== CRONOGRAMA ===================== */
function fmtDate(iso){
  const [y,m,d] = iso.split("-");
  return d+"/"+m;
}
function weekdayPt(iso){
  const names = ["dom","seg","ter","qua","qui","sex","sáb"];
  return names[new Date(iso+"T00:00:00").getDay()];
}
function renderCronograma(){
  const t = todayStr();
  const wrap = document.getElementById("cronograma-list");
  wrap.innerHTML = "";
  CRONOGRAMA.forEach(item=>{
    const div = document.createElement("div");
    div.className = "crono-item";
    if(item.tipo==="revisao") div.classList.add("sunday");
    if(item.data===t) div.classList.add("today");
    const badge = item.tipo==="novo" ? "conteúdo novo" : item.tipo==="revisao" ? "revisão" : item.tipo==="simulado" ? "simulado" : "PROVA";
    div.innerHTML = `<span class="crono-date">${fmtDate(item.data)} <span class="muted">(${weekdayPt(item.data)})</span></span>
      <span class="crono-topic">${item.topico}</span>
      <span class="crono-badge">${badge}</span>`;
    wrap.appendChild(div);
  });
}

/* ===================== DICAS ===================== */
function renderDicas(){
  const wrap = document.getElementById("dicas-content");
  wrap.innerHTML = "";
  DICAS.forEach(d=>{
    const div = document.createElement("div");
    div.className = "block";
    div.innerHTML = `<h3>${d.titulo}</h3><p>${d.corpo}</p><p class="source">Fonte: ${d.fonte}</p>`;
    wrap.appendChild(div);
  });
}

/* ===================== INIT ===================== */
renderDashboard();
renderTrilha();
