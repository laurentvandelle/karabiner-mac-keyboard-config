import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + ù ou cmd + ù ouvre le terminal (envoie cmd + J).
 * ctrl + shift + ù crée un nouveau terminal (envoie ctrl + shift + `).
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
  const newTerminal = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL, KarabinerModifierKeys.LEFT_SHIFT],
        },
        key_code: KarabinerKeyCodes.U_ACCENT_GRAVE,
      },
    ],
    assignKeys: [
      {
        // grave_accent_and_tilde : touche ` du clavier virtuel ANSI, attendue par le raccourci « New terminal »
        modifiers: [KarabinerModifierKeys.LEFT_CONTROL, KarabinerModifierKeys.LEFT_SHIFT],
        key_code: KarabinerKeyCodes.AROBAS,
      },
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder(
    'Personal keys',
    'Claude desktop terminal to ctrl + ù or cmd + ù, new terminal to ctrl + shift + ù',
    [...openTerminal, ...newTerminal],
  );
}
