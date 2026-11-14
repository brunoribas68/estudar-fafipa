#!/usr/bin/env node
/* ===================== GERADOR DE INFOGRÁFICOS (SVG) =====================
   Script de apoio pra criar os diagramas simples em /images, no mesmo estilo
   visual (cores Duolingo) usado no restante do app. Não é chamado pelo app —
   é só uma ferramenta pra gerar/regenerar os .svg rapidamente quando o
   conteúdo de alguma matéria/parte mudar.

   Dois layouts prontos:
     compareSVG(title, [ {label, lines:[...], color}, {label, lines:[...], color} ])
       → dois cartões lado a lado com um "×" no meio (bom pra pares que se
         confundem: vinculado×discricionário, decadência×prescrição...)
     gridSVG(title, [ {label, lines:[...], color}, ... ])   // 3 ou 4 cartões
       → cartões em grade (bom pra listar categorias: remédios constitucionais,
         espécies de tributo, poderes administrativos...)

   Uso: ajuste os dados no fundo do arquivo e rode `node tools/make-diagram.js`.
*/
const fs = require("fs");
const path = require("path");

const FONT = "Segoe UI, sans-serif";
const BG = "#eef9ff"; // combina com --accent clarinho do tema Duolingo

function wrapLines(lines, x, startY, lh, size, opacity){
  return `<text x="${x}" y="${startY}" text-anchor="middle" font-size="${size}" fill="#3c3c3c" opacity="${opacity}" font-family="${FONT}">` +
    lines.map((l,i)=>`<tspan x="${x}" dy="${i===0?0:lh}">${l}</tspan>`).join("") + `</text>`;
}

function card(x, y, w, h, color, label, lines){
  const cx = x + w/2;
  const titleY = y + h*0.42;
  const bodyY = titleY + 24;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>
<rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="${color}"/>
<text x="${cx}" y="${titleY}" text-anchor="middle" font-size="13" font-weight="700" fill="#241b3a" font-family="${FONT}"><tspan x="${cx}" dy="0">${label}</tspan></text>
${wrapLines(lines, cx, bodyY, 14, 11, 0.8)}`;
}

function compareSVG(title, [a,b], opts={}){
  const W=560,H=200;
  const gap=70, cardW=220, cardH=110, y=60;
  const xA=30, xB=W-30-cardW;
  const midColor = opts.midColor || b.color;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="${BG}"/>
<text x="${W/2}" y="28" text-anchor="middle" font-size="15" font-weight="700" fill="${opts.titleColor||'#1cb0f6'}" font-family="${FONT}">${title}</text>
${card(xA,y,cardW,cardH,a.color,a.label,a.lines)}
${card(xB,y,cardW,cardH,b.color,b.label,b.lines)}
<text x="${W/2}" y="${y+cardH/2+8}" text-anchor="middle" font-size="22" font-weight="800" fill="${midColor}" font-family="${FONT}">×</text>
</svg>`;
}

function gridSVG(title, cards, opts={}){
  const n = cards.length;
  const W=560,H = n>3 ? 230 : 200;
  const gap=16, cardH=110, y=60;
  const cardW = Math.floor((W-40-gap*(n-1))/n);
  let x=20;
  const cardSVGs = cards.map(c=>{
    const s = card(x,y,cardW,cardH,c.color,c.label,c.lines);
    x += cardW+gap;
    return s;
  }).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="${BG}"/>
<text x="${W/2}" y="28" text-anchor="middle" font-size="15" font-weight="700" fill="${opts.titleColor||'#1cb0f6'}" font-family="${FONT}">${title}</text>
${cardSVGs}
</svg>`;
}

module.exports = { compareSVG, gridSVG };
