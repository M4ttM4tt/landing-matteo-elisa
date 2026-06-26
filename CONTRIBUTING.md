# Contribuire

Grazie per contribuire alla landing. Questo documento descrive il **flusso di
lavoro Git** e gli standard del progetto. Vale per chiunque, persone e agenti AI.

## Principi

- `main` è **sempre deployabile**: ogni push su `main` va in produzione.
- Non si committa **mai** direttamente su `main`. Si lavora su branch + Pull Request.
- Ogni PR deve passare la CI (Prettier + HTMLHint) prima del merge.

## Setup

```bash
git clone <url-del-repo>
cd landing-matteo-elisa
nvm use            # Node 20 (vedi .nvmrc)
npm install
npm run dev        # http://localhost:5173
```

## Flusso di lavoro (branch → PR → merge)

1. **Allinea `main`**

   ```bash
   git switch main
   git pull --ff-only origin main
   ```

2. **Crea una branch** con nome descrittivo e prefisso per tipo:

   ```bash
   git switch -c feat/sezione-contatti
   ```

   Prefissi: `feat/`, `fix/`, `docs/`, `chore/`, `refactor/`, `ci/`.

3. **Lavora e committa** in piccoli commit atomici. Messaggi in stile
   [Conventional Commits](https://www.conventionalcommits.org/):

   ```
   feat: aggiunge sezione contatti all'hero
   fix: corregge contrasto del tema light sui bottoni
   docs: aggiorna istruzioni di deploy
   ```

4. **Verifica in locale** prima di aprire la PR:

   ```bash
   npm run check      # Prettier + HTMLHint
   npm run dev        # controllo visivo: temi, animazioni, font
   ```

5. **Push e apri la PR** verso `main`:

   ```bash
   git push -u origin feat/sezione-contatti
   gh pr create --base main --fill   # oppure dalla UI di GitHub
   ```

   Compila il template della PR (checklist inclusa). Per modifiche visive
   allega screenshot prima/dopo.

6. **Review & merge**: dopo l'approvazione e la CI verde, merge con
   **Squash and merge** (storia lineare). Elimina la branch dopo il merge.

7. Il merge su `main` fa partire il deploy automatico su GitHub Pages.

## Regola d'oro su `src/`

Il contenuto di `src/` è una **sorgente verbatim** (prerender + runtime
vendored). È escluso da Prettier di proposito. Modifica solo ciò che serve
(testi in `renderVals()`, markup del prerender) e **non riformattare** il file:
una riformattazione automatica può alterare il rendering. Vedi
[`CLAUDE.md`](./CLAUDE.md).

## Convenzioni

- **Commit / PR**: Conventional Commits.
- **Branch**: `tipo/descrizione-breve-in-kebab-case`.
- **Indentazione / encoding**: gestiti da [`.editorconfig`](./.editorconfig).
- **Niente segreti** nel repo: nessuna API key, token o credenziale.
