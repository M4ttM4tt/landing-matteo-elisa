# CLAUDE.md — Guida per lo sviluppo assistito da AI

Contesto per Claude Code (e agenti simili) che lavorano su questo repository.
Leggi questo file prima di modificare il codice.

## Cos'è questo progetto

Landing page **statica** dello studio "Matteo & Elisa". Nessun backend.
La sorgente in `src/` **è** ciò che viene distribuito (zero-build).

## Architettura (importante)

La pagina **non** è una normale app React/Vite. È l'export di un design tool:

- `src/index.html` contiene **due cose**:
  1. Il **markup prerenderizzato** della pagina (l'HTML visibile, completo).
  2. Uno **script inline `type="text/x-dc"`** con la _logica_: una
     `class Component extends DCLogic` con `renderVals()` (i dati: servizi,
     processo, progetti), gestione temi, e il background animato su canvas.
- `src/dc-runtime.js` è un **runtime vendored** (framework "dc"). Trova lo
  script `text/x-dc`, lo valuta e **idrata** il markup. È minificato, di terze
  parti: **non modificarlo**.
- `src/vendor/react*.js` sono **React e ReactDOM 18.3.1** (build UMD) serviti
  in locale. Il runtime, se trova `window.React`/`window.ReactDOM` già definiti,
  **non** li scarica da CDN: per questo sono caricati con `<script>` locali
  _prima_ di `dc-runtime.js` in `index.html`. Questo rende il sito
  completamente self-contained (nessuna chiamata di rete) e conforme alla CSP
  `'self'`. **Non rimuoverli** o il runtime tornerebbe a caricare React da unpkg.

Conseguenza pratica: i browser ignorano lo script `text/x-dc` (tipo
sconosciuto); è il runtime a eseguirlo. Questo è voluto.

## Regole di modifica

- ✅ **Testi e contenuti**: modificali in `renderVals()` dentro lo script
  `text/x-dc` (array `services`, `steps`, `projects`, ecc.).
- ✅ **Markup visibile**: è il prerender in `src/index.html`. Se cambi i dati,
  aggiorna in modo coerente il markup corrispondente (il prerender è statico:
  non si rigenera da solo).
- ❌ **Non riformattare `src/`**. È escluso da Prettier apposta
  (`.prettierignore`). Una riformattazione può rompere il rendering.
- ❌ **Non toccare** `src/dc-runtime.js`, `src/vendor/*` né `src/fonts/*`.
- ❌ **Non reintrodurre risorse esterne** (CDN, Google Fonts, analytics):
  romperebbero la CSP `'self'` e la garanzia "nessuna rete di terze parti".

## Riscrittura idiomatica (solo se richiesto esplicitamente)

Per ottenere una CSP stretta (senza `unsafe-inline`/`unsafe-eval`) o un codice
React idiomatico, l'unica strada è **riscrivere** il componente come progetto
Vite + React, eliminando `dc-runtime.js`. È un refactor con rischio di
fedeltà visiva: va fatto solo su richiesta esplicita e verificato a vista
contro `reference/` (il bundle originale). Non farlo "di iniziativa".

## Workflow

Segui [`CONTRIBUTING.md`](./CONTRIBUTING.md): branch dedicata, commit
Conventional, `npm run check` prima della PR, mai commit diretti su `main`.

## Verifica prima di proporre una modifica

```bash
npm run check      # Prettier (config/docs) + HTMLHint (src)
npm run dev        # controllo visivo: i 3 temi, lo scroll, le animazioni, i font
```

Una modifica si considera valida solo se la pagina **renderizza identica**
(temi, sfondo canvas, reveal allo scroll, font) salvo il cambiamento previsto.

## Provenienza

`reference/` contiene il bundle standalone originale da cui è stata estratta
`src/`. Utile come riferimento di fedeltà; non viene distribuito.
