/* ===================== CONFIG ===================== */
const EXAM_DATE = "2026-12-06";

/* ===================== CRONOGRAMA ===================== */
// tipo: "novo" | "revisao" | "simulado" | "prova"
const CRONOGRAMA = [
  {data:"2026-11-02", tipo:"novo", materia:"portugues", parte:1, topico:"Português: interpretação, variação linguística, gêneros, coesão/coerência"},
  {data:"2026-11-03", tipo:"novo", materia:"portugues", parte:2, topico:"Português: ortografia, classes de palavras, semântica"},
  {data:"2026-11-04", tipo:"novo", materia:"portugues", parte:3, topico:"Português: funções sintáticas, concordância, pontuação, porquês, literatura"},
  {data:"2026-11-05", tipo:"novo", materia:"informatica", topico:"Informática completa"},
  {data:"2026-11-06", tipo:"novo", materia:"leg-municipal", topico:"Legislação Municipal de Curitiba"},
  {data:"2026-11-07", tipo:"novo", materia:"dir-constitucional", parte:1, topico:"Direito Constitucional (parte 1)"},
  {data:"2026-11-08", tipo:"revisao", materia:null, topico:"Revisão — sem conteúdo novo"},
  {data:"2026-11-09", tipo:"novo", materia:"dir-constitucional", parte:2, topico:"Direito Constitucional (parte 2)"},
  {data:"2026-11-10", tipo:"novo", materia:"dir-administrativo", parte:1, topico:"Direito Administrativo (parte 1)"},
  {data:"2026-11-11", tipo:"novo", materia:"dir-administrativo", parte:2, topico:"Direito Administrativo (parte 2)"},
  {data:"2026-11-12", tipo:"novo", materia:"raciocinio", topico:"Raciocínio Lógico + Estatística + Matemática Financeira"},
  {data:"2026-11-13", tipo:"novo", materia:"dir-tributario", parte:1, topico:"Direito Tributário, Teoria Geral (parte 1)"},
  {data:"2026-11-14", tipo:"novo", materia:"dir-tributario", parte:2, topico:"Direito Tributário, Teoria Geral (parte 2)"},
  {data:"2026-11-15", tipo:"revisao", materia:null, topico:"Revisão — sem conteúdo novo"},
  {data:"2026-11-16", tipo:"novo", materia:"issqn", topico:"ISSQN"},
  {data:"2026-11-17", tipo:"novo", materia:"demais-tributos", topico:"Demais Tributos Municipais + Legislação Tributária de Curitiba"},
  {data:"2026-11-18", tipo:"novo", materia:"pat-reforma", topico:"Processo Administrativo Tributário + Reforma Tributária do Consumo"},
  {data:"2026-11-19", tipo:"novo", materia:"contabilidade", topico:"Contabilidade (parte 1)"},
  {data:"2026-11-20", tipo:"novo", materia:"contab-publica", topico:"Contabilidade Pública / Orçamento Público"},
  {data:"2026-11-21", tipo:"novo", materia:"civil-empresarial", topico:"Direito Civil / Empresarial"},
  {data:"2026-11-22", tipo:"revisao", materia:null, topico:"Revisão — sem conteúdo novo"},
  {data:"2026-11-23", tipo:"novo", materia:"penal-lrf", topico:"Direito Penal Tributário + Finanças Públicas (LRF)"},
  {data:"2026-11-24", tipo:"novo", materia:"economia", topico:"Economia + metodologias de pesquisa econômica"},
  {data:"2026-11-25", tipo:"revisao", materia:"informatica", topico:"TI aplicada à fiscalização (revisão aprofundada)"},
  {data:"2026-11-26", tipo:"novo", materia:"governanca", topico:"Governança"},
  {data:"2026-11-27", tipo:"revisao", materia:"dir-tributario", topico:"Revisão geral: Direito Tributário completo"},
  {data:"2026-11-28", tipo:"revisao", materia:"portugues", topico:"Revisão geral: Português + Informática"},
  {data:"2026-11-29", tipo:"revisao", materia:null, topico:"Revisão — sem conteúdo novo"},
  {data:"2026-11-30", tipo:"revisao", materia:"dir-administrativo", topico:"Revisão geral: Const./Administrativo"},
  {data:"2026-12-01", tipo:"revisao", materia:"contabilidade", topico:"Revisão geral: Contabilidade/Orçamento/Economia"},
  {data:"2026-12-02", tipo:"simulado", materia:null, topico:"Simulado completo (estilo FAFIPA)"},
  {data:"2026-12-03", tipo:"revisao", materia:null, topico:"Revisão dirigida (pontos fracos do simulado)"},
  {data:"2026-12-04", tipo:"revisao", materia:null, topico:"Revisão leve + descanso mental"},
  {data:"2026-12-05", tipo:"revisao", materia:null, topico:"Véspera — leitura leve, sem conteúdo novo"},
  {data:"2026-12-06", tipo:"prova", materia:null, topico:"PROVA — Auditor Fiscal de Tributos Municipais"},
];

const MATERIA_LABEL = {
  "portugues":"Língua Portuguesa",
  "informatica":"Noções de Informática",
  "leg-municipal":"Legislação Municipal",
  "dir-constitucional":"Direito Constitucional",
  "dir-administrativo":"Direito Administrativo",
  "raciocinio":"Raciocínio Lógico / Estatística / Mat. Financeira",
  "dir-tributario":"Direito Tributário (Teoria Geral)",
  "issqn":"ISSQN",
  "demais-tributos":"Demais Tributos + Leg. Tributária Curitiba",
  "pat-reforma":"Processo Adm. Tributário + Reforma Tributária",
  "contabilidade":"Contabilidade",
  "contab-publica":"Contabilidade Pública / Orçamento Público",
  "civil-empresarial":"Direito Civil / Empresarial",
  "penal-lrf":"Direito Penal Tributário / LRF",
  "economia":"Economia / Pesquisa Econômica",
  "governanca":"Governança"
};

/* ===================== LINKS EXTERNOS ("Para saber mais") =====================
   Material de apoio fora do app (artigos e vídeos) pra fixar o conteúdo lendo/
   vendo de outra fonte, além da teoria daqui. `parte` é opcional — só filtra o
   link pras matérias divididas em várias partes (ver `entry.parte`); sem
   `parte`, o link aparece em qualquer dia daquela matéria.
   Todos os links abaixo foram verificados manualmente antes de entrar aqui —
   se algum link cair (site reestruturado, página removida), me avise que eu
   troco. */
const LINKS_EXTERNOS = {
  portugues: [
    {parte:1, titulo:"Estratégia Concursos — A importância da coesão para construir um texto de qualidade", url:"https://www.estrategiaconcursos.com.br/blog/a-importancia-da-coesao-para-construir-um-texto-de-qualidade/", tipo:"artigo"},
  ],
  informatica: [
    {titulo:"Estratégia Concursos — Tipos de backup (incremental x completo)", url:"https://www.estrategiaconcursos.com.br/blog/tipos-backup/", tipo:"artigo"},
  ],
  "dir-constitucional": [
    {parte:1, titulo:"STF — 'Direito sem juridiquês': entenda o que são os remédios constitucionais", url:"https://noticias.stf.jus.br/postsnoticias/explica-ai-stf-entenda-o-que-sao-os-remedios-constitucionais/", tipo:"artigo"},
  ],
  "dir-administrativo": [
    {parte:1, titulo:"Estratégia Concursos — Resumo de atos administrativos", url:"https://www.estrategiaconcursos.com.br/blog/resumo-de-atos-administrativos/", tipo:"artigo"},
  ],
  raciocinio: [
    {titulo:"Estratégia Concursos — Juros simples e compostos", url:"https://www.estrategiaconcursos.com.br/blog/juros-simples-compostos/", tipo:"artigo"},
  ],
  "dir-tributario": [
    {parte:2, titulo:"Estratégia Concursos — Decadência e prescrição no Direito Tributário, aplicações em concurso", url:"https://www.estrategiaconcursos.com.br/blog/decadencia-e-prescricao-no-direito-tributario-aplicacoes-em-concurso/", tipo:"artigo"},
  ],
  issqn: [
    {titulo:"Foco Tributário — Mudanças na LC 116/2003 quanto ao local da incidência do ISS", url:"https://focotributario.com.br/116-mudancas-na-lc-116-2003-quanto-ao-local-da-incidencia-do-iss/", tipo:"artigo"},
  ],
  "demais-tributos": [
    {titulo:"Jus.com.br — O ITBI: principais questões", url:"https://jus.com.br/artigos/1401/o-imposto-sobre-a-transmissao-de-bens-imoveis-itbi-principais-questoes", tipo:"artigo"},
  ],
  "pat-reforma": [
    {titulo:"Estratégia Concursos — Resumo sobre a Reforma Tributária (EC 132/2023)", url:"https://www.estrategiaconcursos.com.br/blog/resumo-sobre-ec-132-2023/", tipo:"artigo"},
  ],
  contabilidade: [
    {titulo:"Estratégia Concursos — Demonstração do Resultado do Exercício (DRE)", url:"https://www.estrategiaconcursos.com.br/blog/demonstracao-do-resultado-do-exercicio-dre/", tipo:"artigo"},
  ],
  "contab-publica": [
    {titulo:"Jus.com.br — PPA, LDO e LOA: leis da gestão fiscal no Brasil", url:"https://jus.com.br/artigos/114279/leis-orcamentarias-o-pilar-do-planejamento-e-controle-economico-no-brasil", tipo:"artigo"},
  ],
  "civil-empresarial": [
    {titulo:"Sebrae — MEI ou Simples Nacional: entenda as diferenças", url:"https://sebraepr.com.br/comunidade/artigo/mei-ou-simples-nacional-entenda-as-diferencas-para-o-empreendedor", tipo:"artigo"},
  ],
  "penal-lrf": [
    {titulo:"Jus.com.br — Crimes contra a ordem tributária (Lei nº 8.137/90)", url:"https://jus.com.br/artigos/51197/crimes-contra-a-ordem-tributaria-lei-n-8137-90", tipo:"artigo"},
  ],
};

