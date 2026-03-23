# Combinações Tipográficas Inesquecíveis

Este documento contém combinações de fontes recomendadas para a skill `frontend-design`.

## Regras de Ouro

1. **NUNCA** use Inter, Arial, Roboto ou fontes genéricas como escolha principal.
2. **SEMPRE** combine uma fonte de display marcante com uma fonte de corpo refinada.
3. **SEMPRE** importe as fontes do Google Fonts ou de outra fonte confiável no início do CSS/HTML.

## Combinações Recomendadas

### 1. Clássico e Elegante (Editorial)
- **Display (Títulos)**: Playfair Display (Serifa)
- **Corpo (Texto)**: DM Sans (Sans-Serifa)
- **Uso**: Blogs, portfólios, sites de luxo, revistas digitais.
- **Importação**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  ```

### 2. Moderno e Impactante (Neo-Brutalism)
- **Display (Títulos)**: Syne (Sans-Serifa Geométrica)
- **Corpo (Texto)**: Lora (Serifa) ou Space Grotesk (Sans-Serifa)
- **Uso**: Agências criativas, startups inovadoras, eventos.
- **Importação**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap" rel="stylesheet">
  ```

### 3. Técnico e Futurista (Retro-Futurista)
- **Display (Títulos)**: Space Mono (Monoespaçada)
- **Corpo (Texto)**: Work Sans (Sans-Serifa)
- **Uso**: Ferramentas de desenvolvedor, sites de tecnologia, portfólios de engenharia.
- **Importação**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  ```

### 4. Sofisticado e Minimalista (Luxury Refinado)
- **Display (Títulos)**: Cormorant Garamond (Serifa)
- **Corpo (Texto)**: Montserrat (Sans-Serifa)
- **Uso**: Marcas de alto padrão, arquitetura, moda.
- **Importação**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
  ```

### 5. Ousado e Artístico
- **Display (Títulos)**: Bebas Neue (Sans-Serifa Condensada)
- **Corpo (Texto)**: Roboto Slab (Serifa) - *Exceção à regra do Roboto, pois é a versão Slab*
- **Uso**: Pôsteres digitais, campanhas de marketing, sites de música.
- **Importação**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Slab:wght@300;400;700&display=swap" rel="stylesheet">
  ```

## Dicas de Implementação

- **Tamanho da Fonte**: Use unidades relativas (`rem`, `em`) em vez de `px` para melhor acessibilidade.
- **Altura da Linha (Line Height)**: Para títulos, use `1.1` a `1.2`. Para corpo de texto, use `1.5` a `1.7`.
- **Espaçamento de Letras (Letter Spacing)**: Títulos em maiúsculas podem se beneficiar de um leve aumento (`0.05em`), enquanto fontes de display grandes podem precisar de uma leve redução (`-0.02em`).
