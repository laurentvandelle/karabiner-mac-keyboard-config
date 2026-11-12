# scripts

Point d'entrée du générateur. Le détail des couches est dans `docs/architecture.md`. Les conventions d'écriture sont dans `docs/bonnes-pratiques.md`.

`main.ts` est le seul orchestrateur. Il parcourt `jsonFileNames`, fusionne les `jsonFiles[name]` avec `mergeJsonFiles`, et écrit `assets/complex_modifications/personal-keys.json` via `createFile`. Il active ensuite ces règles dans le profil sélectionné de `karabiner.json` avec `enableRulesInProfile` (sauf `rulesNotEnabledInProfile`), et ne réécrit le fichier que s'il change.

- Ajouter un fichier ici ne le fait pas générer. L'enregistrement se fait dans `scripts/core/model.ts`.
- Ne pas écrire d'autres chemins que `personal-keys.json` et `karabiner.json`.
- Ne pas rendre `main` synchrone ni changer `createFile` : l'écriture actuelle est le callback de `fs.writeFile`.
