import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + I ou ctrl + shift + I ouvre un dossier (envoie cmd + shift + F).
 * ctrl + shift + I n'atteint plus Claude desktop.
 */
export function createClaudeOpenFolderJsonFile(): Karabiner {
  const openFolder = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.I,
      },
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL, KarabinerModifierKeys.LEFT_SHIFT],
        },
        key_code: KarabinerKeyCodes.I,
      },
    ],
    assignKeys: [
      {
        modifiers: [KarabinerModifierKeys.LEFT_COMMAND, KarabinerModifierKeys.LEFT_SHIFT],
        key_code: KarabinerKeyCodes.F,
      },
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder('Personal keys', 'Claude desktop open folder to ctrl + I or ctrl + shift + I', [
    ...openFolder,
  ]);
}
