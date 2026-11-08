import { createBracketsJsonFile } from '../rules/brackets';
import { createClaudeChangesJsonFile } from '../rules/claude-changes';
import { createClaudeNewSessionJsonFile } from '../rules/claude-new-session';
import { createClaudeTerminalJsonFile } from '../rules/claude-terminal';
import { createFirefoxRedoJsonFile } from '../rules/firefox-redo';
import { createKeychronB1ProJsonFile } from '../rules/keychron-b1-pro';
import { createWindowsNumberKeysJsonFile } from '../rules/pc-replace-keys';

export enum KarabinerModifierKeys {
  ANY = 'any',
  RIGHT_OPTION = 'right_option',
  LEFT_OPTION = 'left_option',
  RIGHT_SHIFT = 'right_shift',
  LEFT_SHIFT = 'left_shift',
  RIGHT_COMMAND = 'right_command',
  LEFT_COMMAND = 'left_command',
  RIGHT_CONTROL = 'right_control',
  LEFT_CONTROL = 'left_control',
}

export enum KarabinerKeyCodes {
  TIRET = 'equal_sign',
  PARENTESE_OUVRANTE = '5',
  PARENTESE_FERMANTE = 'hyphen',
  SIMPLE_GUILLEMET = '4',
  PARAGRAPHE = '6',
  Y = 'y',
  Z = 'w',
  W = 'z',
  AROBAS = 'grave_accent_and_tilde',
  INFERIEUR = 'non_us_backslash',
  U_ACCENT_GRAVE = 'quote',
  J = 'j',
  I = 'i',
  D = 'd',
  T = 't',
  N = 'n',
}

export enum Applications {
  FIREFOX = '^org\\.mozilla\\.firefox$',
  CLAUDE = '^com\\.anthropic\\.claudefordesktop$',
}

export type KarabinerDeviceIdentifier = {
  vendor_id: number;
  product_id: number;
  is_keyboard: boolean;
};

export const KarabinerDevices: { KEYCHRON_B1_PRO: KarabinerDeviceIdentifier } = {
  KEYCHRON_B1_PRO: {
    vendor_id: 13364,
    product_id: 1819,
    is_keyboard: true,
  },
};

export enum jsonFileNames {
  PC_REPLACE = 'pc-replace-keys',
  BRACKETS = 'brackets',
  FIREFOX_REDO = 'firefox-redo',
  KEYCHRON_B1_PRO = 'keychron-b1-pro',
  CLAUDE_TERMINAL = 'claude-terminal',
  CLAUDE_CHANGES = 'claude-changes',
  CLAUDE_NEW_SESSION = 'claude-new-session',
}

export const jsonFiles: Record<string, Karabiner> = {
  'pc-replace-keys': createWindowsNumberKeysJsonFile(),
  brackets: createBracketsJsonFile(),
  'firefox-redo': createFirefoxRedoJsonFile(),
  'keychron-b1-pro': createKeychronB1ProJsonFile(),
  'claude-terminal': createClaudeTerminalJsonFile(),
  'claude-changes': createClaudeChangesJsonFile(),
  'claude-new-session': createClaudeNewSessionJsonFile(),
};

export type Karabiner = {
  title: string;
  rules: [
    {
      description: string;
      manipulators: KarabinerManipulators[];
    },
  ];
};

export type KarabinerManipulators = {
  type: 'basic';
  from: KarabinerModifier; // Shortcut you want
  to: KarabinerModifier[]; // Character you want
};

export type KarabinerModifier = {
  modifiers?: KarabinerMandatoryModifier | KarabinerModifierKeys[];
  key_code: KarabinerKeyCodes;
};

export type KarabinerMandatoryModifier = {
  mandatory?: KarabinerModifierKeys[];
  optional?: KarabinerModifierKeys[];
};
