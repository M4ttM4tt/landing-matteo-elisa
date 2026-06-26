# Security Policy

## Segnalare una vulnerabilità

Per segnalazioni di sicurezza **non** aprire una issue pubblica.
Usa la funzione **GitHub Security Advisories** del repository
(`Security` → `Report a vulnerability`) oppure scrivi al maintainer.

Riceverai un riscontro entro 5 giorni lavorativi.

## Modello di sicurezza del sito

Questa è una landing page **statica**: nessun backend, nessun database,
nessun input utente trattato lato server. La superficie di attacco è minima.

### Controlli attivi

- **Content-Security-Policy**: definita via `<meta http-equiv>` in
  `src/index.html` (attiva ovunque, incluso GitHub Pages) e via header HTTP
  in `src/_headers` (sugli host che lo supportano, es. Netlify / Cloudflare
  Pages).
- **Header di sicurezza** (`src/_headers`): `X-Content-Type-Options`,
  `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`,
  `Strict-Transport-Security`.
- **Nessuna risorsa esterna a runtime**: font, script e stili sono tutti
  serviti dalla stessa origine (`'self'`). Nessuna chiamata di rete verso
  terze parti.
- **Supply chain**: `npm ci` con lockfile, aggiornamenti automatici via
  **Dependabot**, analisi statica con **CodeQL** su ogni push/PR verso `main`.

### Limite noto della CSP

La CSP include `'unsafe-inline'` e `'unsafe-eval'` per `script-src`. È un
**requisito dell'architettura attuale**: la pagina è un prerender guidato da
un runtime (`src/dc-runtime.js`) che valuta a runtime lo script inline di tipo
`text/x-dc`. Per ottenere una CSP stretta (senza `unsafe-*`) sarebbe
necessario riscrivere il componente come build React/Vite tradizionale.
Vedi [`CLAUDE.md`](./CLAUDE.md) per il contesto.
