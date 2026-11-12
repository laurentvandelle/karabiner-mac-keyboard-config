# Bonnes pratiques

Conventions à suivre pour modifier ce dépôt. Le pipeline et le registre sont dans `docs/architecture.md`.

## Touches

`KarabinerKeyCodes` porte le caractère visé par son nom, et le `key_code` Karabiner par sa valeur. Le clavier est un AZERTY : la touche `Z` a le `key_code` `w`.

```typescript
export enum KarabinerKeyCodes {
  Z = 'w',
  W = 'z',
  PARENTESE_OUVRANTE = '5',
  TIRET = 'equal_sign',
}
```

Dans `scripts/rules/`, chaque touche et chaque modificateur passe par ces enums. Une touche absente s'ajoute d'abord dans `KarabinerKeyCodes`, avec un nom français qui décrit le caractère, et la valeur Karabiner réelle. Même règle pour un modificateur dans `KarabinerModifierKeys`, et pour une application dans `Applications`.

Les valeurs de `Applications` sont des expressions régulières de bundle identifier, comme `^org\\.mozilla\\.firefox$`. Pour trouver un identifiant : `osascript -e 'id of app "Nom"'`.

## Forme d'une règle

`createRule` produit des manipulators `type: 'basic'`.

- `from` est la frappe reçue. Ses modificateurs sont un objet `{ mandatory?, optional? }`.
- `to` est la frappe émise. Ses modificateurs sont un tableau plat.
- `onlyAppliesForThisApplications` limite la règle à des bundle identifiers. Sans cet argument, `conditions` vaut `[]`.

Plusieurs raccourcis vers la même sortie se déclarent dans un seul `assignShortcuts`. Plusieurs sorties se composent en étalant les tableaux dans `createJsonFilePLaceholder` :

```typescript
return createJsonFilePLaceholder('Personal keys', 'Firefox redo to ctrl + Y', [...redoFirefox]);
```

Le nom exporté est `createJsonFilePLaceholder`, avec un `L` majuscule. `firefox-redo.ts` l'alias en `createJsonFilePlaceholder` à l'import. Ne renomme pas l'export : tous les appelants casseraient.

Un fichier généré contient une seule entrée `rules`, et autant de manipulators que nécessaire. Le type `Karabiner` encode cette forme.

## Profil installé

`karabiner.json` est l'export du profil Karabiner-Elements. Il contient les règles générées déjà importées, et d'autres règles qui n'ont aucune source TypeScript (Home, End, raccourcis PC, etc.).

Modifier une règle générée se fait dans `scripts/rules/`, puis `npm start`. `npm start` active la règle dans le profil sélectionné de `karabiner.json` (ajout en tête, ou remplacement sur place par `description`), et Karabiner-Elements recharge le fichier tout seul. Pas d'import manuel, pas d'édition à la main.

Les règles générées s'appellent `Personal-keys <NOM>` dans le profil. Renommer la `description` d'une règle remplace l'ancienne entrée : `npm start` retire les règles préfixées qui ne sont plus générées. Une règle écrite à la main ne doit pas porter ce préfixe. Une règle à ne pas activer va dans `rulesNotEnabledInProfile`.

`assets/complex_modifications/pc-shortcuts.json` et les fichiers préfixés par un timestamp ne sont pas générés. Ce sont des JSON historiques. `npm start` ne doit pas les écraser.

`automatic_backups/` contient les snapshots créés par Karabiner-Elements. Les lire peut aider à comprendre un ancien comportement. Ne pas les modifier, ne pas les supprimer.

## Tests

Les tests collent au code qu'ils couvrent : `scripts/core/rules.test.ts` à côté de `rules.ts`. Les fixtures vivent dans `scripts/tests/samples.ts`.

Le style en place est `Given` / `When` / `Then`. L'arrangement utilise les enums. L'attendu contient les `key_code` Karabiner, donc `Z` y apparaît comme `w`.

Écart connu : `firefoxRedoSample()` décrit un document `{ title, rules }`, alors que `createRule` renvoie `KarabinerManipulators[]`. Le test appelle `createRule` sans `onlyAppliesForThisApplications`, donc `conditions` est `[]`, pas le filtre Firefox. `npm test` échoue sur cette comparaison. Aligner le sample sur le retour réel si ce test est repris. Ne pas élargir `createRule` pour qu'il renvoie un document complet.

`jest.config.ts` collecte la couverture dans `src/**/*.ts`, dossier qui n'existe pas. La suite de tests reste `*.test.ts` sous `scripts/`.

## Style

Reprendre le fichier voisin : TypeScript, guillemets simples, points-virgules, indentation de deux espaces, type de retour explicite sur les fabriques exportées. Le commentaire de tête d'une règle est en français et dit ce que la frappe change pour la personne qui tape.

## Entretien

Une convention violée en revue rejoint l'`AGENTS.md` du dossier concerné. Si elle peut casser un lancement (`npm test`, génération, registre incomplet), elle devient un contrôle exécutable plutôt qu'un paragraphe de plus. Ces fichiers se relisent comme du code.
