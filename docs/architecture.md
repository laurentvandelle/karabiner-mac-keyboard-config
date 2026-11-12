# Architecture

Générateur TypeScript de complex modifications Karabiner-Elements, pour un clavier Mac AZERTY utilisé avec des réflexes de clavier PC.

```text
scripts/main.ts
  lit jsonFileNames + jsonFiles          scripts/core/model.ts
  écrit le JSON                          scripts/core/file.ts
       |
       v
assets/complex_modifications/<nom>.json  <-- importé ensuite dans Karabiner-Elements

scripts/rules/<nom>.ts                   une fabrique = un fichier JSON
scripts/core/rules.ts                    createRule + createJsonFilePLaceholder
```

`karabiner.json` et `automatic_backups/` vivent à côté de ce pipeline. Ils ne sont pas produits par `npm start`. Les conventions de modification sont dans `docs/bonnes-pratiques.md`.

## Registre

Une règle n'existe pour le générateur que si les deux entrées suivantes sont présentes dans `scripts/core/model.ts` :

- `jsonFileNames` : le nom de fichier, sans `.json`
- `jsonFiles` : la fabrique qui renvoie un `Karabiner`

`scripts/main.ts` itère `Object.values(jsonFileNames)` et écrit `assets/complex_modifications/<nom>.json`.

Aujourd'hui, seuls ces noms sont générés : `pc-replace-keys`, `brackets`, `firefox-redo`, `keychron-b1-pro`, `claude-terminal`, `claude-changes`, `claude-new-session`, `claude-interrupt`, `notion-tab`, `claude-redo`.

`scripts/rules/pc-option-keys.ts` est un brouillon. Ne l'enregistre pas tant qu'il ne renvoie pas un `Karabiner`.

Ajouter une règle :

1. Créer `scripts/rules/<nom>.ts` avec une fonction `create<Nom>JsonFile(): Karabiner`.
2. Ajouter le nom dans `jsonFileNames` et la fabrique dans `jsonFiles`.
3. Lancer `npm start`.
4. Commiter le TypeScript et le JSON généré ensemble.

Le `title` existant des règles générées est `Personal keys`. Reprendre cette valeur pour rester dans la même famille.

## Couches

| Dossier | Rôle | Dépend de |
| --- | --- | --- |
| `scripts/rules/` | Déclarer les raccourcis | `scripts/core/model.ts`, `scripts/core/rules.ts` |
| `scripts/core/rules.ts` | Construire les manipulators | `scripts/core/model.ts` |
| `scripts/core/model.ts` | Types, enums, registre | les fabriques de `scripts/rules/` |
| `scripts/core/file.ts` | Écrire un fichier | `fs` |
| `scripts/main.ts` | Boucle de génération | `file.ts`, `model.ts` |
| `scripts/tests/` | Fixtures attendues | rien du pipeline |

`model.ts` importe les fabriques : c'est le seul point de couplage autorisé vers `scripts/rules/`. Les fichiers de règles ne s'importent pas entre eux. Aucun module de règle n'écrit sur le disque.
