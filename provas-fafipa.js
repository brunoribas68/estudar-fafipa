/* ===================== QUESTÕES REAIS DA FAFIPA (comentadas) =====================
   Fonte: FAFIPA 2025 — Prefeitura de Jaguapitã/PR — concurso para Agente Fiscal
   Tributário (cargo de nível superior, da mesma banca FAFIPA, com conteúdo de
   Direito Tributário muito próximo ao do edital de Auditor Fiscal de Tributos
   Municipais de Curitiba). PDF oficial: arquivos.qconcursos.com (prova 143470).

   AVISO HONESTO: o PDF de origem tem a diagramação corrompida na extração de texto
   (colunas embaralhadas), então os enunciados e alternativas abaixo são uma
   RECONSTRUÇÃO PRÓXIMA do conteúdo real, não uma cópia literal garantida
   caractere a caractere. Em algumas questões, o rótulo "gabarito preliminar" do
   PDF também saiu ilegível — nesses casos, a resposta aqui foi conferida de forma
   independente com base no texto de lei (CTN), e isso está dito explicitamente
   em cada explicação. Há poucas provas da FAFIPA publicamente disponíveis para
   cargos de fiscal tributário — esta foi a mais próxima que encontrei. */

const PROVAS_FAFIPA = [
  {
    id: "pf1",
    materia: "dir-tributario",
    fonte: "FAFIPA 2025 — Jaguapitã/PR — Agente Fiscal Tributário — Q26",
    enunciado: "Sobre o fato gerador da obrigação tributária, segundo o CTN, analise as afirmativas e assinale a alternativa com as corretas:",
    opcoes: [
      "I, II e IV, apenas.",
      "II, IV e V, apenas.",
      "I, III e V, apenas.",
      "I, III e IV, apenas."
    ],
    correta: 3,
    explicacao: "Gabarito preliminar da prova: alternativa D (I, III e IV). A questão tratava do momento de ocorrência do fato gerador, da autonomia da obrigação acessória em relação à principal, e da possibilidade de a autoridade desconsiderar atos ou negócios jurídicos praticados com a finalidade de dissimular a ocorrência do fato gerador (art. 116, parágrafo único, CTN)."
  },
  {
    id: "pf2",
    materia: "dir-tributario",
    fonte: "FAFIPA 2025 — Jaguapitã/PR — Agente Fiscal Tributário — Q27",
    enunciado: "Relacione os tributos municipais às suas modalidades de lançamento: I. ITBI (apurado com base em informações prestadas pelo próprio contribuinte); II. IPTU (lançamento automático, a partir do cadastro imobiliário mantido pelo Município); III. ISSQN (na maioria dos municípios, o próprio contribuinte apura e recolhe, sem análise prévia do fisco).",
    opcoes: [
      "I – lançamento por homologação; II – lançamento de ofício; III – lançamento por declaração.",
      "I – lançamento por declaração; II – lançamento por homologação; III – lançamento de ofício.",
      "I – lançamento de ofício; II – lançamento por homologação; III – lançamento por declaração.",
      "I – lançamento por declaração; II – lançamento de ofício; III – lançamento por homologação."
    ],
    correta: 3,
    explicacao: "Gabarito preliminar: alternativa D. O ITBI costuma ser lançado por declaração (o contribuinte informa o valor da transação, e o fisco lança com base nessa informação); o IPTU é lançado de ofício (a Administração já tem o cadastro imobiliário e lança automaticamente, todo ano); o ISSQN, na maior parte dos municípios, é lançado por homologação (o contribuinte apura e recolhe antecipadamente, sujeito à homologação posterior do fisco)."
  },
  {
    id: "pf3",
    materia: "dir-tributario",
    fonte: "FAFIPA 2025 — Jaguapitã/PR — Agente Fiscal Tributário — Q28",
    enunciado: "Assinale a alternativa INCORRETA sobre a inscrição em dívida ativa tributária:",
    opcoes: [
      "A dívida regularmente inscrita goza de presunção absoluta de certeza e liquidez.",
      "O termo de inscrição deve conter o nome do devedor, o valor devido e a origem do crédito, entre outros requisitos.",
      "A inscrição em dívida ativa ocorre após o esgotamento do prazo legal para pagamento do crédito.",
      "O erro ou a omissão de requisitos obrigatórios na inscrição pode ser sanado até a decisão de primeira instância."
    ],
    correta: 0,
    explicacao: "Gabarito preliminar: alternativa A (é a incorreta, conforme pedido). Pelo art. 204 do CTN, a dívida ativa regularmente inscrita goza apenas de presunção RELATIVA (e não absoluta) de certeza e liquidez — ou seja, admite prova em contrário pelo sujeito passivo ou por terceiro a quem aproveite. As demais alternativas (B, C e D) descrevem corretamente requisitos e regras da dívida ativa previstos nos arts. 201-203 do CTN."
  },
  {
    id: "pf4",
    materia: "dir-tributario",
    fonte: "FAFIPA 2025 — Jaguapitã/PR — Agente Fiscal Tributário — Q29",
    enunciado: "Sobre o crédito tributário e sua suspensão, assinale a alternativa CORRETA:",
    opcoes: [
      "A isenção equivale à extinção do crédito tributário, pois desobriga definitivamente o contribuinte.",
      "O recurso administrativo regularmente protocolado suspende a exigibilidade do crédito tributário.",
      "A concessão de isenção e a impugnação administrativa são, ambas, formas de extinção do crédito tributário.",
      "A apresentação de recurso administrativo não suspende a exigibilidade do crédito tributário."
    ],
    correta: 1,
    explicacao: "O rótulo de gabarito deste item saiu ilegível no PDF de origem, mas a resposta é determinável pelo próprio CTN: reclamações e recursos administrativos SUSPENDEM a exigibilidade do crédito tributário (art. 151, III, CTN) — portanto a alternativa B está correta, e a D (que diz o contrário) está errada. A isenção é causa de EXCLUSÃO do crédito (art. 175, I), não de extinção (torna as alternativas A e C incorretas, pois tratam isenção como extinção)."
  },
  {
    id: "pf5",
    materia: "dir-tributario",
    fonte: "FAFIPA 2025 — Jaguapitã/PR — Agente Fiscal Tributário — Q32",
    enunciado: "Sobre os sujeitos da obrigação tributária, assinale a alternativa CORRETA:",
    opcoes: [
      "A convenção contratual entre as partes pode afastar, perante a Fazenda Pública, a responsabilidade tributária prevista em lei.",
      "O sujeito passivo da obrigação principal é sempre o contribuinte, jamais podendo a lei atribuir essa condição a um responsável.",
      "O sujeito ativo da obrigação tributária é a pessoa jurídica de direito público titular da competência para exigi-la.",
      "O sujeito ativo da obrigação tributária é o contribuinte, pessoa física ou jurídica obrigada ao pagamento do tributo."
    ],
    correta: 2,
    explicacao: "O rótulo de gabarito deste item também saiu ilegível no PDF, mas a resposta correta é a alternativa C, pela própria definição do art. 119 do CTN: sujeito ativo é a pessoa jurídica de direito público titular da competência para exigir o cumprimento da obrigação. A alternativa A contraria o art. 123 do CTN (convenções particulares não podem ser opostas à Fazenda Pública para modificar a definição legal do sujeito passivo). A B está errada porque a lei pode atribuir a responsabilidade a terceiro (responsável), não apenas ao contribuinte. A D inverte os conceitos: quem paga o tributo é o sujeito passivo, não o ativo."
  },
  {
    id: "pf6",
    materia: "dir-tributario",
    fonte: "FAFIPA 2025 — Jaguapitã/PR — Agente Fiscal Tributário — Q36",
    enunciado: "Sobre o domicílio tributário, assinale a alternativa CORRETA:",
    opcoes: [
      "No caso de pessoa jurídica de direito privado, o domicílio tributário será obrigatoriamente o local da sede, sem exceções.",
      "A autoridade fiscal não pode, em nenhuma hipótese, recusar o domicílio eleito pelo contribuinte.",
      "O domicílio tributário é sempre o endereço residencial do proprietário ou responsável pelo imóvel.",
      "A autoridade administrativa pode recusar o domicílio eleito pelo contribuinte quando este impossibilite ou dificulte a fiscalização."
    ],
    correta: 3,
    explicacao: "O rótulo de gabarito saiu ambíguo no PDF, mas a resposta correta, pelo art. 127, §2º, do CTN, é a alternativa D: a autoridade administrativa pode recusar o domicílio eleito quando impossibilite ou dificulte a arrecadação/fiscalização do tributo, aplicando-se então a regra geral do caput do artigo (local da sede ou do estabelecimento, conforme o caso)."
  },
];
