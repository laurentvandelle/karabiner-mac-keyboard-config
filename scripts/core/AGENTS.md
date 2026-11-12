# scripts/core

Primitives partagées. Lire `docs/architecture.md` avant de changer un type ou le registre, et `docs/bonnes-pratiques.md` avant de changer une touche, un modificateur ou la forme d'un manipulator.

- `model.ts` : enums, types, et le couple `jsonFileNames` / `jsonFiles`. C'est le seul fichier de `core/` autorisé à importer `scripts/rules/`.
- `rules.ts` : `createRule`, `createJsonFilePLaceholder` et `mergeJsonFiles` (qui préfixe chaque description par `personalKeysPrefix`). Une condition d'application passe par `onlyAppliesForThisApplications` ou `onlyAppliesForTheseDevices`, pas par un objet `conditions` construit dans une règle.
- `profile.ts` : `enableRulesInProfile`, fonction pure qui ajoute ou remplace des règles (par `description`) dans le profil sélectionné. Une règle identique, à l'ordre des clés près, n'est pas touchée. Avec un préfixe, elle retire les règles préfixées qui ne sont plus générées et les anciennes versions sans préfixe.
- `file.ts` : unique écriture disque de la couche. `writeFile` en callback, log du chemin, `console.error` en cas d'erreur.
- `rules.test.ts` : échec connu, décrit dans `docs/bonnes-pratiques.md`, section Tests. Ne pas changer le contrat de `createRule` pour le faire passer.

`from.modifiers` est `{ mandatory?, optional? }`. `to.modifiers` est un tableau de `KarabinerModifierKeys`.
