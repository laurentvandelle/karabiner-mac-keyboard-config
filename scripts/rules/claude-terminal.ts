import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + ù ou cmd + ù ouvre le terminal (envoie cmd + J)
 */
export function createClaudeTerminalJsonFile(): Karabiner {
  const openTerminal = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.U_ACCENT_GRAVE,
      },
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_COMMAND],
        },
        key_code: KarabinerKeyCodes.U_ACCENT_GRAVE,
      },
    ],
    assignKeys: [
      {
        modifiers: [KarabinerModifierKeys.LEFT_COMMAND],
        key_code: KarabinerKeyCodes.J,
      },
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder('Personal keys', 'Claude desktop terminal to ctrl + ù or cmd + ù', [...openTerminal]);
}
