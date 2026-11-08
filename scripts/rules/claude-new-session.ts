import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + T ouvre une nouvelle session, comme un nouvel onglet dans le navigateur (envoie cmd + N).
 */
export function createClaudeNewSessionJsonFile(): Karabiner {
  const newSession = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.T,
      },
    ],
    assignKeys: [
      {
        modifiers: [KarabinerModifierKeys.LEFT_COMMAND],
        key_code: KarabinerKeyCodes.N,
      },
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder('Personal keys', 'Claude desktop new session to ctrl + T', [...newSession]);
}
