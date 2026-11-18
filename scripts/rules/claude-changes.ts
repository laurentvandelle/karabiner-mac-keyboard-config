import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + B ouvre les changements (envoie cmd + shift + D).
 * ctrl + B n'envoie plus cmd + B (gras PC-Style) dans Claude desktop.
 */
export function createClaudeChangesJsonFile(): Karabiner {
  const openChanges = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.B,
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
  return createJsonFilePlaceholder('Personal keys', 'Claude desktop changes to ctrl + B', [...openChanges]);
}
