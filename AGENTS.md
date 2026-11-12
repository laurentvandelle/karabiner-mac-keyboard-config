# Agent

Tu modifies la configuration Karabiner de ce dépôt. Le TypeScript sous `scripts/` est la source de vérité des règles générées. `npm start` regroupe toutes les règles dans `assets/complex_modifications/personal-keys.json` (une seule section « Personal keys » dans Karabiner-Elements), puis les active dans le profil sélectionné de `karabiner.json`. Chaque règle y apparaît sous le nom `Personal-keys <description>`.

L'`AGENTS.md` le plus proche du fichier modifié prévaut sur celui-ci. Si un document contredit le code, signale l'écart et suis le code. Le fond est dans `docs/architecture.md` et `docs/bonnes-pratiques.md`.

## Commandes

- `npm test` — Jest
- `npm start` — régénère `personal-keys.json` à partir de `jsonFileNames` et active les règles dans `karabiner.json`
- `npm run verify` — `npm test`

Après un changement dans `scripts/rules/` ou dans le registre : lance `npm start`, puis relis le diff de `personal-keys.json` et de `karabiner.json`. N'édite pas `karabiner.json` à la main pour activer une règle générée.

## Routing

- Avant de modifier `scripts/main.ts` : lire `scripts/AGENTS.md`.
- Avant de modifier `scripts/core/**` : lire `scripts/core/AGENTS.md`.
- Avant de modifier `scripts/rules/**` : lire `scripts/rules/AGENTS.md`.
- Avant de modifier `scripts/tests/**` : lire `scripts/tests/AGENTS.md`.
- Avant de modifier `assets/**` : lire `assets/AGENTS.md`.
- Avant de modifier `automatic_backups/**` : lire `automatic_backups/AGENTS.md`.
- Avant de modifier `karabiner.json` : lire `docs/bonnes-pratiques.md`, section Profil installé.
- Avant d'ajouter une règle, une touche ou une application : lire `docs/architecture.md`, section Registre, puis `docs/bonnes-pratiques.md`, section Touches.

## Interdits

1. Pas de `key_code` ni de modificateur écrit en chaîne dans `scripts/rules/`. Utiliser `KarabinerKeyCodes` et `KarabinerModifierKeys`.
2. Pas d'écriture disque en dehors de `scripts/main.ts` et `scripts/core/file.ts`.
3. Pas d'édition manuelle d'un JSON produit par `npm start`.
4. Pas d'import de `scripts/rules/*` en dehors de `scripts/core/model.ts`.
5. Pas d'import entre fichiers de `scripts/rules/`.
6. Ne pas renommer `createJsonFilePLaceholder`. Le `L` majuscule fait partie du nom exporté.

## Nommage des règles

- Dans Karabiner-Elements, chaque règle générée s'appelle `Personal-keys <NOM>`, par exemple `Personal-keys Claude redo to ctrl + Y`.
- Le préfixe `Personal-keys ` est ajouté par `mergeJsonFiles` à partir de `personalKeysPrefix` (`scripts/core/model.ts`). Dans `scripts/rules/`, la `description` passée à `createJsonFilePLaceholder` ne contient que `<NOM>`, sans le préfixe.
- `npm start` retire du profil les règles préfixées qui ne sont plus générées et l'ancienne version sans préfixe d'une règle générée. Renommer une règle ne laisse donc pas de doublon.
- Ne pas utiliser le préfixe `Personal-keys ` pour une règle écrite à la main dans `karabiner.json` : `npm start` la supprimerait.

## Definition of done

Exécute `npm run verify`. N'ajoute aucun échec.

`scripts/core/rules.test.ts` échoue déjà : le sample décrit un document Karabiner complet, `createRule` renvoie une liste de manipulators. Ne modifie pas `createRule` pour faire passer ce test. Détail dans `docs/bonnes-pratiques.md`, section Tests.
