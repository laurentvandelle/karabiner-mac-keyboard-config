import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + I ou ctrl + shift + I ouvre les changements (envoie cmd + shift + D).
 * ctrl + shift + I n'atteint plus Claude desktop.
 */
export function createClaudeChangesJsonFile(): Karabiner {
  const openChanges = createRule({
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
        key_code: KarabinerKeyCodes.D,
      },
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder('Personal keys', 'Claude desktop changes to ctrl + I or ctrl + shift + I', [
    ...openChanges,
  ]);
}
