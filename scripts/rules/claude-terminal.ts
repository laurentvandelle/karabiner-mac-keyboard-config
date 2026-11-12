import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Dans Claude desktop, ctrl + ù ouvre le terminal en plein écran (envoie cmd + J puis cmd + shift + \).
 * cmd + ù ouvre ou ferme le terminal à sa taille normale (envoie cmd + J).
 * ctrl + shift + ù crée un nouveau terminal en plein écran (envoie ctrl + shift + ` puis cmd + shift + \).
 */
export function createClaudeTerminalJsonFile(): Karabiner {
  const toggleTerminal = {
    modifiers: [KarabinerModifierKeys.LEFT_COMMAND],
    key_code: KarabinerKeyCodes.J,
  };
  const expandPane = {
    // backslash : code physique attendu par le raccourci « Expand or collapse pane », quelle que soit la disposition
    modifiers: [KarabinerModifierKeys.LEFT_COMMAND, KarabinerModifierKeys.LEFT_SHIFT],
    key_code: KarabinerKeyCodes.ANTISLASH,
  };
  const openExpandedTerminal = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.U_ACCENT_GRAVE,
      },
    ],
    assignKeys: [toggleTerminal, expandPane],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  const openTerminal = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_COMMAND],
        },
        key_code: KarabinerKeyCodes.U_ACCENT_GRAVE,
      },
    ],
    assignKeys: [toggleTerminal],
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
      expandPane,
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder(
    'Personal keys',
    'Claude desktop expanded terminal to ctrl + ù, terminal to cmd + ù, expanded new terminal to ctrl + shift + ù',
    [...openExpandedTerminal, ...openTerminal, ...newTerminal],
  );
}