/* ===================== FLASHCARDS ===================== */
// grade usa SM-2 simplificado: 0=difícil,1=médio,2=fácil
let idc = 1;
// `parte` é opcional — só usado nas matérias com teoria dividida em várias
// partes (ver CRONOGRAMA). Card sem `parte` aparece em qualquer dia da matéria;
// card com `parte` só aparece no dia daquele trecho específico, pra não repetir
// o mesmo card em dias diferentes de uma matéria longa.
function fc(materia, pergunta, resposta, parte){ return {id:"fc"+(idc++), materia, pergunta, resposta, parte}; }

const FLASHCARDS = [
  // Português — parte 1 (interpretação, coesão/coerência, variação linguística, gêneros)
  fc("portugues","O que é coesão textual?","É a ligação gramatical entre as partes do texto (uso de pronomes, conectivos, repetição controlada) que garante que as frases se encadeiem.",1),
  fc("portugues","Diferencie coesão de coerência.","Coesão é a ligação gramatical/lexical entre as partes do texto; coerência é o sentido lógico global, a compreensão unificada do texto como um todo.",1),
  fc("portugues","Cite 3 tipos de gêneros textuais comuns em provas.","Narrativo, dissertativo-argumentativo, descritivo, injuntivo (instrucional), expositivo.",1),
  fc("portugues","O que é variação linguística?","É a forma como a língua muda conforme região, classe social e grau de formalidade — não existe 'errado', existe adequado ou inadequado ao contexto.",1),

  // Português — parte 2 (ortografia, classes de palavras, semântica, regência, crase)
  fc("portugues","Qual a regra geral do 'porquê' separado e com acento, no fim de frase?","'Por que' (separado, sem acento) é usado em perguntas e antes de substantivo oculto; 'porquê' (junto, com acento) é substantivo, geralmente antecedido de artigo: 'o porquê'.",2),
  fc("portugues","Qual a regra prática pra saber se há crase antes de uma palavra feminina?","Troque a palavra feminina por uma masculina equivalente: se aparecer 'ao', há crase ('Fui à prefeitura' / 'Fui ao órgão').",2),
  fc("portugues","'Assistir' pede a preposição 'a' sempre?","Não — só quando significa 'ver' ('assisti ao filme'); quando significa 'ajudar' ou 'morar', não pede preposição.",2),
  fc("portugues","O que é polissemia?","É a capacidade de uma mesma palavra ter vários sentidos diferentes conforme o contexto.",2),

  // Português — parte 3 (funções sintáticas, concordância, pontuação, literatura)
  fc("portugues","O que é concordância verbal com sujeito composto anteposto ao verbo?","O verbo geralmente vai para o plural quando o sujeito composto vem antes dele: 'João e Maria chegaram'.",3),
  fc("portugues","Dê um exemplo de função sintática do predicativo do sujeito.","Em 'A água é a mãe', 'a mãe' é predicativo do sujeito — atribui uma característica/identidade ao sujeito através de verbo de ligação.",3),
  fc("portugues","Por que 'o adjunto adnominal' não é a mesma coisa que 'o complemento nominal'?","Adjunto adnominal modifica um substantivo e é ligado a termos de sentido completo; complemento nominal completa o sentido de um nome de sentido incompleto (geralmente exige preposição).",3),
  fc("portugues","Cite um erro clássico de pontuação cobrado em prova.","Vírgula separando sujeito do predicado, ou o verbo do seu complemento, sem motivo — ex.: 'O candidato, fez a prova' (errado).",3),

  // Informática
  fc("informatica","Diferencie hardware de software.","Hardware é a parte física do computador (CPU, memória, periféricos); software é o conjunto de programas e sistemas que o fazem funcionar."),
  fc("informatica","O que faz o atalho Ctrl+F?","Abre a caixa de localizar/buscar palavra em um documento ou página."),
  fc("informatica","O que é uma referência absoluta no Excel? Dê a notação.","É uma referência de célula que não muda ao copiar a fórmula para outras células; é fixada com o símbolo de cifrão antes da letra e do número (ex.: coluna e linha fixas)."),
  fc("informatica","O que é phishing?","Fraude em que o golpista se passa por instituição confiável para obter dados pessoais via e-mail ou link falso."),
  fc("informatica","HTTPS garante o quê na navegação?","Uma conexão criptografada entre o navegador e o servidor, protegendo os dados transmitidos."),
  fc("informatica","O que são 'alucinações' em IA generativa?","Respostas geradas com aparência de certeza, mas que contêm informações incorretas — por isso sempre exigem verificação humana."),

  // Legislação Municipal
  fc("leg-municipal","O que é a Lei Orgânica do Município?","É a norma fundamental de organização político-administrativa do Município, equivalente a uma 'Constituição' municipal."),
  fc("leg-municipal","Qual lei trata do Estatuto dos Funcionários Públicos de Curitiba?","A Lei Municipal nº 1.656/1958."),
  fc("leg-municipal","O que a Lei Municipal 7.671/1991 organiza?","A estrutura administrativa do Poder Executivo de Curitiba (secretarias e órgãos)."),
  fc("leg-municipal","Quem fiscaliza as contas do Município?","A Câmara Municipal, com auxílio do Tribunal de Contas do Estado."),
  fc("leg-municipal","O que caracteriza a autonomia municipal?","Auto-organização (lei orgânica própria), autogoverno, autolegislação e autoadministração."),
  fc("leg-municipal","O Município tem Poder Judiciário próprio?","Não. A Justiça é estadual ou federal; o Município só tem Executivo e Legislativo."),

  // Direito Constitucional
  // Dir. Constitucional — parte 1 (princípios fundamentais, direitos, remédios, organização dos Poderes)
  fc("dir-constitucional","Quais são as formas de Estado e de governo do Brasil?","Forma de Estado: federativa. Forma de governo: república. Sistema: presidencialista.",1),
  fc("dir-constitucional","O que garante o mandado de segurança?","Protege direito líquido e certo não amparado por habeas corpus ou habeas data.",1),
  fc("dir-constitucional","Cite os entes da organização político-administrativa (art. 18, CF).","União, Estados, Distrito Federal e Municípios, todos autônomos.",1),
  fc("dir-constitucional","O Município tem Poder Judiciário próprio?","Não — o Município tem autonomia (auto-organização, autogoverno, autolegislação, autoadministração), mas não possui Judiciário próprio.",1),

  // Dir. Constitucional — parte 2 (Administração Pública, LIMPE, Tribunais de Contas)
  fc("dir-constitucional","Quais são os princípios da Administração Pública no art. 37 da CF? (sigla)","LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência.",2),
  fc("dir-constitucional","Quando o servidor efetivo adquire estabilidade?","Após 3 anos de efetivo exercício, com avaliação de desempenho satisfatória.",2),
  fc("dir-constitucional","A responsabilidade civil do Estado é objetiva ou subjetiva?","Objetiva — independe de culpa do agente; cabe direito de regresso contra o agente em caso de dolo ou culpa.",2),
  fc("dir-constitucional","Quem julga as contas de governo do Prefeito e quem julga as contas de gestão de outros administradores?","O Tribunal de Contas só emite PARECER PRÉVIO sobre as contas do Prefeito — quem julga é a Câmara Municipal. Já as contas de gestão de outros administradores são julgadas pelo próprio Tribunal de Contas.",2),

  // Direito Administrativo
  // Dir. Administrativo — parte 1 (regime jurídico, atos administrativos, invalidação)
  fc("dir-administrativo","Diferencie anulação de revogação.","Anulação extingue ato ilegal, com efeito retroativo (ex tunc). Revogação extingue ato legal mas inconveniente, com efeito ex nunc, e só a Administração pode revogar.",1),
  fc("dir-administrativo","O que é presunção de legitimidade do ato administrativo?","O ato se presume legal e verdadeiro até prova em contrário.",1),
  fc("dir-administrativo","Diferencie ato vinculado de ato discricionário.","No vinculado a lei não deixa margem de escolha; no discricionário há margem de escolha quanto a oportunidade e conveniência, dentro dos limites legais.",1),
  fc("dir-administrativo","O que é convalidação de um ato administrativo?","É a correção de um defeito sanável do ato, com efeito retroativo — diferente da anulação, que o extingue.",1),

  // Dir. Administrativo — parte 2 (poderes, organização, licitações, improbidade, controle)
  fc("dir-administrativo","O que é poder de polícia?","Poder da Administração de limitar o exercício de direitos individuais em favor do interesse coletivo (ex.: fiscalização sanitária, tributária).",2),
  fc("dir-administrativo","O que mudou na Lei de Improbidade (LIA) com a reforma de 2021 para danos ao erário?","Passou a exigir dolo (não basta mais culpa) para caracterizar ato de improbidade que causa prejuízo ao erário.",2),
  fc("dir-administrativo","Qual a modalidade padrão de licitação para bens e serviços comuns (Lei 14.133/2021)?","Pregão.",2),
  fc("dir-administrativo","Diferencie dispensa de inexigibilidade de licitação.","Dispensa: a licitação é viável, mas a lei dispensa (ex.: valor baixo, emergência). Inexigibilidade: a licitação é inviável, pois não há competição possível (ex.: fornecedor exclusivo).",2),

  // Raciocínio Lógico / Estatística / Mat. Financeira
  fc("raciocinio","Qual a negação de 'Todo A é B'?","'Algum A não é B'."),
  fc("raciocinio","Quando uma proposição condicional 'se P, então Q' é falsa?","Somente quando P é verdadeiro e Q é falso."),
  fc("raciocinio","Diferencie moda de mediana.","Moda é o valor mais frequente; mediana é o valor central de um conjunto ordenado de dados."),
  fc("raciocinio","Juros compostos incidem sobre o quê a cada período?","Sobre o montante acumulado (capital + juros já incorporados), e não apenas sobre o capital inicial."),
  fc("raciocinio","O que mede o desvio padrão?","O quanto, em média, os dados se afastam do valor central (média) — é a principal medida de dispersão."),

  // Direito Tributário
  // Dir. Tributário — parte 1 (conceito, espécies, competência, princípios constitucionais)
  fc("dir-tributario","Qual a definição legal de tributo (art. 3º CTN)?","Prestação pecuniária compulsória, em moeda, que não constitua sanção de ato ilícito, instituída em lei e cobrada por atividade administrativa plenamente vinculada.",1),
  fc("dir-tributario","Diferencie competência tributária de capacidade tributária ativa.","Competência (criar o tributo) é indelegável; capacidade tributária ativa (cobrar/fiscalizar/arrecadar) pode ser delegada a outra pessoa jurídica de direito público.",1),
  fc("dir-tributario","O que é a anterioridade nonagesimal?","Princípio pelo qual o tributo só pode ser cobrado 90 dias após a publicação da lei que o criou ou aumentou (além da anterioridade anual).",1),
  fc("dir-tributario","Diferencie imposto de taxa.","Imposto é tributo não vinculado a nenhuma atividade estatal específica; taxa é vinculada a um serviço público específico/divisível ou ao exercício do poder de polícia.",1),

  // Dir. Tributário — parte 2 (obrigação, sujeitos, crédito tributário, decadência/prescrição, imunidades)
  fc("dir-tributario","Diferencie decadência de prescrição tributária.","Decadência extingue o direito de lançar (constituir) o crédito; prescrição extingue o direito de cobrar/executar o crédito já constituído. Ambas em 5 anos.",2),
  fc("dir-tributario","Cite as causas de suspensão do crédito tributário (art. 151 CTN).","Moratória, depósito do montante integral, reclamações/recursos administrativos, liminar/tutela antecipada, parcelamento.",2),
  fc("dir-tributario","Quais são as causas de exclusão do crédito tributário (art. 175 CTN)?","Isenção e anistia.",2),
  fc("dir-tributario","O que é lançamento por homologação? Dê um exemplo municipal.","O contribuinte apura e paga antecipadamente, sujeito a homologação posterior do fisco; exemplo: ISSQN na maioria dos municípios.",2),
  fc("dir-tributario","Imunidade tributária é o mesmo que isenção?","Não. Imunidade é limitação constitucional ao poder de tributar (o tributo nem existe para aquele caso); isenção é dispensa legal de pagamento de um tributo que, sem a lei isentiva, seria devido.",2),

  // ISSQN
  fc("issqn","Qual a base normativa nacional do ISSQN e as alíquotas mínima/máxima?","Lei Complementar 116/2003; alíquota mínima de 2% (EC 37/2002) e máxima de 5%."),
  fc("issqn","Como regra geral, em qual município o ISSQN é devido?","No município do estabelecimento prestador do serviço."),
  fc("issqn","Em que casos o ISSQN é devido no município da execução, e não do estabelecimento?","Em serviços como construção civil, limpeza, vigilância e exploração de rodovia (exceções do art. 3º da LC 116/2003)."),
  fc("issqn","O ISSQN incide sobre exportação de serviços?","Não incide sobre exportação de serviços para o exterior, salvo se o resultado se verificar no Brasil."),
  fc("issqn","O que é retenção na fonte do ISSQN?","Hipótese em que o tomador do serviço é responsável tributário e deve reter e recolher o ISSQN em nome do prestador."),

  // Demais tributos municipais
  fc("demais-tributos","Qual o fato gerador do IPTU?","Propriedade, domínio útil ou posse de bem imóvel em zona urbana do município."),
  fc("demais-tributos","Qual o fato gerador do ITBI?","Transmissão onerosa, por ato inter vivos, de bens imóveis ou direitos reais sobre imóveis."),
  fc("demais-tributos","O ITBI incide sobre herança ou doação?","Não — esses casos são de competência estadual (ITCMD)."),
  fc("demais-tributos","O que é contribuição de melhoria e qual seu limite total?","Tributo cobrado pela valorização imobiliária decorrente de obra pública; limite total é o custo da obra."),
  fc("demais-tributos","Diferencie taxa de serviço de taxa de polícia.","Taxa de serviço vincula-se a serviço público específico e divisível; taxa de polícia vincula-se ao exercício do poder de polícia/fiscalização."),

  // PAT + Reforma Tributária
  fc("pat-reforma","O que é 'impugnação' no processo administrativo tributário?","É a defesa apresentada pelo contribuinte contra o auto de infração/lançamento, dentro do prazo legal."),
  fc("pat-reforma","Qual o efeito da impugnação tempestiva sobre o crédito tributário?","Suspende sua exigibilidade (art. 151, III, CTN) enquanto pendente de decisão administrativa."),
  fc("pat-reforma","O que é inscrição em dívida ativa?","Ato que, após esgotadas as instâncias administrativas sem pagamento, confere ao crédito liquidez, certeza e exigibilidade, permitindo a execução fiscal."),
  fc("pat-reforma","Quais tributos serão substituídos pelo IBS e pela CBS?","ICMS (estadual), ISSQN (municipal) e PIS/Cofins (federais), ao final da transição da Reforma Tributária (EC 132/2023)."),
  fc("pat-reforma","O que é o 'princípio do destino' na Reforma Tributária?","O novo IBS será cobrado no município onde o bem/serviço é consumido, e não mais na origem."),

  // Contabilidade
  fc("contabilidade","Qual a equação fundamental da contabilidade?","Ativo = Passivo + Patrimônio Líquido."),
  fc("contabilidade","O que é o método das partidas dobradas?","Todo lançamento contábil envolve, no mínimo, uma conta debitada e uma creditada, de valores iguais."),
  fc("contabilidade","Nas contas de ativo, os aumentos ocorrem a débito ou a crédito?","A débito."),
  fc("contabilidade","Diferencie regime de competência de regime de caixa.","Competência reconhece receitas/despesas quando ocorrem, independente do pagamento; caixa reconhece apenas no recebimento/pagamento efetivo."),
  fc("contabilidade","Qual demonstração evidencia a posição patrimonial e financeira em uma data específica?","O Balanço Patrimonial."),

  // Contabilidade Pública / Orçamento
  fc("contab-publica","Qual lei disciplina a elaboração e o controle dos orçamentos públicos no Brasil?","A Lei 4.320/1964."),
  fc("contab-publica","Quais são as 3 leis do ciclo orçamentário?","PPA (Plano Plurianual, 4 anos), LDO (Lei de Diretrizes Orçamentárias, anual) e LOA (Lei Orçamentária Anual)."),
  fc("contab-publica","O que estabelece a Lei de Responsabilidade Fiscal (LC 101/2000)?","Limites de gastos com pessoal, metas fiscais, exigências de transparência e regras para geração de despesa."),
  fc("contab-publica","Dê um exemplo de receita de capital.","Operações de crédito, alienação de bens."),
  fc("contab-publica","O que é o princípio orçamentário da unidade?","Todas as receitas e despesas devem constar em uma única lei orçamentária."),

  // Civil/Empresarial e Penal/LRF
  fc("civil-empresarial","O que caracteriza o empresário, segundo o Código Civil?","Quem exerce profissionalmente atividade econômica organizada para produção/circulação de bens ou serviços."),
  fc("civil-empresarial","O que é o Simples Nacional?","Regime unificado de tributação para microempresas e pequenas empresas, com partilha de receitas entre os entes, inclusive do ISSQN."),
  fc("penal-lrf","O que caracteriza crime contra a ordem tributária (Lei 8.137/1990)?","Fraude, omissão ou declaração falsa com o objetivo de suprimir ou reduzir tributo — não basta o simples inadimplemento."),
  fc("penal-lrf","O pagamento integral do tributo após a denúncia pode extinguir a punibilidade?","Sim, conforme entendimento consolidado sobre crimes contra a ordem tributária."),
  fc("penal-lrf","O que tipifica a Lei 10.028/2000 (Lei de Crimes Fiscais)?","Condutas que violam a LRF, como operação de crédito sem autorização legislativa ou despesa não autorizada."),

  // Economia
  fc("economia","O que mede o PIB?","A produção total de bens e serviços de uma economia em determinado período."),
  fc("economia","Diferencie política fiscal de política monetária.","Fiscal atua via gastos públicos e tributação; monetária atua via controle da oferta de moeda e taxa de juros (Banco Central)."),
  fc("economia","O que é fiscalização orientada por risco?","Uso de indicadores estatísticos para priorizar contribuintes com maior probabilidade de irregularidade fiscal."),
  fc("economia","O que é cruzamento de dados (data matching) na fiscalização?","Comparação entre dados declarados pelo contribuinte e informações de terceiros (bancos, cartões) para identificar indícios de sonegação."),

  // Governança
  fc("governanca","Quais as 3 dimensões clássicas da governança pública?","Liderança, estratégia e controle."),
  fc("governanca","Diferencie governança de gestão.","Governança define diretrizes ('fazer a coisa certa'); gestão executa operacionalmente ('fazer certo a coisa')."),
  fc("governanca","O que é accountability?","Responsabilização dos agentes públicos por suas decisões e resultados; sinônimo de prestação de contas."),
  fc("governanca","Quem exerce o controle externo sobre o Executivo municipal?","O Poder Legislativo (Câmara Municipal), com auxílio do Tribunal de Contas."),
];

