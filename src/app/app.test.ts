import { describe, expect, it } from 'vitest';

import { Context } from '@/enums/context.js';
import { PermissionLevel } from '@/enums/permissionLevel/permissionLevel.js';

import { LocalContext, ScreenCalibration } from './app.js';

describe('App Types', () => {
  describe('LocalContext', () => {
    it('should keep screenCalibration optional', () => {
      const context: LocalContext = {
        apiHost: 'https://example.org',
        context: Context.Player,
        itemId: 'item-id',
        permission: PermissionLevel.Read,
      };

      expect(context.screenCalibration).toBeUndefined();
    });

    it('should accept valid screenCalibration values', () => {
      const screenCalibration: ScreenCalibration = {
        scale: 1.25,
        fontSize: 'large',
      };

      const context: LocalContext = {
        apiHost: 'https://example.org',
        context: Context.Player,
        itemId: 'item-id',
        permission: PermissionLevel.Read,
        screenCalibration,
      };

      expect(context.screenCalibration).toEqual(screenCalibration);
    });

    it('should restrict fontSize values at type level', () => {
      const validCalibration = {
        fontSize: 'normal',
      } satisfies ScreenCalibration;

      expect(validCalibration.fontSize).toBe('normal');

      // @ts-expect-error invalid font size should not be assignable
      const invalidCalibration: ScreenCalibration = { fontSize: 'x-large' };

      expect(invalidCalibration).toBeDefined();
    });
  });
});
