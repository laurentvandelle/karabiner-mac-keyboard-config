import { KarabinerRule } from './model';

/**
 * Active des règles dans le profil sélectionné de karabiner.json.
 * Une règle de même description est remplacée sur place, une nouvelle règle est ajoutée en tête.
 * Avec un préfixe, retire aussi du profil :
 * - les règles préfixées qui ne sont plus générées (renommées ou supprimées) ;
 * - l'ancienne version sans préfixe d'une règle générée.
 * Ne touche pas aux autres règles ni aux autres profils. Renvoie une copie.
 */
export function enableRulesInProfile(
  karabinerConfig: any,
  rules: KarabinerRule[],
  { prefix = '', generatedDescriptions = rules.map((rule) => rule.description) }: { prefix?: string; generatedDescriptions?: string[] } = {},
): any {
  const config = JSON.parse(JSON.stringify(karabinerConfig));
  const profile = config.profiles.find((p: any) => p.selected) ?? config.profiles[0];
  profile.complex_modifications ??= {};
  const installed: KarabinerRule[] = (profile.complex_modifications.rules ?? []).filter(
    (r: KarabinerRule) => !prefix || !isObsolete(r.description, prefix, generatedDescriptions),
  );

  const added: KarabinerRule[] = [];
  for (const rule of rules) {
    const index = installed.findIndex((r) => r.description === rule.description);
    if (index === -1) added.push(rule);
    else if (!isSameRule(installed[index], rule)) installed[index] = rule;
  }
  profile.complex_modifications.rules = [...added, ...installed];
  return config;
}

function isObsolete(description: string, prefix: string, generatedDescriptions: string[]): boolean {
  if (description.startsWith(prefix)) return !generatedDescriptions.includes(description);
  return generatedDescriptions.includes(`${prefix}${description}`);
}

// Karabiner-Elements trie les clés à l'enregistrement : on compare sans tenir compte de l'ordre
function isSameRule(a: KarabinerRule, b: KarabinerRule): boolean {
  return sortedJson(a) === sortedJson(b);
}

function sortedJson(value: any): string {
  return JSON.stringify(value, (_key, v) =>
    v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([x], [y]) => x.localeCompare(y))) : v,
  );
}