/* ===================== QUIZ (estilo FAFIPA) ===================== */
let idq = 1;
// `parte` opcional, mesma lógica do fc() acima.
function qz(materia, enunciado, opcoes, correta, explicacao, parte){
  return {id:"q"+(idq++), materia, enunciado, opcoes, correta, explicacao, parte};
}

const QUIZZES = [
  // Português — parte 1
  qz("portugues","Assinale a alternativa que define corretamente 'coerência textual':",
    ["A repetição de palavras ao longo do texto.","A ligação lógica de sentido entre as ideias do texto como um todo.","O uso exclusivo de conectivos.","A ortografia correta das palavras.","A pontuação adequada de cada frase."],
    1,"Coerência é a unidade de sentido do texto; coesão é a ligação gramatical entre as partes.",1),
  qz("portugues","Em 'Mas a enchente também traz destruição', o conectivo 'mas' estabelece relação de:",
    ["Adição","Conclusão","Oposição/contraste","Causa","Finalidade"],
    2,"'Mas' é conjunção adversativa, indicando contraste/oposição entre as ideias.",1),
  qz("portugues","Analise: I. Gêneros textuais variam conforme a função social do texto. II. Tipologia textual refere-se à estrutura (narrar, descrever, argumentar). III. Coesão garante apenas a correção ortográfica. Está(ão) correta(s):",
    ["Apenas I","Apenas II","Apenas I e II","Apenas III","I, II e III"],
    2,"I e II estão corretas; III está errada, pois coesão trata da ligação textual, não de ortografia.",1),
  qz("portugues","A variação linguística diz respeito a:",
    ["Erros gramaticais que devem ser sempre corrigidos.","Mudanças da língua conforme região, classe social e formalidade — adequação ao contexto.","Apenas diferenças de sotaque regional.","Regras fixas que nunca mudam conforme o contexto.","Uso exclusivo da norma culta em qualquer situação."],
    1,"Não existe 'certo ou errado' absoluto na variação linguística, existe adequado ou inadequado à situação de comunicação.",1),

  // Português — parte 2
  qz("portugues","Sobre o uso de 'porquê' (junto, com acento), é correto afirmar que:",
    ["É sempre usado em perguntas diretas.","Funciona como substantivo, geralmente precedido de artigo ('o porquê').","É usado antes de verbos no infinitivo.","Nunca é usado em frases afirmativas.","É sinônimo de 'por que' em qualquer contexto."],
    1,"'Porquê' junto e acentuado é substantivo, equivalente a 'motivo', e normalmente vem com artigo.",2),
  qz("portugues","Em 'O auditor se referia àquela norma revogada', o acento grave (crase) é:",
    ["Incorreto, pois 'aquela' não aceita crase.","Obrigatório, por ser pronome demonstrativo feminino regido por preposição 'a'.","Opcional, a critério do autor.","Usado apenas por tradição, sem regra.","Incorreto, pois falta o artigo feminino."],
    1,"'Àquela' é a fusão da preposição 'a' (exigida por 'referir-se a') com o pronome demonstrativo feminino 'aquela'.",2),
  qz("portugues","Assinale a frase que segue a norma culta cobrada em concursos:",
    ["Cheguei em Curitiba cedo.","Cheguei a Curitiba cedo.","Assisti o filme (sentido de 'ver').","Fui a prefeitura.","Vou no médico amanhã."],
    1,"Os verbos 'chegar' e 'ir' pedem a preposição 'a', não 'em', na norma culta cobrada em prova.",2),

  // Português — parte 3
  qz("portugues","Em 'O candidato, fez a prova com atenção', o uso da vírgula está:",
    ["Correto, pois separa o sujeito do predicado.","Incorreto, pois vírgula não deve separar sujeito e predicado sem motivo.","Correto, é uma pausa opcional.","Incorreto, falta outra vírgula depois de 'prova'.","Correto, indica aposto."],
    1,"É um erro clássico de pontuação: vírgula não separa sujeito de predicado (nem verbo de complemento) sem motivo sintático.",3),
  qz("portugues","Em 'Os candidatos e os fiscais chegaram cedo', a concordância verbal segue a regra de:",
    ["Sujeito composto anteposto ao verbo → verbo no plural.","Sujeito simples → verbo no singular.","Concordância ideológica (silepse).","Sujeito oculto → verbo impessoal.","Verbo impessoal, não há concordância."],
    0,"Sujeito composto anteposto ao verbo geralmente leva o verbo ao plural.",3),
  qz("portugues","O movimento literário marcado pela valorização do nacionalismo, da natureza e do sentimentalismo exagerado, no Brasil do século XIX, é o:",
    ["Barroco","Arcadismo","Romantismo","Parnasianismo","Simbolismo"],
    2,"O Romantismo brasileiro (séc. XIX) é marcado pelo nacionalismo, subjetivismo e idealização (amor, natureza, herói nacional).",3),

  // Informática
  qz("informatica","A memória que perde seu conteúdo quando o computador é desligado é a:",
    ["HD","SSD","RAM","Memória ROM","Pendrive"],
    2,"RAM é memória volátil, perdendo os dados ao desligar o equipamento."),
  qz("informatica","No Excel, uma referência fixada com cifrão antes da letra e do número, que não muda ao copiar a fórmula, é chamada de referência:",
    ["Relativa","Absoluta","Mista apenas na coluna","Circular","Dinâmica"],
    1,"Referência absoluta é fixada com cifrão e não se altera ao copiar a fórmula."),
  qz("informatica","Phishing é uma fraude caracterizada por:",
    ["Criptografia de dados sensíveis","Bloqueio de tráfego de rede por firewall","Cópia de segurança de arquivos","Golpista se passar por instituição confiável para obter dados","Compactação de arquivos grandes"],
    3,"Phishing é a fraude de engenharia social via e-mail/link falso, imitando instituição confiável."),
  qz("informatica","Sobre ferramentas de IA generativa (ChatGPT, Copilot, Gemini), é correto afirmar que:",
    ["Nunca cometem erros","Substituem integralmente o julgamento humano","Podem gerar respostas incorretas com aparência de certeza, exigindo verificação","São idênticas a buscadores tradicionais","Só funcionam offline"],
    2,"Modelos de IA generativa podem 'alucinar', produzindo informações incorretas que parecem corretas."),
  qz("informatica","Um backup que copia apenas os arquivos modificados desde o último backup realizado é chamado de backup:",
    ["Completo","Incremental","Espelhado","Diferencial total","Redundante"],
    1,"Backup incremental copia só o que mudou desde o último backup; o completo copia tudo sempre — pegadinha clássica de prova."),
  qz("informatica","Um malware que se propaga sozinho pela rede, sem precisar de um arquivo hospedeiro, é classificado como:",
    ["Vírus","Worm","Trojan","Spyware","Adware"],
    1,"Worm se propaga autonomamente pela rede; vírus precisa de um programa hospedeiro; trojan parece útil mas esconde código malicioso."),
  qz("informatica","No Excel, a fórmula =CONT.SE(A1:A10;\">100\") tem como resultado:",
    ["A soma dos valores maiores que 100 no intervalo","A quantidade de células no intervalo com valor maior que 100","A média dos valores do intervalo","Sempre o valor 100","Um erro de sintaxe"],
    1,"CONT.SE conta quantas células atendem ao critério informado — aqui, quantas são maiores que 100."),
  qz("informatica","Apagar o atalho (link) de um programa ou arquivo na área de trabalho:",
    ["Também apaga o arquivo original","Não apaga o arquivo original, pois o atalho é só uma referência","Move o arquivo para a lixeira automaticamente","Corrompe o arquivo original","Só é possível com permissão de administrador"],
    1,"Atalho é uma referência ao arquivo, não o arquivo em si — apagar o atalho não afeta o original."),
  qz("informatica","O protocolo que indica uma conexão criptografada entre o navegador e o site visitado é identificado por:",
    ["FTP","HTTP","HTTPS","SMTP","DNS"],
    2,"HTTPS indica conexão criptografada; o 'S' adicional é o diferencial em relação ao HTTP comum."),

  // Legislação Municipal
  qz("leg-municipal","A norma que organiza a estrutura político-administrativa do Município, equivalente a uma 'Constituição' local, é:",
    ["O Código Tributário Municipal","A Lei Orgânica do Município","O Regimento Interno da Câmara","O Estatuto dos Servidores","A Lei de Diretrizes Orçamentárias"],
    1,"Lei Orgânica é a norma fundamental de organização do Município."),
  qz("leg-municipal","O Estatuto dos Funcionários Públicos de Curitiba está previsto em qual lei?",
    ["Lei Municipal nº 7.671/1991","Lei Municipal nº 1.656/1958","Lei Orgânica do Município","CF, art. 39","LC 101/2000"],
    1,"A Lei Municipal 1.656/1958 trata do regime dos servidores municipais de Curitiba."),
  qz("leg-municipal","O controle externo das contas do Município de Curitiba é exercido:",
    ["Apenas pelo Executivo","Pela Câmara Municipal, com auxílio do Tribunal de Contas","Exclusivamente pelo Judiciário","Pelo Ministério Público, isoladamente","Não há controle externo municipal"],
    1,"O controle externo é do Legislativo, auxiliado pelo Tribunal de Contas."),
  qz("leg-municipal","O Código Tributário Municipal de Curitiba consolida as normas sobre:",
    ["Apenas o IPTU","IPTU, ITBI, ISSQN e taxas municipais","Somente taxas e contribuição de melhoria","Apenas o regime dos servidores","Exclusivamente o orçamento municipal"],
    1,"O Código Tributário Municipal reúne fato gerador, base de cálculo, alíquotas e obrigações de IPTU, ITBI, ISSQN e taxas."),
  qz("leg-municipal","Um decreto do Executivo municipal, ao regulamentar uma lei:",
    ["Pode criar novas obrigações não previstas na lei","Está limitado a detalhar a aplicação da lei, sem inovar além do que ela permite","Revoga automaticamente a lei que regulamenta","Tem a mesma hierarquia da Lei Orgânica","Dispensa publicação para ter validade"],
    1,"Pelo princípio da legalidade, o decreto regulamenta a lei mas não pode inovar além do que ela autoriza."),
  qz("leg-municipal","Em relação à hierarquia das normas municipais, é correto afirmar que a Lei Orgânica:",
    ["Está subordinada ao Código Tributário Municipal","É a norma de maior hierarquia local, análoga à Constituição Federal para a União","Pode contrariar a Constituição Federal em matéria tributária","Só se aplica ao Poder Legislativo municipal","É revogada a cada nova legislatura"],
    1,"A Lei Orgânica é a norma fundamental do Município, e as demais leis municipais devem respeitá-la."),

  // Direito Constitucional — parte 1
  qz("dir-constitucional","Analise: I. O Brasil adota forma de Estado federativa. II. O Município possui Poder Judiciário próprio. III. A autonomia municipal inclui autogoverno e autolegislação. Está(ão) correta(s):",
    ["Apenas I","Apenas II","Apenas I e III","Apenas II e III","I, II e III"],
    2,"I e III corretas; II é falsa — o Município não tem Judiciário próprio.",1),
  qz("dir-constitucional","O remédio constitucional que protege o acesso ou retificação de informações da própria pessoa em bancos de dados públicos é:",
    ["Habeas corpus","Mandado de segurança","Habeas data","Ação popular","Mandado de injunção"],
    2,"Habeas data garante acesso ou retificação de informações sobre a própria pessoa em bancos de dados públicos.",1),
  qz("dir-constitucional","Qualquer cidadão pode propor, para anular ato lesivo ao patrimônio público, à moralidade administrativa ou ao meio ambiente, a:",
    ["Ação civil pública","Ação popular","Mandado de segurança coletivo","Ação direta de inconstitucionalidade","Reclamação constitucional"],
    1,"Ação popular pode ser proposta por qualquer cidadão contra ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente ou ao patrimônio histórico/cultural.",1),

  // Direito Constitucional — parte 2
  qz("dir-constitucional","Os princípios expressos da Administração Pública (art. 37, caput, CF) são conhecidos pela sigla:",
    ["PICLE","LIMPE","MESCLA","FEITO","CORRETO"],
    1,"Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência.",2),
  qz("dir-constitucional","A responsabilidade civil do Estado por danos causados por seus agentes a terceiros (art. 37, §6º, CF) é do tipo:",
    ["Subjetiva, dependente de dolo","Objetiva, independente de culpa","Inexistente","Exclusiva do agente público","Limitada a casos de dolo"],
    1,"Responsabilidade objetiva (teoria do risco administrativo), com direito de regresso em caso de dolo/culpa.",2),
  qz("dir-constitucional","Sobre o Tribunal de Contas e as contas do Prefeito, é correto afirmar:",
    ["O Tribunal de Contas julga diretamente as contas do Prefeito.","O Tribunal de Contas emite parecer prévio; quem julga é a Câmara Municipal.","Somente o Judiciário pode julgar as contas do Prefeito.","As contas do Prefeito não passam por nenhum controle externo.","O parecer do Tribunal de Contas é sempre vinculante e definitivo."],
    1,"O Tribunal de Contas emite apenas PARECER PRÉVIO sobre as contas de governo do Prefeito; quem julga é a Câmara Municipal.",2),

  // Direito Administrativo — parte 1
  qz("dir-administrativo","A extinção de um ato administrativo ilegal, com efeitos retroativos, é denominada:",
    ["Revogação","Anulação","Convalidação","Ratificação","Caducidade"],
    1,"Anulação atinge atos ilegais, com efeito ex tunc (retroativo).",1),
  qz("dir-administrativo","Somente a Administração pode revogar um ato; o Judiciário:",
    ["Também pode revogar livremente.","Só pode anular, nunca revogar.","Pode revogar, mas não anular.","Não pode fazer nem uma coisa nem outra.","Pode revogar apenas atos vinculados."],
    1,"O Judiciário pode anular atos ilegais (controle de legalidade), mas não revogar atos legais por conveniência/oportunidade — isso é exclusivo da Administração.",1),
  qz("dir-administrativo","Correção de um defeito sanável do ato administrativo, com efeito retroativo, chama-se:",
    ["Anulação","Revogação","Convalidação","Caducidade","Contraposição"],
    2,"Convalidação corrige um defeito sanável do ato, mantendo seus efeitos com retroatividade.",1),

  // Direito Administrativo — parte 2
  qz("dir-administrativo","O poder pelo qual a Administração limita direitos individuais em favor do interesse coletivo (ex.: fiscalização tributária) é o poder:",
    ["Disciplinar","Hierárquico","Regulamentar","De polícia","Discricionário"],
    3,"Definição clássica do poder de polícia administrativa.",2),
  qz("dir-administrativo","Com a reforma de 2021 na Lei de Improbidade Administrativa, os atos que causam prejuízo ao erário passaram a exigir:",
    ["Mera culpa","Dolo","Responsabilidade objetiva","Nenhum elemento subjetivo","Negligência leve"],
    1,"Após a Lei 14.230/2021, exige-se dolo para os atos de prejuízo ao erário.",2),
  qz("dir-administrativo","Dispensa e inexigibilidade de licitação são a mesma coisa?",
    ["Sim, são sinônimos.","Não — na dispensa a licitação é viável mas a lei dispensa; na inexigibilidade ela é inviável (sem competição possível).","Não — dispensa é só para obras, inexigibilidade só para serviços.","Sim, ambas exigem autorização do Tribunal de Contas.","Não — inexigibilidade é mais rara que dispensa em qualquer hipótese."],
    1,"Dispensa: licitação viável, mas dispensada por lei (ex.: valor baixo). Inexigibilidade: licitação inviável, por falta de competição (ex.: fornecedor exclusivo).",2),

  // Raciocínio
  qz("raciocinio","A negação da proposição 'Todos os contribuintes pagaram o tributo' é:",
    ["Nenhum contribuinte pagou o tributo","Algum contribuinte não pagou o tributo","Todos os contribuintes não pagaram o tributo","Alguns contribuintes pagaram o tributo","Nenhuma das anteriores"],
    1,"Negação de 'todo' é 'algum... não'."),
  qz("raciocinio","No regime de juros compostos, os juros de cada período incidem sobre:",
    ["Sempre o capital inicial","O montante acumulado até o período anterior","Apenas os juros do período anterior","Um valor fixo contratual","Nunca há incidência sobre juros anteriores"],
    1,"Juros compostos incidem sobre o montante acumulado (capital + juros anteriores)."),
  qz("raciocinio","O desvio padrão é uma medida de:",
    ["Tendência central","Dispersão dos dados em torno da média","Moda dos dados","Frequência relativa apenas","Nenhuma das anteriores"],
    1,"Desvio padrão mede a dispersão/variabilidade dos dados em relação à média."),
  qz("raciocinio","A negação da proposição 'Algum fiscal está de férias' é:",
    ["Algum fiscal não está de férias","Nenhum fiscal está de férias","Todo fiscal está de férias","Todo fiscal não está de férias","Algum fiscal está de férias"],
    1,"Negação de 'algum' é 'nenhum' — se não é verdade que ALGUM está de férias, então NENHUM está."),
  qz("raciocinio","Pela Lei de De Morgan, a negação de 'A e B' é equivalente a:",
    ["Não A e não B","Não A ou não B","A ou B","Não A e B","A e não B"],
    1,"Lei de De Morgan: a negação de 'e' é 'ou' com os termos negados, e vice-versa."),
  qz("raciocinio","Um IPTU de R$ 2.000 em atraso há 4 meses, com juros de mora SIMPLES de 1% ao mês, gera juros de:",
    ["R$ 20","R$ 40","R$ 80","R$ 2.080","R$ 800"],
    2,"Juros simples: J = C × i × t = 2000 × 0,01 × 4 = R$ 80 (incide sempre sobre o capital inicial, de forma linear)."),
  qz("raciocinio","No desconto racional (por dentro), a taxa de desconto incide sobre:",
    ["O valor futuro (nominal) do título","O valor presente (atual) do título","A média entre valor presente e futuro","Um valor fixo definido em lei","O valor da última parcela apenas"],
    1,"Desconto racional incide sobre o valor presente; o desconto comercial (por fora) incide sobre o valor futuro/nominal."),

  // Direito Tributário — parte 1
  qz("dir-tributario","Segundo o art. 3º do CTN, tributo é prestação pecuniária compulsória que:",
    ["Constitui sanção de ato ilícito","Não constitui sanção de ato ilícito e é instituída em lei","Depende da vontade do contribuinte","É cobrada por atividade discricionária","Pode ser instituída por decreto"],
    1,"A definição legal exclui sanção de ato ilícito e exige instituição por lei.",1),
  qz("dir-tributario","A capacidade tributária ativa, diferentemente da competência tributária:",
    ["É sempre indelegável","Pode ser delegada a outra pessoa jurídica de direito público","Só existe para a União","Extingue a competência do ente","É sinônimo de competência"],
    1,"Capacidade tributária ativa (cobrar/fiscalizar/arrecadar) pode ser delegada.",1),
  qz("dir-tributario","O princípio que impede cobrar o tributo antes de 90 dias da publicação da lei que o instituiu ou aumentou é a anterioridade:",
    ["Anual","Nonagesimal","Irretroativa","Isonômica","Confiscatória"],
    1,"Anterioridade nonagesimal exige um prazo mínimo de 90 dias entre a publicação da lei e a cobrança do tributo.",1),

  // Direito Tributário — parte 2
  qz("dir-tributario","A perda do direito de a autoridade lançar o crédito tributário pelo decurso do prazo legal denomina-se:",
    ["Prescrição","Decadência","Remissão","Anistia","Transação"],
    1,"Decadência atinge o direito de lançar; prescrição atinge o direito de cobrar.",2),
  qz("dir-tributario","Imunidade tributária e isenção são institutos equivalentes?",
    ["Sim, ambos são concedidos por lei ordinária.","Não — imunidade é limitação constitucional ao poder de tributar; isenção é dispensa legal infraconstitucional.","Sim, ambos impedem a existência do tributo.","Não — isenção é sempre mais ampla que imunidade.","Sim, mas só para impostos municipais."],
    1,"Imunidade é prevista na Constituição e impede que o tributo exista para aquele caso; isenção é dispensa de pagamento concedida por lei ordinária/específica.",2),

  // ISSQN
  qz("issqn","As alíquotas mínima e máxima do ISSQN, fixadas pela legislação complementar federal, são respectivamente:",
    ["1% e 4%","2% e 5%","3% e 8%","0% e 10%","5% e 10%"],
    1,"Alíquota mínima de 2% (EC 37/2002) e máxima de 5% (LC 116/2003)."),
  qz("issqn","Como regra geral, o ISSQN é devido no município:",
    ["Onde reside o tomador do serviço","Do estabelecimento prestador","Onde foi firmado o contrato","Da sede da empresa cliente","Escolhido livremente pelo contribuinte"],
    1,"Regra geral: local do estabelecimento prestador do serviço."),
  qz("issqn","Sobre serviços de construção civil, a LC 116/2003 estabelece que o ISSQN é devido:",
    ["Sempre no município do estabelecimento prestador","No município onde o serviço é efetivamente executado","Nunca é devido","Apenas na capital do Estado","No município de domicílio do sócio majoritário"],
    1,"Exceção do art. 3º da LC 116/2003: local da execução do serviço."),
  qz("issqn","Em muitos municípios, inclusive Curitiba, o tomador do serviço pode ficar responsável por reter e recolher o ISSQN em nome do prestador — esse mecanismo é chamado de:",
    ["Substituição tributária por antecipação","Retenção na fonte","Lançamento por declaração","Imunidade recíproca","Compensação tributária"],
    1,"Retenção na fonte: o tomador retém e recolhe o ISSQN devido pelo prestador."),
  qz("issqn","A exportação de serviços para o exterior, em regra:",
    ["É sempre tributada pelo ISSQN","Não é tributada pelo ISSQN, salvo se o resultado for verificado no Brasil","É tributada apenas se o prestador for pessoa jurídica","Depende de autorização do Comitê Gestor do IBS","É tributada à alíquota máxima de 5%"],
    1,"A LC 116/2003 desonera a exportação de serviços, salvo quando o resultado do serviço se verifica no território brasileiro."),
  qz("issqn","Sobre a lista de serviços anexa à LC 116/2003, é correto afirmar que ela é:",
    ["Meramente exemplificativa, podendo ser livremente ampliada pelo município","Taxativa, mas admite interpretação extensiva dentro de cada item","Facultativa, cada município cria sua própria lista","Idêntica à lista de produtos do ICMS","Revogada pela Reforma Tributária desde já"],
    1,"A lista é taxativa (numerus clausus), mas a jurisprudência admite interpretação extensiva dentro de cada item, abrangendo serviços análogos."),

  // Demais tributos
  qz("demais-tributos","O fato gerador do IPTU é:",
    ["A transmissão onerosa de bem imóvel","A propriedade, domínio útil ou posse de imóvel urbano","A prestação de serviços","A valorização imobiliária por obra pública","A circulação de mercadorias"],
    1,"Fato gerador do IPTU conforme art. 32 do CTN."),
  qz("demais-tributos","O ITBI incide sobre:",
    ["Transmissão causa mortis de imóveis","Doação de imóveis","Transmissão onerosa, por ato inter vivos, de bens imóveis","Locação de imóveis","Prestação de serviços de construção civil"],
    2,"ITBI incide sobre transmissão onerosa inter vivos; causa mortis/doação é ITCMD estadual."),
  qz("demais-tributos","A contribuição de melhoria tem como limite total de cobrança:",
    ["O valor venal do imóvel","O custo da obra pública","O valor arbitrado pelo contribuinte","Não há limite","5% da renda do contribuinte"],
    1,"Limite total: custo da obra; limite individual: valorização do imóvel."),
  qz("demais-tributos","Diferentemente da taxa, o preço público (tarifa):",
    ["É compulsório e segue o princípio da legalidade estrita","É uma contraprestação contratual facultativa, não sujeita aos princípios tributários","É sempre cobrado pela União","Prescreve em 5 anos, como a taxa","É uma espécie de imposto municipal"],
    1,"Preço público/tarifa é contraprestação contratual facultativa (ex.: tarifa de ônibus), não é tributo e não segue legalidade estrita/anterioridade."),
  qz("demais-tributos","O IPTU incide sobre imóvel localizado em área rural que possua ao menos dois melhoramentos urbanos definidos em lei municipal (água, esgoto, iluminação etc.)?",
    ["Não, pois imóvel rural é sempre tributado pelo ITR","Sim — o critério não é apenas a localização, mas a destinação e os melhoramentos urbanos presentes","Sim, mas apenas se o proprietário residir no local","Não, pois ITBI já incidiu sobre o imóvel","Sim, mas a alíquota é sempre zero"],
    1,"O IPTU pode incidir sobre área formalmente rural se houver melhoramentos urbanos definidos em lei (ao menos dois, conforme o CTN) e a destinação for urbana."),
  qz("demais-tributos","A taxa cobrada pela fiscalização de localização e funcionamento de um estabelecimento comercial tem como fundamento:",
    ["O poder de polícia da Administração","Um serviço público específico e divisível prestado ao contribuinte","A valorização imobiliária do imóvel","A propriedade do imóvel comercial","A transmissão onerosa do estabelecimento"],
    0,"Taxas de polícia/fiscalização se fundamentam no poder de polícia, diferente das taxas de serviço, vinculadas a um serviço público específico."),

  // PAT + Reforma
  qz("pat-reforma","A impugnação tempestiva do contribuinte, no processo administrativo tributário, tem como efeito:",
    ["Extinguir o crédito tributário","Suspender a exigibilidade do crédito tributário","Anular automaticamente o lançamento","Não produzir qualquer efeito","Converter o crédito em dívida ativa imediatamente"],
    1,"Art. 151, III, CTN — suspende a exigibilidade enquanto pendente de julgamento."),
  qz("pat-reforma","A Reforma Tributária do Consumo (EC 132/2023) substitui, ao final da transição, o ICMS, o ISSQN e o PIS/Cofins principalmente pelos tributos:",
    ["IPTU e ITBI","IBS e CBS","IOF e IPI","ITCMD e ITR","Simples Nacional e MEI"],
    1,"IBS (compartilhado Estados/Municípios) e CBS (federal)."),
  qz("pat-reforma","O princípio segundo o qual o novo IBS será cobrado no local de consumo do bem/serviço é o princípio:",
    ["Da origem","Do destino","Da territorialidade estrita","Da extraterritorialidade","Da neutralidade"],
    1,"Princípio do destino: tributação no local de consumo."),
  qz("pat-reforma","No processo administrativo tributário, após a lavratura do auto de infração, a sequência correta das fases é:",
    ["Impugnação → julgamento em 1ª instância → recurso voluntário → decisão definitiva","Recurso voluntário → impugnação → decisão definitiva","Decisão definitiva → impugnação → julgamento","Inscrição em dívida ativa → impugnação → julgamento","Julgamento em 1ª instância → auto de infração → impugnação"],
    0,"Sequência: auto de infração → impugnação → julgamento em 1ª instância → recurso voluntário → decisão definitiva."),
  qz("pat-reforma","Esgotadas as instâncias administrativas sem pagamento do crédito tributário, o próximo passo é:",
    ["A extinção automática do crédito","A inscrição em dívida ativa, tornando o crédito título líquido, certo e exigível","A concessão automática de anistia","A prescrição imediata do crédito","Uma nova impugnação de ofício"],
    1,"Após esgotadas as instâncias sem pagamento, o crédito é inscrito em dívida ativa, apto a lastrear execução fiscal."),
  qz("pat-reforma","Sobre a transição da Reforma Tributária do Consumo (EC 132/2023), é correto afirmar que:",
    ["O ISSQN deixa de existir imediatamente em 2026","Há um período de transição gradual entre 2026 e 2033, com o ISSQN seguindo vigente nesse período","A transição dura apenas um ano","O IBS substitui o ISSQN sem qualquer período de adaptação","A reforma não afeta os municípios"],
    1,"A transição é gradual (2026-2033), com redução progressiva dos tributos antigos e aumento progressivo do IBS/CBS, evitando choque na arrecadação."),

  // Contabilidade
  qz("contabilidade","A equação fundamental da contabilidade pode ser expressa como:",
    ["Ativo = Receita − Despesa","Ativo = Passivo + Patrimônio Líquido","Passivo = Ativo + Patrimônio Líquido","Patrimônio Líquido = Passivo − Ativo","Ativo = Passivo − Patrimônio Líquido"],
    1,"Equação fundamental: Ativo = Passivo + PL."),
  qz("contabilidade","Pelo método das partidas dobradas:",
    ["Todo lançamento envolve apenas uma conta","Todo lançamento envolve, no mínimo, uma conta debitada e uma creditada, de valores iguais","Débito e crédito podem ter valores diferentes","Apenas contas de ativo são debitadas","Não há relação entre débito e crédito"],
    1,"Princípio das partidas dobradas: débito e crédito sempre em igual valor."),
  qz("contabilidade","No regime de competência, as receitas e despesas são reconhecidas:",
    ["Somente quando pagas ou recebidas em dinheiro","Quando ocorrem, independentemente do recebimento/pagamento","No final do exercício, de forma consolidada","Nunca antes do pagamento","Apenas por decisão da diretoria"],
    1,"Regime de competência reconhece o fato gerador econômico, não o fluxo financeiro."),
  qz("contabilidade","A demonstração contábil que apresenta receitas, custos, despesas e o resultado (lucro ou prejuízo) de um período é:",
    ["O Balanço Patrimonial","A Demonstração do Resultado do Exercício (DRE)","A Demonstração do Fluxo de Caixa (DFC)","O Livro Diário","O Livro Razão"],
    1,"A DRE apura o resultado do período a partir de receitas, custos e despesas; o Balanço mostra a posição patrimonial em uma data."),
  qz("contabilidade","A perda gradual de valor de um bem intangível (ex.: uma marca ou patente) é tecnicamente chamada de:",
    ["Depreciação","Amortização","Exaustão","Provisão","Reavaliação"],
    1,"Depreciação é para bens tangíveis, amortização para intangíveis e exaustão para recursos naturais."),
  qz("contabilidade","Na compra de material de escritório à vista por R$ 200, o lançamento contábil correto é:",
    ["Débito em Caixa e crédito em Material de Escritório","Débito em Material de Escritório (despesa) e crédito em Caixa (ativo)","Débito em Receita de Serviços e crédito em Caixa","Crédito em Material de Escritório e débito em Patrimônio Líquido","Nenhum lançamento é necessário, pois foi à vista"],
    1,"A despesa (Material de Escritório) aumenta a débito; o ativo (Caixa) diminui a crédito — os dois lados somam o mesmo valor."),
  qz("contabilidade","O registro cronológico de todos os lançamentos contábeis de uma empresa é feito no:",
    ["Livro Razão","Livro Diário","Balanço Patrimonial","DRE","DFC"],
    1,"Livro Diário registra os lançamentos em ordem cronológica; o Livro Razão organiza por conta."),

  // Contabilidade pública / Orçamento
  qz("contab-publica","A norma geral de direito financeiro que disciplina a elaboração e o controle dos orçamentos públicos no Brasil é a:",
    ["Lei 8.666/93","Lei 4.320/1964","Lei 14.133/2021","CLT","Lei 6.404/76"],
    1,"Lei 4.320/1964 é a norma geral de direito financeiro/orçamentário."),
  qz("contab-publica","No ciclo orçamentário brasileiro, a lei que estima a receita e fixa a despesa para o exercício é a:",
    ["PPA","LDO","LOA","LRF","NBCASP"],
    2,"LOA (Lei Orçamentária Anual) estima receita e fixa despesa."),
  qz("contab-publica","A Lei de Responsabilidade Fiscal (LC 101/2000) estabelece, entre outras medidas:",
    ["Limites de gasto com pessoal e exigências de transparência fiscal","Regras exclusivas de direito penal","Normas de licitação","Regime jurídico dos servidores","Alíquotas do ISSQN"],
    0,"LRF trata de limites de pessoal, metas fiscais e transparência."),
  qz("contab-publica","No ciclo orçamentário, a ordem correta de elaboração das leis é:",
    ["LOA → LDO → PPA","LDO → PPA → LOA","PPA → LDO → LOA","LOA → PPA → LDO","PPA → LOA → LDO"],
    2,"Primeiro o PPA (planejamento de 4 anos), depois a LDO (orienta a LOA do ano seguinte), e só então a LOA (orçamento detalhado) — a LDO sempre vem antes da LOA."),
  qz("contab-publica","O princípio orçamentário segundo o qual, em regra, as receitas não podem ser vinculadas a despesas específicas é o princípio da:",
    ["Unidade","Universalidade","Anualidade","Não afetação das receitas","Exclusividade"],
    3,"Princípio da não afetação (ou não vinculação): como regra geral, a receita arrecadada não pode ser presa a uma despesa específica."),
  qz("contab-publica","Pela LRF, o limite máximo de gasto com pessoal do Poder Executivo municipal, em percentual da Receita Corrente Líquida, é de:",
    ["60%","54%","6%","90%","100%"],
    1,"No Município, o limite total é 60% da RCL, dividido entre os Poderes: 54% para o Executivo e 6% para o Legislativo, por exemplo."),
  qz("contab-publica","Ao atingir o chamado 'limite prudencial' (90% do limite máximo de pessoal) da LRF, a Administração:",
    ["Não sofre nenhuma restrição ainda","Já passa a ter restrições, como proibição de conceder vantagens e criar cargos","É automaticamente exonerada de todos os servidores","Perde a competência tributária","Deve reduzir o IPTU imediatamente"],
    1,"Atingido o limite prudencial (90% do limite máximo), já se impõem restrições preventivas, mesmo antes de ultrapassar o limite total."),

  // Civil/Empresarial + Penal/LRF
  qz("civil-empresarial","O regime unificado de tributação para microempresas e empresas de pequeno porte, previsto na LC 123/2006, é conhecido como:",
    ["Lucro Real","Lucro Presumido","Simples Nacional","Regime Especial de Tributação","Regime Cumulativo"],
    2,"Simples Nacional, instituído pela LC 123/2006."),
  qz("civil-empresarial","Em relação ao MEI (Microempreendedor Individual), é correto afirmar que:",
    ["Tem o mesmo limite de receita bruta anual que uma EPP optante do Simples Nacional","Tem limite de receita bruta anual bem menor e tributação em valor fixo, diferente das demais faixas do Simples","Não pode emitir nota fiscal de serviço","É obrigatoriamente uma sociedade limitada","Está isento de qualquer tributo municipal"],
    1,"O MEI tem limite de receita bem menor e paga valor fixo mensal (DAS), diferente das faixas progressivas do Simples Nacional 'normal' (ME/EPP)."),
  qz("civil-empresarial","Para fins de registro, o empresário individual e a sociedade empresária devem registrar seus atos constitutivos:",
    ["No Cartório de Registro Civil de Pessoas Jurídicas","Na Junta Comercial","No Tribunal de Justiça","Na Receita Federal, exclusivamente","No Ministério Público"],
    1,"Empresário/sociedade empresária registram-se na Junta Comercial; sociedades simples (profissões intelectuais) registram-se no Cartório de Registro Civil de Pessoas Jurídicas."),
  qz("civil-empresarial","Para fins de ITBI e IPTU, a distinção entre bens imóveis e móveis, e entre fungíveis e infungíveis, é relevante porque:",
    ["Esses impostos incidem igualmente sobre qualquer tipo de bem","Apenas bens imóveis são relevantes para IPTU/ITBI; bens móveis não geram esses tributos","Bens fungíveis nunca podem ser tributados","Bens infungíveis são sempre isentos","A distinção não tem nenhuma relevância tributária"],
    1,"IPTU e ITBI incidem sobre bens imóveis; a classificação civil do bem (imóvel/móvel) delimita o campo de incidência desses impostos municipais."),

  qz("penal-lrf","Os crimes contra a ordem tributária, previstos na Lei 8.137/1990, caracterizam-se, em regra, pela:",
    ["Mera inadimplência do tributo","Fraude, omissão ou declaração falsa com intenção de suprimir/reduzir tributo","Simples atraso no pagamento","Discordância sobre interpretação da lei","Qualquer planejamento tributário lícito"],
    1,"Exige-se fraude/dolo para a tipificação penal (Lei 8.137/1990)."),
  qz("penal-lrf","A Lei 10.028/2000 (Lei de Crimes Fiscais) tipifica condutas que violam, principalmente, a:",
    ["Lei de Licitações","Lei de Responsabilidade Fiscal","CLT","Lei do ISSQN","Lei de Improbidade, exclusivamente"],
    1,"Lei 10.028/2000 tipifica crimes relacionados à LRF."),
  qz("penal-lrf","Diferentemente da sonegação fiscal, a elisão fiscal (planejamento tributário):",
    ["É sempre ilícita e sujeita a sanção penal","É lícita, pois organiza os negócios antes da ocorrência do fato gerador para pagar menos tributo dentro da lei","Ocorre sempre após o fato gerador, escondendo-o do fisco","É sinônimo de fraude tributária","Só pode ser praticada por pessoas físicas"],
    1,"Elisão é planejamento lícito, feito ANTES do fato gerador; evasão/sonegação é prática ilícita, geralmente após o fato gerador já ocorrido."),
  qz("penal-lrf","O pagamento integral do tributo sonegado, mesmo após o recebimento da denúncia criminal, pode:",
    ["Jamais ter qualquer efeito sobre o processo penal","Extinguir a punibilidade, segundo entendimento consolidado","Agravar automaticamente a pena","Converter o crime em contravenção","Transferir a responsabilidade ao contador"],
    1,"O pagamento integral do tributo, mesmo após a denúncia, pode extinguir a punibilidade, conforme entendimento consolidado sobre crimes da Lei 8.137/1990."),

  // Economia
  qz("economia","O indicador que mede a produção total de bens e serviços de uma economia em determinado período é o:",
    ["IPCA","PIB","Selic","IGP-M","Índice de Gini"],
    1,"PIB mede a produção total de bens e serviços."),
  qz("economia","A comparação entre dados declarados pelo contribuinte e informações de terceiros, para identificar indícios de sonegação, é chamada de:",
    ["Lançamento por homologação","Cruzamento de dados (data matching)","Decadência","Anistia fiscal","Autotutela"],
    1,"Definição de cruzamento de dados (data matching)."),
  qz("economia","O aumento generalizado e persistente do nível de preços de uma economia, medido pelo IPCA, é chamado de:",
    ["Deflação","Inflação","Recessão","Estagflação apenas","Variação cambial"],
    1,"Inflação é o aumento generalizado e persistente do nível de preços — diferente do aumento pontual de um único produto por motivo específico."),
  qz("economia","A política que atua sobre a taxa de juros e a oferta de moeda, conduzida pelo Banco Central, é a política:",
    ["Fiscal","Monetária","Cambial fixa","Tributária municipal","De gastos públicos"],
    1,"Política monetária (juros/moeda, via Banco Central) é distinta da política fiscal (gastos/tributos)."),
  qz("economia","O documento eletrônico essencial para a fiscalização do ISSQN, que registra a prestação de serviços, é a:",
    ["NFS-e (Nota Fiscal Eletrônica de Serviços)","DIRF","GFIP","CND","DARF"],
    0,"A NFS-e é o documento eletrônico central para fiscalizar e cruzar informações sobre prestação de serviços sujeitos ao ISSQN."),
  qz("economia","Um sistema que cruza declarações do contribuinte com dados de terceiros para identificar padrões suspeitos de sonegação é conhecido como:",
    ["Certificação digital","Malha fiscal","Lançamento por declaração","Anistia fiscal","Parcelamento especial"],
    1,"Malha fiscal é o conjunto de softwares que cruza declarações com dados de terceiros para apontar inconsistências."),

  // Governança
  qz("governanca","A governança pública, segundo a definição usual, compreende os mecanismos de:",
    ["Apenas execução operacional","Liderança, estratégia e controle","Apenas fiscalização tributária","Apenas planejamento financeiro","Nenhuma das anteriores"],
    1,"Liderança, estratégia e controle são as três dimensões clássicas da governança pública."),
  qz("governanca","O controle exercido pelo Poder Legislativo, com auxílio do Tribunal de Contas, sobre os atos do Executivo, é denominado controle:",
    ["Interno","Externo","Judicial, exclusivamente","Social, apenas","Popular"],
    1,"Controle externo é exercido pelo Legislativo com auxílio do TC."),
  qz("governanca","'Executar a cobrança de um tributo já definido em lei' é uma atividade tipicamente de:",
    ["Governança, pois envolve decisão estratégica","Gestão, pois é execução operacional — governança define diretrizes, gestão executa","Controle externo exclusivamente","Compliance público apenas","Nenhuma das anteriores — não há distinção entre os dois conceitos"],
    1,"Governança define 'fazer a coisa certa' (diretrizes); gestão executa operacionalmente 'fazer certo a coisa' — cobrar um tributo já definido é execução, isto é, gestão."),
  qz("governanca","A prestação de contas e a responsabilização dos gestores públicos perante a sociedade correspondem ao princípio de governança conhecido como:",
    ["Accountability","Compliance","Subsidiariedade","Taxatividade","Confiscatoriedade"],
    0,"Accountability é a prestação de contas/responsabilização — um dos princípios centrais de governança pública, junto com transparência e integridade."),
  qz("governanca","No ciclo de gestão de riscos aplicado à fiscalização tributária orientada por risco, a etapa que vem IMEDIATAMENTE após a identificação dos riscos é a:",
    ["Monitoramento contínuo","Análise/avaliação (probabilidade x impacto)","Tratamento (priorizar fiscalização)","Extinção do crédito tributário","Inscrição em dívida ativa"],
    1,"Ciclo: 1) identificação → 2) análise/avaliação (probabilidade x impacto) → 3) tratamento (priorizar) → 4) monitoramento contínuo."),
];

