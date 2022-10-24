import { MOCK_HOST, MOCK_ITEM_ID, MOCK_URL } from '../../test/fixtures';
import { DEFAULT_PROTOCOL } from '../config';
import * as cookieUtils from './cookie';
import {
  buildItemLinkForBuilder,
  buildSignInPath,
  redirect,
  redirectToSavedUrl,
} from './navigation';

describe('Navigation Util Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('redirect', () => {
    it('redirect successfully for default values', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      redirect(MOCK_URL);
      expect(mockWindowOpen).toHaveBeenCalledWith(MOCK_URL);
    });

    it('redirect successfully in new tab with name', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      redirect(MOCK_URL, args);
      expect(mockWindowOpen).toHaveBeenCalledWith(MOCK_URL, args.name);
    });
  });

  describe('redirectToSavedUrl', () => {
    it('redirect successfully to saved link', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      jest.spyOn(cookieUtils, 'getUrlForRedirection').mockReturnValue(MOCK_URL);
      redirectToSavedUrl();
      expect(mockWindowOpen).toHaveBeenCalledWith(MOCK_URL);
    });

    it('redirect successfully to default link', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      jest
        .spyOn(cookieUtils, 'getUrlForRedirection')
        .mockReturnValue(undefined);
      redirectToSavedUrl(MOCK_URL);
      expect(mockWindowOpen).toHaveBeenCalledWith(MOCK_URL);
    });

    it('redirect successfully to saved link in new tab', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      jest.spyOn(cookieUtils, 'getUrlForRedirection').mockReturnValue(MOCK_URL);
      redirectToSavedUrl(MOCK_URL, args);
      expect(mockWindowOpen).toHaveBeenCalledWith(MOCK_URL, args.name);
    });

    it('redirect successfully to default link in new tab', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      redirectToSavedUrl(MOCK_URL, args);
      expect(mockWindowOpen).toHaveBeenCalledWith(MOCK_URL, args.name);
    });
  });

  describe('buildSignInPath', () => {
    it('build sign in path', () => {
      const res = buildSignInPath({ host: MOCK_HOST });
      expect(res).toContain(MOCK_HOST);
    });
  });

  describe('buildItemLinkForBuilder', () => {
    it('build item path without specifying chat status', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      expect(res).not.toContain('chat=');
    });

    it('build item path with chat closed', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
        chatOpen: false,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=false" to have the chat closed
      expect(res).toContain('chat=false');
    });

    it('build item path with chat open', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
        chatOpen: true,
      });
      expect(res).toContain(MOCK_HOST);
      expect(res).toContain(MOCK_ITEM_ID);
      // query string should contain "chat=true" to have the chat open
      expect(res).toContain('chat=true');
    });

    it('build item path with protocol', () => {
      const res = buildItemLinkForBuilder({
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(DEFAULT_PROTOCOL);
    });

    it('build item path with special protocol', () => {
      const specialProtocol = 'smb';
      const res = buildItemLinkForBuilder({
        protocol: specialProtocol,
        host: MOCK_HOST,
        itemId: MOCK_ITEM_ID,
      });
      expect(res).toContain(specialProtocol);
      expect(res).not.toContain(DEFAULT_PROTOCOL);
    });
  });
});
