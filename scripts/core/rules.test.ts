import { firefoxRedoSample, keychronDeviceSwapSample, variableToggleSample } from '../tests/samples';
import { KarabinerDevices, KarabinerKeyCodes, KarabinerModifierKeys } from './model';
import { createRule } from './rules';

describe('rules', () => {
  it('should create a rule', () => {
    // Given
    const assignShortcuts = [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.Y,
      },
    ];
    const assignKeys = [
      {
        modifiers: [KarabinerModifierKeys.LEFT_COMMAND, KarabinerModifierKeys.LEFT_SHIFT],
        key_code: KarabinerKeyCodes.Z,
      },
    ];
    // When
    const rule = createRule({ assignShortcuts, assignKeys });

    // Then
    expect(rule).toEqual(firefoxRedoSample());
  });

  it('should limit a key swap to one keyboard', () => {
    // Given
    const assignShortcuts = [
      {
        modifiers: {
          optional: [KarabinerModifierKeys.ANY],
        },
        key_code: KarabinerKeyCodes.INFERIEUR,
      },
    ];
    const assignKeys = [
      {
        key_code: KarabinerKeyCodes.AROBAS,
      },
    ];
    // When
    const rule = createRule({
      assignShortcuts,
      assignKeys,
      onlyAppliesForTheseDevices: [KarabinerDevices.KEYCHRON_B1_PRO],
    });

    // Then
    expect(rule).toEqual(keychronDeviceSwapSample());
  });

  it('should apply only when a variable is set, then set it', () => {
    // Given
    const assignShortcuts = [
      {
        modifiers: {
          mandatory: [KarabinerModifierKeys.LEFT_CONTROL],
        },
        key_code: KarabinerKeyCodes.TAB,
      },
    ];
    const assignKeys = [
      {
        modifiers: [KarabinerModifierKeys.LEFT_CONTROL],
        key_code: KarabinerKeyCodes.TAB,
      },
    ];
    // When
    const rule = createRule({
      assignShortcuts,
      assignKeys,
      onlyWhenVariable: { name: 'toggle', value: 0 },
      setVariable: { name: 'toggle', value: 1 },
    });

    // Then
    expect(rule).toEqual(variableToggleSample());
  });
});
