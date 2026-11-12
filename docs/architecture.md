# Architecture

Générateur TypeScript de complex modifications Karabiner-Elements, pour un clavier Mac AZERTY utilisé avec des réflexes de clavier PC.

```text
scripts/main.ts
  lit jsonFileNames + jsonFiles          scripts/core/model.ts
  fusionne les règles                    scripts/core/rules.ts (mergeJsonFiles)
  écrit le JSON                          scripts/core/file.ts
       |
       +--> assets/complex_modifications/personal-keys.json   une seule section « Personal keys »
       +--> karabiner.json                                    règles activées (scripts/core/profile.ts)

scripts/rules/<nom>.ts                   une fabrique = une règle
scripts/core/rules.ts                    createRule + createJsonFilePLaceholder + mergeJsonFiles
```

`npm start` met à jour `karabiner.json` : il ajoute ou remplace, par `description`, les règles générées dans le profil sélectionné. Le reste du profil n'est pas touché. `automatic_backups/` n'est pas produit par `npm start`. Les conventions de modification sont dans `docs/bonnes-pratiques.md`.

## Registre

Une règle n'existe pour le générateur que si les deux entrées suivantes sont présentes dans `scripts/core/model.ts` :

- `jsonFileNames` : le nom de fichier, sans `.json`
- `jsonFiles` : la fabrique qui renvoie un `Karabiner`

`scripts/main.ts` itère `Object.values(jsonFileNames)`, fusionne les règles dans `assets/complex_modifications/personal-keys.json`, et les active dans `karabiner.json`. Une règle listée dans `rulesNotEnabledInProfile` est générée mais pas activée.

Aujourd'hui, ces règles sont enregistrées : `pc-replace-keys`, `brackets`, `firefox-redo`, `keychron-b1-pro`, `claude-terminal`, `claude-changes`, `claude-new-session`, `claude-interrupt`, `notion-tab`, `claude-redo`.

`scripts/rules/pc-option-keys.ts` est un brouillon. Ne l'enregistre pas tant qu'il ne renvoie pas un `Karabiner`.

Ajouter une règle :

1. Créer `scripts/rules/<nom>.ts` avec une fonction `create<Nom>JsonFile(): Karabiner`.
2. Ajouter le nom dans `jsonFileNames` et la fabrique dans `jsonFiles`.
3. Lancer `npm start`. La règle est active dans Karabiner-Elements sans import manuel.
4. Commiter le TypeScript, `personal-keys.json` et `karabiner.json` ensemble.

Le `title` existant des règles générées est `Personal keys`. Reprendre cette valeur pour rester dans la même famille. À la génération, chaque `description` reçoit le préfixe `Personal-keys ` (`personalKeysPrefix`) : la règle apparaît comme `Personal-keys <NOM>` dans Karabiner-Elements.

## Couches

| Dossier | Rôle | Dépend de |
| --- | --- | --- |
| `scripts/rules/` | Déclarer les raccourcis | `scripts/core/model.ts`, `scripts/core/rules.ts` |
| `scripts/core/rules.ts` | Construire les manipulators | `scripts/core/model.ts` |
| `scripts/core/model.ts` | Types, enums, registre | les fabriques de `scripts/rules/` |
| `scripts/core/profile.ts` | Activer des règles dans le profil | `scripts/core/model.ts` |
| `scripts/core/file.ts` | Écrire un fichier | `fs` |
| `scripts/main.ts` | Boucle de génération | `file.ts`, `model.ts` |
| `scripts/tests/` | Fixtures attendues | rien du pipeline |

`model.ts` importe les fabriques : c'est le seul point de couplage autorisé vers `scripts/rules/`. Les fichiers de règles ne s'importent pas entre eux. Aucun module de règle n'écrit sur le disque.
