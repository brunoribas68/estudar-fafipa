# estudar-fafipa

Painel de estudos para o concurso de **Auditor Fiscal de Tributos Municipais — Prefeitura de Curitiba (FAFIPA, Edital Normativo n° 5/2026)**.

É um app estático (HTML/CSS/JS puro), sem backend e sem instalação — roda direto no navegador, local no seu computador, e guarda seu progresso no `localStorage` (fica só na sua máquina, não sincroniza entre dispositivos).

## Como usar

1. Baixe/clone este repositório.
2. Abra o arquivo `index.html` no navegador (duplo clique funciona).
3. Pronto. Não precisa de internet, servidor, nem instalar nada.

```bash
git clone https://github.com/brunoribas68/estudar-fafipa
cd estudar-fafipa
# abra index.html no navegador
```

## O que tem

- **🎮 Trilha** — o fluxo principal, pensado como um passo a passo tipo jogo: para cada dia do cronograma você **lê** a teoria (com imagem de apoio e opção de ouvir em voz alta), pratica com **flashcards** de repetição espaçada, responde um **quiz curto** e marca o dia como concluído. Dá pra pular qualquer parte e escolher qualquer dia, sem ordem obrigatória.
- **📊 Painel** — dias até a prova, cards pendentes de revisão, sequência de estudo, % de acerto geral e progresso por matéria.
- **🗂️ Flashcards livres** / **📝 Questões livres** — prática solta por matéria, fora do fluxo guiado da trilha.
- **🏛️ Provas reais FAFIPA** — questões reconstruídas a partir de uma prova real e recente da própria banca (FAFIPA 2025, Prefeitura de Jaguapitã-PR, Agente Fiscal Tributário), comentadas com base no CTN. É pouco, porque a FAFIPA tem poucas provas públicas para esse perfil de cargo — está dito isso no próprio app.
- **⏱️ Foco livre** — timer de estudo com blocos curtos (padrão 12 min), pensado para TDAH, em vez do Pomodoro clássico de 25 min.
- **📅 Cronograma** — visão de todos os dias, do início até a prova (06/12/2026), com os domingos marcados como revisão (sem conteúdo novo).
- **💡 Dicas (TDAH)** — resumo de pesquisas sobre técnicas de estudo com maior evidência (repetição espaçada, recall ativo) para quem tem TDAH, cada uma com a fonte.

## Como responder as questões

Clicar numa alternativa só **seleciona** ela (fica destacada) — nada é revelado ainda. Só depois de clicar em **"Confirmar resposta"** é que a questão mostra se acertou ou errou e abre a explicação. Isso evita marcar errado sem querer.

## Voz e imagens

- O botão **🔊 Ouvir este conteúdo** usa a síntese de voz nativa do navegador (Web Speech API) — funciona offline, sem depender de serviço externo, e usa a melhor voz em português já instalada no seu sistema operacional.
- As imagens em `images/` são diagramas originais em SVG, um por matéria, feitos para fixar contrastes e sequências-chave (ex.: decadência × prescrição, ciclo orçamentário PPA→LDO→LOA).

## Estrutura dos arquivos

```
index.html          estrutura da página e das abas
style.css            estilo visual
data.js              cronograma, flashcards e banco de questões próprio
theory.js            teoria completa por matéria + mapa de imagens
provas-fafipa.js      questões reais da FAFIPA comentadas
app.js               toda a lógica (trilha, SRS, quiz, timer, voz, progresso)
images/              diagramas SVG de apoio, um por matéria
```

## Limitações conhecidas

- O banco de questões "livre" (por matéria, em `data.js`) é de autoria própria, no estilo da banca, mas não é cópia de provas reais — só a aba "Provas reais FAFIPA" traz questões de prova oficial.
- O progresso é salvo no navegador local (`localStorage`). Trocar de navegador ou de computador começa do zero; limpar os dados do site também apaga o progresso.
