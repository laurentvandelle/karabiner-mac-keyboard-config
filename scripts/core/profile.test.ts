import { KarabinerRule } from './model';
import { enableRulesInProfile } from './profile';

function rule(description: string, keyCode: string): KarabinerRule {
  return { description, manipulators: [{ type: 'basic', from: { key_code: keyCode }, to: [] } as any] };
}

describe('profile', () => {
  it('should add a new rule at the top of the selected profile', () => {
    // Given
    const config = {
      profiles: [
        { name: 'other', complex_modifications: { rules: [] } },
        { name: 'main', selected: true, complex_modifications: { rules: [rule('existing', 'a')] } },
      ],
    };
    // When
    const result = enableRulesInProfile(config, [rule('new', 'b')]);

    // Then
    expect(result.profiles[1].complex_modifications.rules.map((r) => r.description)).toEqual(['new', 'existing']);
    expect(result.profiles[0].complex_modifications.rules).toEqual([]);
    expect(config.profiles[1].complex_modifications.rules).toHaveLength(1);
  });

  it('should replace a rule with the same description in place', () => {
    // Given
    const config = {
      profiles: [{ selected: true, complex_modifications: { rules: [rule('first', 'a'), rule('second', 'b')] } }],
    };
    // When
    const result = enableRulesInProfile(config, [rule('second', 'c')]);

    // Then
    expect(result.profiles[0].complex_modifications.rules).toEqual([rule('first', 'a'), rule('second', 'c')]);
  });

  it('should keep an identical rule untouched even if keys are ordered differently', () => {
    // Given
    const installed = { manipulators: [{ to: [], from: { key_code: 'a' }, type: 'basic' }], description: 'same' };
    const config = { profiles: [{ selected: true, complex_modifications: { rules: [installed] } }] };
    // When
    const result = enableRulesInProfile(config, [rule('same', 'a')]);

    // Then
    expect(result).toEqual(config);
    expect(Object.keys(result.profiles[0].complex_modifications.rules[0])).toEqual(['manipulators', 'description']);
  });

  it('should drop the unprefixed version and stale prefixed rules, but keep other rules', () => {
    // Given
    const config = {
      profiles: [
        {
          selected: true,
          complex_modifications: {
            rules: [rule('Redo', 'a'), rule('P Old name', 'b'), rule('P Not enabled', 'c'), rule('PC-Style Undo', 'd')],
          },
        },
      ],
    };
    // When
    const result = enableRulesInProfile(config, [rule('P Redo', 'a')], {
      prefix: 'P ',
      generatedDescriptions: ['P Redo', 'P Not enabled'],
    });

    // Then
    expect(result.profiles[0].complex_modifications.rules.map((r) => r.description)).toEqual([
      'P Redo',
      'P Not enabled',
      'PC-Style Undo',
    ]);
  });
});
