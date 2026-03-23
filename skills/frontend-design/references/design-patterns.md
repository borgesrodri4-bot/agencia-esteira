# Padrões de Design Frontend

Este documento contém exemplos e diretrizes para aplicar os padrões de design exigidos pela skill `frontend-design`.

## Estéticas Recomendadas

### 1. Editorial Refinado
- **Foco**: Tipografia elegante, amplo espaço em branco, linhas finas.
- **Cores**: Monocromático com um acento sutil (ex: creme, preto, dourado).
- **Tipografia**: Serifas de alto contraste para títulos (ex: Playfair Display, Lora) e sans-serif limpas para corpo (ex: DM Sans).
- **Elementos**: Imagens grandes com bordas finas, assimetria controlada.

### 2. Minimalismo Brutal (Neo-Brutalism)
- **Foco**: Bordas grossas, cores vibrantes, sombras duras, tipografia pesada.
- **Cores**: Amarelo, rosa choque, azul elétrico contrastando com preto e branco.
- **Tipografia**: Sans-serif pesadas e geométricas (ex: Syne, Space Grotesk).
- **Elementos**: Caixas com bordas pretas de 2px-4px, sombras sólidas sem desfoque (ex: `box-shadow: 4px 4px 0px #000`).

### 3. Retro-Futurista
- **Foco**: Elementos de interface antigos misturados com gradientes modernos e efeitos de vidro.
- **Cores**: Neon, roxo profundo, ciano, magenta.
- **Tipografia**: Fontes monoespaçadas ou pixeladas para detalhes, sans-serif técnicas para títulos.
- **Elementos**: Efeitos de CRT, scanlines sutis, botões com aparência tátil.

### 4. Luxury Refinado
- **Foco**: Escuridão, reflexos, gradientes metálicos, minimalismo extremo.
- **Cores**: Preto profundo, cinza carvão, acentos em prata ou ouro.
- **Tipografia**: Serifas modernas ou sans-serif ultra-finas.
- **Elementos**: Efeitos de vidro fosco (glassmorphism), animações lentas e fluidas.

## Elementos Visuais Inesquecíveis

Sempre inclua pelo menos um destes elementos para tornar a interface memorável:

1. **Cursor Customizado**: Um cursor que reage aos elementos da página (ex: expande ao passar sobre links, inverte cores).
2. **Scroll Animations**: Elementos que se revelam ou se movem com base na posição do scroll (parallax sutil, fade-ins escalonados).
3. **Micro-interações**: Botões que têm um estado de "pressionado" satisfatório, ícones que se animam ao hover.
4. **Backgrounds Dinâmicos**: Mesh gradients animados lentamente, texturas de ruído (noise) sutis sobrepostas.

## Padrões CSS/Tailwind Obrigatórios

- **Variáveis CSS**: Sempre defina o tema usando variáveis CSS no `:root` para facilitar a manutenção e temas escuros.
- **Responsividade**: Use a abordagem mobile-first.
- **Acessibilidade**: Contraste adequado, outline em foco (pode ser estilizado, mas nunca removido sem substituto).

Exemplo de estrutura de variáveis CSS:
```css
:root {
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #6c757d;
  --accent-color: #ff4500;
  --border-radius: 8px;
  --transition-speed: 0.3s;
}
```
