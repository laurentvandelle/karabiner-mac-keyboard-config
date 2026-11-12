import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

/**
 * Ctrl + Y rétablit (redo) dans Claude Desktop, comme cmd + shift + Z
 */
export function createClaudeRedoJsonFile(): Karabiner {
  const redoClaude = createRule({
    assignShortcuts: [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.Y,
      },
    ],
    assignKeys: [
      {
        modifiers: [KarabinerModifierKeys.LEFT_COMMAND, KarabinerModifierKeys.LEFT_SHIFT],
        key_code: KarabinerKeyCodes.Z,
      },
    ],
    onlyAppliesForThisApplications: [Applications.CLAUDE],
  });
  return createJsonFilePlaceholder('Personal keys', 'Claude redo to ctrl + Y', [...redoClaude]);
}
