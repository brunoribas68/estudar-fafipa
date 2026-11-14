#!/usr/bin/env node
/* Gera os infográficos específicos de cada "parte" das matérias que foram
   divididas em múltiplos dias (ver data.js / theory.js). Os diagramas que já
   existiam (dir-constitucional.svg, dir-administrativo.svg, dir-tributario.svg,
   portugues.svg) cobrem só um dos trechos — este script:
     1. move/renomeia cada um pro arquivo "-parteN" certo
     2. gera os infográficos que faltam pras outras partes
   Rodar: node tools/build-split-diagrams.js */
const fs = require("fs");
const path = require("path");
const { compareSVG, gridSVG } = require("./make-diagram");

const ROOT = path.join(__dirname, "..");
const IMG = path.join(ROOT, "images");

function write(name, svg){
  fs.writeFileSync(path.join(IMG, name), svg, "utf8");
  console.log("✅ " + name);
}

// --- rename existentes para a parte correta -------------------------------
// portugues.svg (Coesão × Coerência) → parte 1
fs.copyFileSync(path.join(IMG,"portugues.svg"), path.join(IMG,"portugues-parte1.svg"));
// dir-constitucional.svg (LIMPE) → parte 2 (Administração Pública)
fs.copyFileSync(path.join(IMG,"dir-constitucional.svg"), path.join(IMG,"dir-constitucional-parte2.svg"));
// dir-administrativo.svg (Vinculado × Discricionário) → parte 1 (Atos administrativos)
fs.copyFileSync(path.join(IMG,"dir-administrativo.svg"), path.join(IMG,"dir-administrativo-parte1.svg"));
// dir-tributario.svg (Decadência × Prescrição) → parte 2 (Crédito tributário)
fs.copyFileSync(path.join(IMG,"dir-tributario.svg"), path.join(IMG,"dir-tributario-parte2.svg"));
console.log("↪ renomeados 4 diagramas existentes para a parte correta\n");

// --- novos diagramas --------------------------------------------------------

// Português parte 2 — Crase e regência
write("portugues-parte2.svg", compareSVG("Tem crase? Troque por masculino", [
  { label:"Vira \"AO\"", color:"#58cc02", lines:["há crase","(fui À prefeitura)"] },
  { label:"Vira \"O\"", color:"#ff4b4b", lines:["sem crase","(entreguei o relatório)"] },
]));

// Português parte 3 — Funções sintáticas (grid 3)
write("portugues-parte3.svg", gridSVG("Funções sintáticas essenciais", [
  { label:"Sujeito", color:"#1cb0f6", lines:["quem pratica","a ação do verbo"] },
  { label:"Objeto direto/indireto", color:"#58cc02", lines:["completa o verbo,","sem/com preposição"] },
  { label:"Adjunto adnominal", color:"#ffc800", lines:["modifica o","substantivo"] },
]));

// Dir. Constitucional parte 1 — Remédios constitucionais (grid 4)
write("dir-constitucional-parte1.svg", gridSVG("Remédios Constitucionais", [
  { label:"Habeas Corpus", color:"#1cb0f6", lines:["protege a","liberdade de ir e vir"] },
  { label:"Mand. Segurança", color:"#58cc02", lines:["direito líquido","e certo"] },
  { label:"Habeas Data", color:"#ffc800", lines:["acesso a dados","sobre si mesmo"] },
  { label:"Ação Popular", color:"#ff9600", lines:["qualquer cidadão,","patrimônio público"] },
]));

// Dir. Administrativo parte 2 — Dispensa × Inexigibilidade
write("dir-administrativo-parte2.svg", compareSVG("Dispensa × Inexigibilidade de licitação", [
  { label:"Dispensa", color:"#58cc02", lines:["licitação é viável,","mas a lei dispensa"] },
  { label:"Inexigibilidade", color:"#ff4b4b", lines:["licitação é inviável","(fornecedor exclusivo)"] },
], { midColor:"#ff4b4b" }));

// Dir. Tributário parte 1 — Espécies de tributo (grid 3)
write("dir-tributario-parte1.svg", gridSVG("Espécies de tributo", [
  { label:"Impostos", color:"#1cb0f6", lines:["não vinculados a","nenhum serviço"] },
  { label:"Taxas", color:"#58cc02", lines:["vinculadas a serviço","específico/poder de polícia"] },
  { label:"Contrib. de melhoria", color:"#ffc800", lines:["por valorização","imobiliária"] },
]));

console.log("\nPronto. Atualize IMAGENS em theory.js para apontar pros novos arquivos por parte.");
