# scripts/rules

Une fabrique par fichier, un fichier par JSON généré. Modèle à suivre : `firefox-redo.ts`. Avant d'écrire une règle, lis `docs/bonnes-pratiques.md` (sections Touches et Forme d'une règle) et `docs/architecture.md` (section Registre).

- Exporter `create<Nom>JsonFile(): Karabiner`.
- La `description` est le nom seul (`Claude redo to ctrl + Y`). Le préfixe `Personal-keys ` est ajouté à la génération : ne pas l'écrire ici.
- Composer avec `createRule` et `createJsonFilePLaceholder`.
- Touches, modificateurs et applications : enums de `scripts/core/model.ts`. Ajouter une valeur manquante dans l'enum, pas une chaîne dans la règle.
- `from` = frappe reçue, modificateurs en objet. `to` = frappe émise, modificateurs en tableau.
- Limiter à une application avec `onlyAppliesForThisApplications`.
- Limiter à un clavier avec `onlyAppliesForTheseDevices`.
- Étaler les manipulators : `[...regleA, ...regleB]`.
- Commentaire de tête en français, qui décrit l'effet pour la personne qui tape.
- Pas d'import d'un autre fichier de ce dossier. Pas de `fs`.
- Enregistrer la fabrique dans `scripts/core/model.ts`, puis lancer `npm start`.

`pc-option-keys.ts` n'est pas une règle : c'est un commentaire. Ne pas l'enregistrer en l'état.
