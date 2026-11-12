import {
  Applications,
  Karabiner,
  KarabinerDeviceIdentifier,
  KarabinerManipulators,
  KarabinerModifier,
  KarabinerVariable,
} from './model';

export function createJsonFilePLaceholder(title: string, description: string, manipulators: KarabinerManipulators[]): Karabiner {
  return { title, rules: [{ description, manipulators }] };
}

/**
 * Regroupe plusieurs fichiers en un seul document, donc une seule section dans Karabiner-Elements.
 * Chaque nom de règle reçoit le préfixe, par exemple « Personal-keys Claude redo to ctrl + Y ».
 */
export function mergeJsonFiles(title: string, files: Karabiner[], prefix = ''): Karabiner {
  return {
    title,
    rules: files.flatMap((file) => file.rules.map((rule) => ({ ...rule, description: `${prefix}${rule.description}` }))),
  };
}

/**
 * Assign new shortcuts
 * @param assignShortcuts all keys you want to assign a shortcut
 * @param assignKeys the shortcut you want to assign
 * @param onlyAppliesForThisApplications
 * @param onlyAppliesForTheseDevices
 * @param onlyWhenVariable the rule applies only when this variable has this value
 * @param setVariable variable set after the keys are sent
 * @returns
 */
export function createRule({
  assignShortcuts,
  assignKeys,
  onlyAppliesForThisApplications,
  onlyAppliesForTheseDevices,
  onlyWhenVariable,
  setVariable,
}: {
  assignShortcuts: KarabinerModifier[];
  assignKeys: KarabinerModifier[];
  onlyAppliesForThisApplications?: Applications[];
  onlyAppliesForTheseDevices?: KarabinerDeviceIdentifier[];
  onlyWhenVariable?: KarabinerVariable;
  setVariable?: KarabinerVariable;
}): KarabinerManipulators[] {
  return assignShortcuts.map((assignShortcut) => {
    return {
      type: 'basic',
      from: assignShortcut,
      to: setVariable ? [...assignKeys, { set_variable: setVariable }] : assignKeys,
      conditions: createManipulatorsConditions({
        onlyAppliesForThisApplications,
        onlyAppliesForTheseDevices,
        onlyWhenVariable,
      }),
    };
  });
}

function createManipulatorsConditions({
  onlyAppliesForThisApplications,
  onlyAppliesForTheseDevices,
  onlyWhenVariable,
}: {
  onlyAppliesForThisApplications?: Applications[];
  onlyAppliesForTheseDevices?: KarabinerDeviceIdentifier[];
  onlyWhenVariable?: KarabinerVariable;
}): any[] {
  const conditions: any[] = [];
  if (onlyAppliesForThisApplications) {
    conditions.push({
      type: 'frontmost_application_if',
      bundle_identifiers: onlyAppliesForThisApplications,
    });
  }
  if (onlyAppliesForTheseDevices) {
    conditions.push({
      type: 'device_if',
      identifiers: onlyAppliesForTheseDevices,
    });
  }
  if (onlyWhenVariable) {
    conditions.push({
      type: 'variable_if',
      name: onlyWhenVariable.name,
      value: onlyWhenVariable.value,
    });
  }
  return conditions;
}
