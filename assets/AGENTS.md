# assets

`npm start` n'écrit que `complex_modifications/personal-keys.json`, qui regroupe toutes les règles de `jsonFileNames` sous un seul titre « Personal keys ».

Ce fichier se régénère. On ne les édite pas à la main. Un changement de raccourci se fait dans `scripts/rules/`, puis `npm start`.

`pc-shortcuts.json` et les fichiers dont le nom est un timestamp ne sont pas générés. Ne pas les écraser, ne pas les supprimer, ne pas les brancher sur `main.ts` sans demande explicite. Le détail est dans `docs/bonnes-pratiques.md`, section Profil installé.
