/* Conteúdo de teoria por matéria — isto é o que você LÊ no passo 1 da trilha. */
const TEORIA = {

portugues: [
`
<h4>Interpretação de texto e coesão/coerência</h4>
<p><strong>Coesão</strong> é a ligação gramatical entre as partes do texto: uso de pronomes, conectivos, sinônimos e repetição controlada para encadear as frases. <strong>Coerência</strong> é diferente — é o sentido lógico global, a compreensão unificada do texto como um todo. Um texto pode ter coesão perfeita e ainda não fazer sentido (incoerente), ou ser coerente com coesão mais frouxa.</p>
<p>Em prova, questões de interpretação cobram: a ideia central do texto, a função de um conectivo específico ("mas" = oposição, "pois" = causa/conclusão, "embora" = concessão), e o que uma palavra retoma (referência anafórica).</p>
<h4>Variação linguística e gêneros/tipologia textual</h4>
<p>Variação linguística é a forma como a língua muda conforme região, classe social, grau de formalidade e contexto — não existe "errado", existe adequado ou inadequado ao contexto.</p>
<p><strong>Gênero textual</strong> é a forma social que o texto assume (notícia, bilhete, e-mail, lei, edital). <strong>Tipologia textual</strong> é a estrutura interna: narrativo, descritivo, dissertativo-argumentativo, expositivo, injuntivo (instrucional).</p>
<div class="atencao"><strong>Pegadinha comum:</strong> banca troca o conectivo por outro de sentido parecido mas função diferente ("mas" vira "e", mudando a relação de oposição para adição) e pede para você notar a diferença de sentido causada pela troca.</div>
`,
`
<h4>Ortografia, classes de palavras e semântica</h4>
<p>Pontos mais cobrados: uso de <mark class="hl">"porquê"/"por que"/"por quê"/"porque"</mark>; <mark class="hl">"mal" x "mau"</mark>; <mark class="hl">"mas" x "mais"</mark>. Classes de palavras: substantivo, adjetivo, verbo, advérbio, pronome, preposição, conjunção. Semântica cobra sinônimos, antônimos, denotação x conotação, polissemia (palavra com vários sentidos conforme o contexto).</p>
<h4>Aprofundando: regência e crase</h4>
<p>Regência verbal: "assistir" (ver) pede preposição "a" ("assisti ao filme"); "assistir" (ajudar/morar) não pede. <mark class="hl">"Chegar/ir" pedem preposição "a", não "em"</mark> ("cheguei a Curitiba", nunca "cheguei em Curitiba" na norma culta cobrada em prova). Crase: ocorre na fusão da preposição "a" com o artigo feminino "a(s)" — regra prática: troque a palavra feminina por uma masculina equivalente; se aparecer "ao", há crase ("Fui à prefeitura" / "Fui ao órgão" → crase confirmada).</p>
<div class="exemplo"><strong>Exemplo de prova:</strong> "O auditor se referia àquela norma revogada" — crase antes de "aquela" é obrigatória por ser pronome demonstrativo feminino regido por preposição "a".</div>
`,
`
<h4>Funções sintáticas, concordância e pontuação</h4>
<p>Funções sintáticas principais: sujeito, predicado, objeto direto/indireto, predicativo do sujeito, complemento nominal, adjunto adnominal/adverbial. Concordância verbal: sujeito composto anteposto ao verbo geralmente leva o verbo ao plural. Concordância nominal: adjetivo concorda em gênero e número com o substantivo. Pontuação: vírgula não separa sujeito de predicado nem verbo de complemento sem motivo (erro clássico de prova).</p>
<h4>Literatura brasileira (noções gerais)</h4>
<p>Movimentos cobrados em concursos de nível médio/superior normalmente envolvem reconhecimento geral de períodos: Barroco, Arcadismo, Romantismo, Realismo/Naturalismo, Parnasianismo, Simbolismo, Modernismo (1ª, 2ª e 3ª gerações) — geralmente em nível superficial, associando autor a estilo/época.</p>
`
],

informatica: `
<h4>Hardware e software</h4>
<p><strong>Hardware</strong> é a parte física: CPU (processador), memória RAM (<mark class="hl">volátil</mark>, temporária) x armazenamento (HD/SSD, <mark class="hl">não volátil</mark>), periféricos de entrada (teclado, mouse, scanner) e saída (monitor, impressora). <strong>Software</strong> é o conjunto de programas; sistema operacional gerencia os recursos da máquina.</p>
<h4>Atalhos de teclado mais cobrados</h4>
<p>Ctrl+C/V/X (copiar/colar/recortar) · Ctrl+Z/Y (desfazer/refazer) · Ctrl+A (selecionar tudo) · Ctrl+F (localizar) · Ctrl+P (imprimir) · Ctrl+S (salvar) · Ctrl+N (novo) · Alt+Tab (alternar janelas) · Win+D (área de trabalho) · Win+L (bloquear tela) · Win+X (menu de acesso rápido no Windows 11) · F2 (renomear).</p>
<h4>Gerenciamento de arquivos e segurança</h4>
<p>Extensões indicam o tipo de arquivo (.docx, .xlsx, .pdf, .zip). Atalho (link) é diferente do arquivo original: apagar o atalho não apaga o arquivo. Segurança: backup, antivírus, firewall (filtra tráfego de rede), criptografia, autenticação em dois fatores, phishing (fraude por engenharia social via e-mail/link falso), ransomware (sequestra dados mediante resgate).</p>
<h4>Windows 10/11, Linux Ubuntu</h4>
<p>Windows: Explorador de Arquivos, Configurações/Painel de Controle, Central de Ações. Linux Ubuntu: terminal, gerenciador de pacotes (apt), estrutura de diretórios (/home, /etc, /usr), permissões de arquivo.</p>
<h4>Word e Excel</h4>
<p>Word: formatação de texto/parágrafo, estilos, cabeçalho/rodapé, controle de alterações. Excel: fórmulas (SOMA, MÉDIA, SE, PROCV/PROCH), referência <mark class="hl">relativa</mark> (muda ao copiar) x <mark class="hl">absoluta</mark> (fixada com cifrão antes da letra e do número, não muda ao copiar), gráficos, filtros, tabela dinâmica.</p>
<h4>Navegadores, nuvem, e-mail, busca e IA</h4>
<p>Navegadores: abas, modo anônimo, cache/cookies, HTTPS (conexão criptografada). Google Drive: armazenamento em nuvem com edição colaborativa em tempo real. E-mail: campos Para/Cc/Cco, anexos, filtros. Busca: aspas para busca exata, <code>site:</code> restringe domínio. IA generativa (ChatGPT, Copilot, Gemini) pode "alucinar" — gerar informação incorreta com aparência de certeza; exige verificação humana.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> confundir "backup incremental" (copia só o que mudou desde o último backup) com "backup completo" (copia tudo sempre). Bancas cobram essa diferença em questões de segurança da informação.</div>
<h4>Aprofundando: funções do Excel e segurança</h4>
<p>Funções úteis além de SOMA/MÉDIA/SE: CONT.SE (conta células que atendem a um critério), SOMASE (soma condicionalmente), PROCV (busca vertical por um valor em uma tabela). Tipos de malware: vírus (precisa de um programa hospedeiro para se espalhar), worm (se propaga sozinho pela rede, sem precisar de arquivo hospedeiro), trojan/cavalo de troia (parece um programa útil mas esconde código malicioso), spyware (coleta dados sem o usuário perceber).</p>
<div class="exemplo"><strong>Exemplo de prova:</strong> "=CONT.SE(A1:A10;">100")" conta quantas células entre A1 e A10 têm valor maior que 100 — função comum em questões de Excel aplicado à fiscalização (ex.: contar quantos contribuintes ultrapassam um limite de receita).</div>
`,

"leg-municipal": `
<h4>Lei Orgânica do Município de Curitiba</h4>
<p>É a "Constituição" do Município: organiza a estrutura político-administrativa local, as competências da Câmara e do Executivo, e a autonomia municipal.</p>
<h4>Lei Municipal nº <mark class="hl-prazo">1.656/1958</mark></h4>
<p>Estatuto dos Funcionários Públicos Municipais de Curitiba — direitos, deveres e regime disciplinar dos servidores. Tema clássico em provas municipais.</p>
<h4>Lei Municipal nº <mark class="hl-prazo">7.671/1991</mark></h4>
<p>Organização administrativa do Poder Executivo — estrutura de secretarias e órgãos.</p>
<h4>Código Tributário Municipal (Lei <mark class="hl-prazo">40/2001</mark> e normas correlatas)</h4>
<p>Consolida as normas sobre IPTU, ITBI, ISSQN e taxas municipais — fato gerador, base de cálculo, alíquotas, obrigações acessórias e penalidades específicas de Curitiba. Detalha procedimentos de lançamento, prazos de recolhimento e hipóteses locais de isenção.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> confundir a Lei Orgânica (organização político-administrativa geral) com o Código Tributário Municipal (regras específicas de tributos) — são normas diferentes, com finalidades diferentes.</div>
<h4>Aprofundando: hierarquia das normas municipais</h4>
<p>A Lei Orgânica está para o Município assim como a Constituição Federal está para a União — é a norma de maior hierarquia local, e todas as demais leis municipais (incluindo o Código Tributário) devem respeitá-la e respeitar a Constituição Federal e Estadual. Decretos do Executivo municipal regulamentam a aplicação das leis, mas não podem inovar além do que a lei permite (princípio da legalidade).</p>
`,

"dir-constitucional": [
`
<h4>Princípios fundamentais e direitos (arts. 1º a 5º da CF)</h4>
<p>Princípios fundamentais: forma federativa, soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e livre iniciativa, pluralismo político. Direitos e garantias fundamentais (art. 5º): igualdade, legalidade, devido processo legal, presunção de inocência, remédios constitucionais (habeas corpus, mandado de segurança, habeas data).</p>
<h4>Organização político-administrativa e dos Poderes</h4>
<p>União, Estados, DF e Municípios, todos autônomos (art. 18). Forma de Estado federativa; forma de governo republicana; sistema presidencialista. Poderes Legislativo, Executivo e Judiciário são independentes e harmônicos entre si (freios e contrapesos). Autonomia municipal (<mark class="hl-prazo">arts. 29-31</mark>): auto-organização, autogoverno, autolegislação e autoadministração. O Município <strong>não</strong> tem Judiciário próprio.</p>
<h4>Aprofundando: remédios constitucionais</h4>
<p><strong>Habeas corpus:</strong> protege a liberdade de locomoção (ir e vir) ameaçada ou violada por ilegalidade/abuso de poder. <strong>Mandado de segurança:</strong> protege direito líquido e certo não amparado por HC/HD, contra ato de autoridade pública. <strong>Habeas data:</strong> garante acesso ou retificação de informações sobre a própria pessoa em bancos de dados públicos. <strong>Ação popular:</strong> qualquer cidadão pode propor para anular ato lesivo ao patrimônio público, à moralidade administrativa, ao meio ambiente ou ao patrimônio histórico/cultural.</p>
`,
`
<h4>Administração Pública (arts. 37-41)</h4>
<p>Princípios expressos: LIMPE (Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência). Concurso público é a regra para investidura em cargo efetivo. Acumulação de cargos é proibida, salvo exceções expressas (ex.: dois cargos de professor), respeitada a compatibilidade de horários. Estabilidade exige <mark class="hl-prazo">3 anos</mark> de efetivo exercício com avaliação de desempenho. Responsabilidade civil do Estado é objetiva (independe de culpa), com direito de regresso contra o agente em caso de dolo/culpa.</p>
<h4>Tribunais de Contas</h4>
<p>Órgãos auxiliares do Legislativo no controle externo. No âmbito municipal, o controle externo é exercido pela Câmara, com auxílio do Tribunal de Contas do Estado.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> achar que o Tribunal de Contas julga as contas do Prefeito — na verdade, ele apenas emite PARECER PRÉVIO sobre as contas de governo do Chefe do Executivo; quem julga é a Câmara Municipal. Já as contas de gestão de outros administradores/ordenadores de despesa são julgadas pelo próprio Tribunal de Contas.</div>
`
],

"dir-administrativo": [
`
<h4>Regime jurídico-administrativo e princípios</h4>
<p>Combinação de prerrogativas (poderes especiais da Administração) e sujeições (limites e deveres) — supremacia do interesse público + indisponibilidade do interesse público. Princípios implícitos: autotutela (a Administração revisa seus próprios atos), continuidade do serviço público, razoabilidade/proporcionalidade, motivação.</p>
<h4>Atos administrativos</h4>
<p>Atributos: presunção de legitimidade, imperatividade, autoexecutoriedade, tipicidade. Elementos: sujeito, objeto, forma, motivo, finalidade. Atos <strong>vinculados</strong> (lei não deixa margem de escolha) x <strong>discricionários</strong> (margem de escolha quanto a oportunidade/conveniência, dentro de limites legais).</p>
<h4>Invalidação dos atos</h4>
<p><strong>Anulação</strong>: retira ato ilegal, efeito retroativo (ex tunc); pode ser feita pela Administração ou pelo Judiciário. <strong>Revogação</strong>: extingue ato legal mas inconveniente, efeito ex nunc; só a Administração revoga (Judiciário não revoga, só anula). <strong>Convalidação</strong>: corrige defeito sanável, com efeito retroativo.</p>
`,
`
<h4>Poderes administrativos</h4>
<p>Discricionário, regulamentar (decretos), hierárquico, disciplinar, e de <strong>polícia</strong> (limita direitos individuais em favor do interesse coletivo — fiscalização sanitária, de trânsito, tributária).</p>
<h4>Organização administrativa, servidores e licitações</h4>
<p>Administração direta (órgãos) x indireta (autarquias, fundações, empresas públicas, sociedades de economia mista). Descentralização (para outra pessoa jurídica) x desconcentração (interna). Licitações (Lei <mark class="hl-prazo">14.133/2021</mark>): pregão é a modalidade padrão para bens/serviços comuns; dispensa e inexigibilidade seguem hipóteses legais específicas. Lei de Improbidade (8.429/92, com reforma da Lei <mark class="hl-prazo">14.230/2021</mark>): após 2021, exige-se <strong>dolo</strong> para atos que causam prejuízo ao erário.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> inexigibilidade e dispensa de licitação não são sinônimos. Dispensa: a licitação é viável, mas a lei dispensa (ex.: valores pequenos, emergência). Inexigibilidade: a licitação é <em>inviável</em> porque não há competição possível (ex.: fornecedor exclusivo, notória especialização).</div>
<h4>Aprofundando: controle da Administração</h4>
<p>Controle quanto à origem: <strong>interno</strong> (a própria Administração se controla, via controladoria/auditoria) e <strong>externo</strong> (Legislativo, com auxílio do Tribunal de Contas). Quanto ao momento: <strong>prévio</strong> (antes do ato), <strong>concomitante</strong> (durante) e <strong>posterior</strong> (depois de praticado). Quanto ao aspecto: controle de <strong>legalidade</strong> (conformidade com a lei) e controle de <strong>mérito</strong> (conveniência/oportunidade, só cabível à própria Administração, nunca ao Judiciário).</p>
`
],

raciocinio: `
<h4>Lógica proposicional</h4>
<p>Proposições são verdadeiras ou falsas, nunca ambas. Conectivos: "e" (só verdadeira se ambas verdadeiras), "ou" (verdadeira se uma for verdadeira), "se...então" (falsa só quando antecedente verdadeiro e consequente falso), bicondicional. <mark class="hl">Negação de "todo" é "algum... não"</mark>; <mark class="hl">negação de "algum" é "nenhum"</mark>. Negação de "e" é "ou" com termos negados (Lei de De Morgan) e vice-versa.</p>
<h4>Estatística básica</h4>
<p>Média (soma dividida pela quantidade), moda (valor mais frequente), mediana (valor central ordenado). Desvio padrão e variância medem dispersão em torno da média. Leitura de gráficos e tabelas (barras, setores, séries) é comum em questões com dados fiscais.</p>
<h4>Matemática financeira</h4>
<p>Juros simples: incide sempre sobre o capital inicial, cresce linearmente. Juros compostos: incide sobre o montante acumulado (capital + juros anteriores), cresce exponencialmente — regime usado na maioria das operações financeiras e em multas/parcelamentos tributários. Desconto racional (sobre valor presente) x comercial (sobre valor futuro).</p>
<div class="atencao"><strong>Pegadinha comum:</strong> confundir "e" lógico (precisa das duas coisas serem verdadeiras) com "ou" inclusivo (basta uma ser verdadeira). E cuidado com o "ou exclusivo" em linguagem natural ("ou vai ou fica") que na lógica formal é tratado como "ou" inclusivo, salvo indicação contrária.</div>
<h4>Aprofundando: fórmulas de juros</h4>
<p>Juros simples: J = C × i × t (capital × taxa × tempo). Montante: M = C + J = C×(1 + i×t). Juros compostos: M = C×(1+i)^t — o "elevado a t" é o que faz a diferença crescer exponencialmente com o tempo. Em questões de multa/parcelamento tributário municipal, geralmente a taxa de juros de mora segue a Selic ou taxa fixa definida em lei municipal, aplicada mês a mês.</p>
<div class="exemplo"><strong>Exemplo de prova:</strong> um IPTU de R$ 1.000 em atraso há 3 meses, com juros de mora de 1% ao mês (juros simples): J = 1000 × 0,01 × 3 = R$ 30 de juros, totalizando R$ 1.030.</div>
`,

"dir-tributario": [
`
<h4>Conceito, espécies e competência</h4>
<p>Tributo (art. 3º CTN): prestação pecuniária compulsória, que não constitui sanção de ato ilícito, instituída em lei, cobrada por atividade vinculada. Espécies: impostos (não vinculados), taxas (vinculadas a serviço específico/divisível ou poder de polícia), contribuição de melhoria (por valorização imobiliária). Competência tributária é indelegável, mas seu exercício é facultativo; já a <strong>capacidade tributária ativa</strong> (cobrar/fiscalizar/arrecadar) pode ser delegada a outra pessoa jurídica de direito público.</p>
<h4>Princípios tributários constitucionais</h4>
<p>Legalidade, anterioridade anual (não cobrar no mesmo exercício da lei), anterioridade nonagesimal (<mark class="hl-prazo">90 dias</mark>), irretroatividade, isonomia, vedação ao confisco.</p>
`,
`
<h4>Obrigação, sujeitos e responsabilidade</h4>
<p>Obrigação principal (pagar tributo/multa) x acessória (deveres como emitir nota fiscal). Sujeito ativo (cobra) x passivo: contribuinte (relação direta com o fato gerador) ou responsável (por lei, sem ser o contribuinte direto). Responsabilidade por substituição, transferência, solidariedade e dos sucessores.</p>
<h4>Crédito tributário: lançamento, suspensão, extinção, exclusão</h4>
<p>Lançamento: de ofício (ex.: IPTU), por declaração, ou por homologação (ex.: ISSQN na maioria dos municípios — contribuinte apura e paga, fisco homologa depois). Suspensão (art. 151): moratória, depósito integral, recursos administrativos, liminar, parcelamento. Extinção (art. 156): pagamento, compensação, prescrição, decadência. <strong>Decadência</strong> extingue o direito de <strong>lançar</strong> (<mark class="hl-prazo">5 anos</mark>); <strong>prescrição</strong> extingue o direito de <strong>cobrar</strong> o crédito já lançado (<mark class="hl-prazo">5 anos</mark>). Exclusão (art. 175): isenção e anistia.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> isenção não é o mesmo que imunidade. Imunidade é limitação constitucional ao poder de tributar (a Constituição impede que o tributo sequer exista para aquele caso). Isenção é dispensa legal do pagamento de um tributo que, sem a lei isentiva, seria devido — é infraconstitucional, concedida por lei ordinária/específica.</div>
<h4>Aprofundando: imunidades tributárias (art. 150, VI, CF)</h4>
<p>São imunes a impostos: entes federativos entre si (imunidade recíproca), templos de qualquer culto, patrimônio/renda/serviços de partidos políticos, entidades sindicais de trabalhadores, instituições de educação e assistência social sem fins lucrativos (que atendam requisitos legais), livros, jornais, periódicos e o papel destinado à sua impressão. Atenção: a imunidade recíproca e as demais do art. 150, VI, aplicam-se apenas a <strong>impostos</strong> — não afastam taxas nem contribuições de melhoria.</p>
`
],

issqn: `
<h4>Base normativa e alíquotas</h4>
<p>Competência municipal (art. 156, III, CF); normas gerais na LC 116/2003; alíquota mínima de <mark class="hl-prazo">2%</mark> (EC 37/2002) e máxima de <mark class="hl-prazo">5%</mark>.</p>
<h4>Fato gerador e local de incidência</h4>
<p>Incide sobre prestação de serviços da lista anexa à LC 116/2003. Não incide sobre exportação de serviços (salvo resultado verificado no Brasil) nem sobre vínculo empregatício. <strong>Regra geral</strong>: devido no município do estabelecimento prestador. <strong>Exceções</strong> (art. 3º): para construção civil, limpeza, vigilância, etc., é devido no município onde o serviço é efetivamente executado.</p>
<h4>Sujeito passivo e responsabilidade</h4>
<p>Contribuinte: o prestador. Base de cálculo: preço do serviço. Muitos municípios (inclusive Curitiba) preveem retenção na fonte: o tomador do serviço fica responsável por reter e recolher o ISSQN em nome do prestador. Profissionais autônomos e sociedades uniprofissionais podem ter regime de tributação fixa.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> achar que todo serviço descrito na lista anexa da LC 116/2003 é tributado no local da execução. Essa é a <em>exceção</em> (lista taxativa do art. 3º) — a regra, para a maioria dos serviços, continua sendo o estabelecimento prestador.</div>
<h4>Aprofundando: lista de serviços e não cumulatividade</h4>
<p>A lista de serviços da LC 116/2003 é taxativa (numerus clausus), mas admite interpretação extensiva dentro de cada item (ex.: "serviços de informática e congêneres" abrange serviços análogos aos ali previstos). O ISSQN é um imposto não cumulativo apenas no sentido de incidir sobre o preço do serviço prestado, sem o mecanismo de créditos e débitos típico do ICMS/IPI — ou seja, não há "crédito de ISSQN" a abater como há no ICMS.</p>
`,

"demais-tributos": `
<h4>IPTU</h4>
<p>Fato gerador: propriedade, domínio útil ou posse de imóvel urbano (art. 32 CTN). Base de cálculo: valor venal. Pode ser progressivo no tempo (função social da propriedade, art. 182 §4º CF) e progressivo pelo valor do imóvel (art. 156 §1º CF).</p>
<h4>ITBI</h4>
<p>Fato gerador: transmissão <strong>onerosa</strong>, por ato <strong>inter vivos</strong>, de bens imóveis. Não incide sobre causa mortis nem doação (competência estadual — ITCMD).</p>
<h4>Taxas e contribuição de melhoria</h4>
<p>Taxas de serviço (vinculadas a serviço público específico/divisível) x taxas de polícia/fiscalização (vinculadas ao poder de polícia — ex.: fiscalização de localização e funcionamento). Contribuição de melhoria: por valorização imobiliária decorrente de obra pública; limite total = custo da obra; limite individual = valorização do imóvel.</p>
<h4>Legislação Tributária de Curitiba</h4>
<p>O Código Tributário Municipal consolida IPTU, ITBI, ISSQN e taxas, com regras locais de lançamento, prazos e isenções específicas.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> banca pergunta se o IPTU incide sobre imóvel rural — não incide (é ITR, federal). O critério não é apenas a localização, mas a destinação e a existência de melhoramentos urbanos definidos em lei municipal (meio-fio, água, esgoto, iluminação, etc. — <mark class="hl-prazo">ao menos 2 desses</mark>, conforme o CTN).</div>
<h4>Aprofundando: taxa x preço público (tarifa)</h4>
<p>Taxa é tributo (compulsória, regime jurídico de direito público, <mark class="hl-prazo">prescreve em 5 anos</mark>). Preço público/tarifa é contraprestação contratual, facultativa (ex.: tarifa de ônibus, conta de água em alguns modelos) — não é tributo, não segue os princípios tributários (legalidade estrita, anterioridade). A distinção costuma aparecer em questões que pedem para identificar qual das duas naturezas se aplica a determinado serviço público municipal.</p>
`,

"pat-reforma": `
<h4>Processo Administrativo Tributário</h4>
<p>Finalidade: apurar/constituir o crédito e garantir contraditório/ampla defesa. Fases: auto de infração → impugnação (defesa do contribuinte) → julgamento em 1ª instância → recurso voluntário → decisão definitiva. A impugnação tempestiva <strong>suspende a exigibilidade</strong> do crédito (art. 151, III, CTN). Após esgotadas as instâncias sem pagamento, o crédito é inscrito em <strong>dívida ativa</strong>, tornando-se título líquido, certo e exigível, apto a lastrear execução fiscal.</p>
<h4>Reforma Tributária do Consumo (EC 132/2023)</h4>
<p>ICMS, ISSQN e PIS/Cofins serão substituídos, ao final da transição, pelo <strong>IBS</strong> (Imposto sobre Bens e Serviços, compartilhado entre Estados e Municípios) e pela <strong>CBS</strong> (federal) — um IVA dual. Cria-se também o Imposto Seletivo (IS). Princípio do <strong>destino</strong>: o IBS é cobrado no local de consumo, não na origem. Transição gradual entre <mark class="hl-prazo">2026 e 2033</mark>; o ISSQN segue vigente durante esse período. Para fiscais municipais: necessidade de adaptação de sistemas e participação no Comitê Gestor do IBS.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> achar que o ISSQN acaba imediatamente com a Reforma. Não — há um período de transição longo (2026-2033), com redução gradual das alíquotas dos tributos antigos e aumento gradual do IBS/CBS, para evitar choque na arrecadação e na carga tributária.</div>
<h4>Aprofundando: fases do PAT em mais detalhe</h4>
<p>1) <strong>Lavratura</strong> do auto de infração/notificação de lançamento, com descrição do fato, capitulação legal e valor apurado. 2) <strong>Impugnação</strong> no prazo legal (<mark class="hl-prazo">geralmente 30 dias</mark>), que deve ser tempestiva para suspender a exigibilidade. 3) <strong>Julgamento em 1ª instância</strong>, por autoridade ou órgão julgador administrativo. 4) <strong>Recurso voluntário</strong> à 2ª instância (conselho de contribuintes/tribunal administrativo), cabível pelo contribuinte inconformado. 5) <strong>Decisão definitiva</strong> — se desfavorável ao contribuinte e não paga, segue para inscrição em dívida ativa e posterior execução fiscal judicial.</p>
`,

contabilidade: `
<h4>Patrimônio e equação fundamental</h4>
<p>Patrimônio = bens/direitos (ativo) + obrigações (passivo); a diferença é o patrimônio líquido. Equação: Ativo = Passivo + Patrimônio Líquido.</p>
<h4>Demonstrações contábeis</h4>
<p>Balanço Patrimonial: posição patrimonial/financeira em uma data. DRE: receitas, custos, despesas e resultado do período. DFC: entradas/saídas de caixa (operacionais, investimento, financiamento).</p>
<h4>Partidas dobradas e regimes</h4>
<p>Todo lançamento envolve, no mínimo, uma conta debitada e uma creditada, de valores iguais. Ativo/despesa aumentam a débito; passivo/PL/receita aumentam a crédito. Livro Diário (cronológico) x Livro Razão (por conta). Regime de <strong>competência</strong>: <mark class="hl">reconhece quando ocorre, independente do pagamento</mark> (regra geral). Regime de <strong>caixa</strong>: <mark class="hl">só no recebimento/pagamento efetivo</mark>.</p>
<h4>Depreciação, provisões e análise</h4>
<p>Depreciação (bens tangíveis), amortização (intangíveis), exaustão (recursos naturais) — perda gradual de valor. Provisões: obrigações de valor/prazo incertos. Índices de liquidez e endividamento em análise de balanços.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> achar que "débito" é sempre algo ruim/negativo e "crédito" sempre bom. Na contabilidade são apenas lados do lançamento (esquerda/direita) — débito aumenta ativo e despesa, mas diminui passivo, PL e receita; crédito é o inverso.</div>
<h4>Aprofundando: exemplo de lançamento</h4>
<p>Compra de material de escritório à vista, R$ 200: débito em "Material de Escritório" (despesa, aumenta) e crédito em "Caixa" (ativo, diminui) — os dois lados somam R$ 200, respeitando as partidas dobradas. Em uma prestação de serviço recebida à vista: débito em "Caixa" (ativo aumenta) e crédito em "Receita de Serviços" (receita aumenta).</p>
`,

"contab-publica": `
<h4>Lei 4.320/1964 e NBCASP</h4>
<p>Lei 4.320/1964: norma geral de direito financeiro — elaboração e controle de orçamentos e balanços públicos. NBCASP converge a contabilidade pública aos padrões internacionais (IPSAS), somando apuração patrimonial ao controle orçamentário tradicional.</p>
<h4>Ciclo orçamentário</h4>
<p>PPA (Plano Plurianual, <mark class="hl-prazo">4 anos</mark>) → LDO (Lei de Diretrizes Orçamentárias, anual, orienta a LOA) → LOA (Lei Orçamentária Anual, estima receita e fixa despesa). Princípios: unidade (tudo em uma única lei), universalidade, anualidade, não afetação das receitas (regra geral).</p>
<h4>Receita, despesa e LRF</h4>
<p>Receitas correntes (tributárias, patrimoniais) x de capital (operações de crédito, alienação de bens). Despesas correntes (custeio, pessoal) x de capital (investimentos). Lei de Responsabilidade Fiscal (LC 101/2000): limites de gasto com pessoal, metas fiscais, transparência, regras para geração de despesa.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> confundir a ORDEM do ciclo — primeiro vem o PPA (planejamento de 4 anos), depois a LDO (prioridades e metas para o ano seguinte, orienta a LOA), e só então a LOA (o orçamento detalhado daquele exercício). A LDO é elaborada ANTES da LOA, nunca depois.</div>
<h4>Aprofundando: limites de pessoal da LRF</h4>
<p>A LRF estabelece limites de gasto com pessoal como percentual da Receita Corrente Líquida (RCL): <mark class="hl-prazo">60%</mark> para Estados e Municípios no total, dividido entre os Poderes (no Município, o Executivo tem limite de <mark class="hl-prazo">54%</mark> e o Legislativo de <mark class="hl-prazo">6%</mark>, por exemplo). Ultrapassar o limite prudencial (<mark class="hl-prazo">90%</mark> do limite máximo) já impõe restrições, como proibição de conceder vantagens e de criar cargos.</p>
`,

"civil-empresarial": `
<h4>Noções de Direito Civil</h4>
<p>Pessoas naturais e jurídicas (capacidade civil, início/fim da personalidade). Domicílio é relevante para fins de incidência tributária em certos casos. Bens: imóveis x móveis, fungíveis x infungíveis — relevante para ITBI e IPTU.</p>
<h4>Direito Empresarial</h4>
<p>Empresário: exercício profissional de atividade econômica organizada. Tipos societários: sociedade limitada, S.A., empresário individual, MEI — relevantes para fiscalização do ISSQN e enquadramento tributário. <strong>Simples Nacional</strong> (LC <mark class="hl-prazo">123/2006</mark>): regime unificado para micro e pequenas empresas, com partilha de receitas entre os entes, inclusive a parcela de ISSQN.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> confundir MEI (Microempreendedor Individual, limite de receita bruta anual bem menor, tributação em valor fixo) com ME/EPP optantes do Simples Nacional "normal" (faixas de faturamento maiores, alíquotas progressivas por faixa).</div>
<h4>Aprofundando: registro do empresário</h4>
<p>O empresário (individual ou sociedade empresária) deve registrar seus atos constitutivos na Junta Comercial, diferente das sociedades simples (profissões intelectuais, científicas ou artísticas), que registram no Cartório de Registro Civil de Pessoas Jurídicas. Isso é relevante para fiscalização: a natureza do registro pode indicar o regime tributário aplicável ao prestador de serviço.</p>
`,

"penal-lrf": `
<h4>Direito Penal Tributário</h4>
<p>Crimes contra a ordem tributária (Lei <mark class="hl-prazo">8.137/1990</mark>): <mark class="hl">suprimir/reduzir tributo mediante fraude</mark>, omissão de informação, declaração falsa, uso de documento falso. O simples inadimplemento <strong>não</strong> é crime — exige-se fraude/dolo. O pagamento integral do tributo, mesmo após a denúncia, pode extinguir a punibilidade (entendimento consolidado).</p>
<h4>Lei de Responsabilidade Fiscal — aspectos sancionatórios</h4>
<p>Lei <mark class="hl-prazo">10.028/2000</mark> (Lei de Crimes Fiscais): tipifica condutas que violam a LRF — operação de crédito sem autorização legislativa, despesa não autorizada, deixar de prestar contas. O agente público responde pessoalmente por violações, podendo configurar crime de responsabilidade e improbidade.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> achar que qualquer erro de gestão fiscal é automaticamente crime. A maioria das irregularidades fiscais gera responsabilização administrativa/civil (ex.: via Tribunal de Contas); o crime fiscal exige a conduta específica tipificada na Lei 10.028/2000, com elemento subjetivo (dolo, em regra).</div>
<h4>Aprofundando: sonegação x elisão fiscal</h4>
<p><strong>Elisão fiscal</strong> (planejamento tributário lícito): o contribuinte organiza seus negócios, antes da ocorrência do fato gerador, para pagar menos tributo dentro da lei. <strong>Evasão/sonegação fiscal</strong>: prática ilícita para esconder ou deturpar o fato gerador já ocorrido, geralmente após sua ocorrência, configurando ilícito administrativo e, se houver fraude dolosa, também crime (Lei 8.137/1990).</p>
`,

economia: `
<h4>Micro e macroeconomia</h4>
<p>Oferta e demanda, elasticidade-preço, estruturas de mercado. PIB mede a produção total de bens/serviços em um período. <mark class="hl">Inflação é a perda do poder de compra da moeda</mark> (medida pelo IPCA). Política fiscal (gastos/tributos) x política monetária (juros/moeda, via Banco Central).</p>
<h4>Metodologias de pesquisa econômica aplicadas à fiscalização</h4>
<p>Uso de indicadores locais (PIB municipal, número de empresas ativas) para dimensionar a base tributável. Cruzamento de dados (data matching): comparar declarações do contribuinte com dados de terceiros para identificar indícios de sonegação. Fiscalização orientada por risco: técnicas estatísticas priorizam contribuintes com maior probabilidade de irregularidade.</p>
<h4>TI aplicada à fiscalização</h4>
<p>NFS-e (Nota Fiscal Eletrônica de Serviços): essencial para fiscalização do ISSQN. Malha fiscal: softwares que cruzam declarações com dados de terceiros. Big data/data mining para identificar padrões suspeitos. Certificação digital (ICP-Brasil) garante autenticidade de documentos eletrônicos.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> achar que inflação e aumento de preços são sempre a mesma coisa em qualquer contexto de prova — inflação é o aumento generalizado e persistente do nível de preços, não o aumento pontual de um único produto por motivo específico (entressafra, por exemplo).</div>
<h4>Aprofundando: indicadores econômicos municipais</h4>
<p>Além do PIB municipal, fiscais tributários costumam usar: número de empresas ativas por setor (CNAE), massa salarial declarada (relevante para estimar potencial de ISSQN/IRRF), índice de inadimplência tributária, e taxa de evasão fiscal estimada — todos usados para comparar a arrecadação esperada com a arrecadação real e identificar possíveis áreas de sonegação.</p>
`,

governanca: `
<h4>Conceito e dimensões</h4>
<p>Governança pública: mecanismos de liderança, estratégia e controle para avaliar, direcionar e monitorar a gestão em prol das políticas públicas. <strong>Governança</strong> define diretrizes (<mark class="hl">"fazer a coisa certa"</mark>); <strong>gestão</strong> executa operacionalmente (<mark class="hl">"fazer certo a coisa"</mark>).</p>
<h4>Princípios e controle</h4>
<p>Transparência, integridade, prestação de contas (<strong>accountability</strong>), controle social. Controle <strong>interno</strong> (dentro da própria Administração) x <strong>externo</strong> (Legislativo, com auxílio do Tribunal de Contas). Compliance público: prevenção/detecção/correção de irregularidades.</p>
<h4>Governança tributária</h4>
<p>Gestão de riscos fiscais orienta a priorização da fiscalização por risco de sonegação. O novo Comitê Gestor do IBS (Reforma Tributária) exigirá governança interfederativa, com participação municipal.</p>
<div class="atencao"><strong>Pegadinha comum:</strong> tratar "governança" e "gestão" como sinônimos em prova. A banca costuma montar uma frase descrevendo uma ação tipicamente operacional (ex.: "executar a cobrança de um tributo") e chamá-la de "governança" para testar se você percebe que isso é, na verdade, gestão.</div>
<h4>Aprofundando: ciclo de gestão de riscos</h4>
<p>1) Identificação dos riscos (ex.: setores com maior histórico de sonegação). 2) Análise/avaliação (probabilidade x impacto). 3) Tratamento (priorizar fiscalização nos casos de maior risco). 4) Monitoramento contínuo — esse ciclo é a base conceitual tanto da governança de riscos corporativa quanto da fiscalização tributária orientada por risco, usada por administrações fazendárias modernas.</p>
`,

};

/* Diagrama de apoio (SVG original, gerado para este material) por matéria */
const IMAGENS = {
  portugues: "portugues.svg",
  informatica: "informatica.svg",
  "leg-municipal": "leg-municipal.svg",
  "dir-constitucional": "dir-constitucional.svg",
  "dir-administrativo": "dir-administrativo.svg",
  raciocinio: "raciocinio.svg",
  "dir-tributario": "dir-tributario.svg",
  issqn: "issqn.svg",
  "demais-tributos": "demais-tributos.svg",
  "pat-reforma": "pat-reforma.svg",
  contabilidade: "contabilidade.svg",
  "contab-publica": "contab-publica.svg",
  "civil-empresarial": "civil-empresarial.svg",
  "penal-lrf": "penal-lrf.svg",
  economia: "economia.svg",
  governanca: "governanca.svg",
};
