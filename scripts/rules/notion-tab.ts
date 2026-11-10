import { Applications, Karabiner, KarabinerKeyCodes, KarabinerModifierKeys } from '../core/model';
import { createJsonFilePLaceholder as createJsonFilePlaceholder, createRule } from '../core/rules';

const NOTION_TAB_TOGGLE = 'notion_tab_toggle';

/**
 * Dans Notion, ctrl + Tab alterne entre deux onglets voisins :
 * un appui va à l'onglet suivant (ctrl + Tab), le suivant revient au précédent (ctrl + shift + Tab).
 * Notion n'a pas de raccourci « dernier onglet », c'est l'approximation la plus proche.
 */
export function createNotionTabJsonFile(): Karabiner {
  const ctrlTab = [
    {
      modifiers: {
        mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
      },
      key_code: KarabinerKeyCodes.TAB,
    },
  ];
  const nextTab = createRule({
    assignShortcuts: ctrlTab,
    assignKeys: [
      {
        modifiers: [KarabinerModifierKeys.LEFT_CONTROL],
        key_code: KarabinerKeyCodes.TAB,
      },
    ],
    onlyAppliesForThisApplications: [Applications.NOTION],
    onlyWhenVariable: { name: NOTION_TAB_TOGGLE, value: 0 },
    setVariable: { name: NOTION_TAB_TOGGLE, value: 1 },
  });
  const previousTab = createRule({
    assignShortcuts: ctrlTab,
    assignKeys: [
      {
        modifiers: [KarabinerModifierKeys.LEFT_CONTROL, KarabinerModifierKeys.LEFT_SHIFT],
        key_code: KarabinerKeyCodes.TAB,
      },
    ],
    onlyAppliesForThisApplications: [Applications.NOTION],
    onlyWhenVariable: { name: NOTION_TAB_TOGGLE, value: 1 },
    setVariable: { name: NOTION_TAB_TOGGLE, value: 0 },
  });
  return createJsonFilePlaceholder('Personal keys', 'Notion ctrl + Tab toggles between the two last tabs', [
    ...nextTab,
    ...previousTab,
  ]);
}
