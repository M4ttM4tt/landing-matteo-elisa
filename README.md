# Landing — Matteo & Elisa

Landing page dello studio di sviluppo software **Matteo & Elisa**.
Sito **statico, self-contained** (nessun backend), distribuito automaticamente
su GitHub Pages a ogni push su `main`.

> Pagina con 3 temi (neon / coral / light), 3 layout dell'hero, sfondo animato
> su canvas, animazioni di reveal allo scroll e font self-hosted.

---

## Stack

| Aspetto      | Scelta                                                                     |
| ------------ | -------------------------------------------------------------------------- |
| Tipo         | Sito statico, **zero-build** (nessun bundler trasforma la pagina)          |
| Runtime      | `dc-runtime.js` + React/ReactDOM 18.3.1 (UMD), tutti **self-hosted**       |
| Stili / font | Inline + `@font-face` self-hosted (JetBrains Mono, Manrope, Space Grotesk) |
| Qualità      | Prettier + HTMLHint                                                        |
| CI/CD        | GitHub Actions → GitHub Pages                                              |
| Sicurezza    | CSP, security headers, CodeQL, Dependabot                                  |

Perché zero-build: la pagina è un **prerender** già completo, idratato da un
runtime proprietario opaco. Ribundlarla aggiungerebbe rischio di rottura senza
benefici. La sorgente in `src/` **è** l'artefatto distribuibile.

---

## Avvio rapido

Prerequisiti: **Node.js 20+** (vedi [`.nvmrc`](./.nvmrc)).

```bash
npm install        # installa i tool di sviluppo (prettier, htmlhint, serve)
npm run dev        # serve src/ su http://localhost:5173
```

### Script disponibili

| Comando                | Cosa fa                                          |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Server locale di `src/` su `:5173`               |
| `npm run build`        | Copia `src/` → `dist/` (output per host/preview) |
| `npm run preview`      | Server locale di `dist/` su `:4173`              |
| `npm run format`       | Applica Prettier a config/docs/script            |
| `npm run format:check` | Verifica formattazione (usato in CI)             |
| `npm run lint:html`    | HTMLHint su `src/**/*.html`                      |
| `npm run check`        | `format:check` + `lint:html` (gate di qualità)   |

> Nota: `src/` è escluso da Prettier (vedi [`.prettierignore`](./.prettierignore)):
> è una sorgente verbatim, non va riformattata o ne altereresti il rendering.

---

## Struttura

```
.
├── src/                     # Sorgente = artefatto distribuibile
│   ├── index.html           # Prerender della pagina + CSP <meta>
│   ├── dc-runtime.js        # Runtime vendored (idratazione)
│   ├── vendor/              # React + ReactDOM 18.3.1 (UMD, self-hosted)
│   ├── fonts/               # Font woff2 self-hosted
│   ├── _headers             # Header di sicurezza (Netlify/Cloudflare)
│   └── robots.txt
├── scripts/build.mjs        # Copia src/ → dist/
├── .github/
│   ├── workflows/           # ci.yml, deploy.yml, codeql.yml
│   ├── dependabot.yml
│   └── pull_request_template.md
├── reference/               # Bundle standalone originale (provenienza)
├── README.md · CONTRIBUTING.md · CLAUDE.md · SECURITY.md · LICENSE
```

---

## Modifica dei contenuti

I testi (servizi, processo, progetti) vivono nel metodo `renderVals()` dentro
lo script `text/x-dc` di [`src/index.html`](./src/index.html). Il markup
visibile è il **prerender** nello stesso file. Per modifiche non banali al
layout, vedi [`CLAUDE.md`](./CLAUDE.md).

---

## Deploy

Automatico: ogni push su `main` esegue il workflow
[`deploy.yml`](./.github/workflows/deploy.yml) che pubblica su **GitHub Pages**.

**Attivazione una tantum** (dopo il primo push):
`Settings` → `Pages` → **Source: GitHub Actions**.

Host alternativi (Netlify, Cloudflare Pages): impostare la cartella di
pubblicazione su `src/` (o `dist/` dopo `npm run build`). Lì il file
`src/_headers` aggiunge automaticamente gli header di sicurezza.

---

## Contribuire

Vedi [`CONTRIBUTING.md`](./CONTRIBUTING.md) per il flusso branch → PR → merge.
Per lo sviluppo assistito da AI (Claude Code & simili) vedi [`CLAUDE.md`](./CLAUDE.md).

## Licenza

Proprietaria — vedi [`LICENSE`](./LICENSE).