/* ===================== DICAS DE ESTUDO (pesquisa) ===================== */
const DICAS = [
  {
    titulo:"Repetição espaçada > reler e grifar",
    corpo:"Estudar em sessões curtas espalhadas ao longo de vários dias produz memória de longo prazo muito melhor do que concentrar tudo em uma única sessão longa (cramming). Isso é a base do sistema de Flashcards deste painel: ele reagenda automaticamente o que você já viu, com base no quanto você lembrou.",
    fonte:"Cepeda et al. (2006), citado por lifeskillsadvocate.com — sobre prática espaçada vs. maciça; Kang (2016), citado por add.org."
  },
  {
    titulo:"Recall ativo (testar-se) é mais eficaz que reler",
    corpo:"Fechar o material e tentar lembrar o conteúdo de cabeça — respondendo uma pergunta, explicando em voz alta, ou resolvendo uma questão antes de checar a resposta — gera aprendizado muito mais forte do que reler ou grifar o texto, que estão entre os métodos menos eficazes. É por isso que este painel prioriza Flashcards e Questões, em vez de apenas te dar textos para reler.",
    fonte:"lifeskillsadvocate.com (resumo de pesquisas sobre retrieval practice)."
  },
  {
    titulo:"Blocos de foco curtos funcionam melhor que o Pomodoro clássico",
    corpo:"Os 25 minutos tradicionais do Pomodoro costumam ser longos demais para quem tem TDAH. Blocos de 10 a 15 minutos, com pausas reais entre eles, tendem a manter o foco por mais tempo. Se o cronômetro aumentar sua ansiedade, troque tempo por tarefa: 'vou até terminar 5 questões', em vez de 'vou estudar por 15 minutos'.",
    fonte:"add.org — 'Tips for Studying with ADHD'."
  },
  {
    titulo:"Recompensas pequenas, frequentes e proporcionais",
    corpo:"Defina recompensas pequenas após blocos de estudo (nunca usando necessidades básicas, como comer, como recompensa). A recompensa deve ser proporcional ao esforço — por exemplo, até metade do tempo estudado em atividade prazerosa. Isso ajuda a compensar a motivação mais instável associada ao TDAH.",
    fonte:"blog.grancursosonline.com.br — 'Como lidar com o TDAH nos estudos para concurso'; Volkow et al. (2011), citado por add.org, sobre via de recompensa/dopamina."
  },
  {
    titulo:"Varie a atividade dentro do bloco de estudo",
    corpo:"Alternar entre tipos de atividade (ex.: 10 min de teoria, 10 min de flashcards, 10 min de questões) tende a renovar o ciclo natural de atenção e ajuda a manter o foco por mais tempo do que ficar na mesma tarefa repetitiva.",
    fonte:"blog.grancursosonline.com.br."
  },
  {
    titulo:"Reduza estímulos concorrentes, não elimine todo estímulo",
    corpo:"Celular fora de alcance (não só virado para baixo), uma aba só aberta, notificações desligadas e um espaço neutro ajudam a reduzir distrações externas. Por outro lado, um pouco de estímulo controlado — como ruído branco/marrom, mastigar chiclete, ou andar enquanto lê — pode ajudar a manter o foco, em vez de prejudicá-lo.",
    fonte:"lifeskillsadvocate.com; blog.grancursosonline.com.br."
  },
  {
    titulo:"Corpo em movimento, sono e rotina também são 'técnica de estudo'",
    corpo:"Exercício físico regular tem associação com melhora da atenção em pessoas com TDAH, e sono adequado é especialmente relevante, já que adultos com TDAH costumam ter mais dificuldade de regulação do sono. Ter um ciclo de estudos com horário fixo todos os dias reduz a ansiedade de 'quando vou começar'.",
    fonte:"Rassovsky & Alfassi (2019) e Surman & Walsh (2021), citados por add.org."
  },
  {
    titulo:"Estudar acompanhada (body doubling)",
    corpo:"Estudar ao lado de outra pessoa — presencialmente, por chamada de vídeo, ou em salas de 'estudar comigo' — pode ajudar a manter a responsabilidade e o foco, mesmo que a outra pessoa esteja fazendo algo diferente. A pesquisa formal sobre essa técnica ainda é limitada, mas é uma estratégia amplamente relatada como útil.",
    fonte:"add.org — nota explicitamente que a evidência formal aqui é limitada."
  },
];
