export function keychronDeviceSwapSample() {
  return [
    {
      type: 'basic',
      from: {
        modifiers: {
          optional: ['any'],
        },
        key_code: 'non_us_backslash',
      },
      to: [
        {
          key_code: 'grave_accent_and_tilde',
        },
      ],
      conditions: [
        {
          type: 'device_if',
          identifiers: [
            {
              vendor_id: 13364,
              product_id: 1819,
              is_keyboard: true,
            },
          ],
        },
      ],
    },
  ];
}

export function firefoxRedoSample() {
  return {
    title: 'Personal keys',
    rules: [
      {
        description: 'Firefox redo to ctrl + Y',
        manipulators: [
          {
            type: 'basic',
            from: {
              modifiers: {
                mandatory: ['left_control'],
              },
              key_code: 'y',
            },
            to: [
              {
                modifiers: ['left_command', 'left_shift'],
                key_code: 'w',
              },
            ],
            conditions: [
              {
                type: 'frontmost_application_if',
                bundle_identifiers: ['^org\\.mozilla\\.firefox$'],
              },
            ],
          },
        ],
      },
    ],
  };
}

export function variableToggleSample() {
  return [
    {
      type: 'basic',
      from: {
        modifiers: {
          mandatory: ['left_control'],
        },
        key_code: 'tab',
      },
      to: [
        {
          modifiers: ['left_control'],
          key_code: 'tab',
        },
        {
          set_variable: {
            name: 'toggle',
            value: 1,
          },
        },
      ],
      conditions: [
        {
          type: 'variable_if',
          name: 'toggle',
          value: 0,
        },
      ],
    },
  ];
}
