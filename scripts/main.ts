import { readFileSync } from 'fs';
import path from 'path';
import { createFile } from './core/file';
import {
  jsonFileNames,
  jsonFiles,
  personalKeysFileName,
  personalKeysPrefix,
  personalKeysTitle,
  rulesNotEnabledInProfile,
} from './core/model';
import { enableRulesInProfile } from './core/profile';
import { mergeJsonFiles } from './core/rules';

function main() {
  const names = Object.values(jsonFileNames);
  const merge = (selected: jsonFileNames[]) => mergeJsonFiles(personalKeysTitle, selected.map((name) => jsonFiles[name]), personalKeysPrefix);

  const personalKeys = merge(names);
  const assetPath = path.join(__dirname, '..', 'assets', 'complex_modifications', `${personalKeysFileName}.json`);
  createFile(assetPath, JSON.stringify(personalKeys, null, 2));

  const toEnable = merge(names.filter((name) => !rulesNotEnabledInProfile.includes(name))).rules;
  const profilePath = path.join(__dirname, '..', 'karabiner.json');
  const current = JSON.parse(readFileSync(profilePath, 'utf8'));
  const next = enableRulesInProfile(current, toEnable, {
    prefix: personalKeysPrefix,
    generatedDescriptions: personalKeys.rules.map((rule) => rule.description),
  });
  if (JSON.stringify(next) !== JSON.stringify(current)) {
    createFile(profilePath, JSON.stringify(next, null, 4));
  }
}

main();
