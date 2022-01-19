import { redirect } from './navigation';

const DEFAULT_URL = 'https://example.com';

describe('Navigation Util Tests', () => {
  describe('redirect', () => {
    it('redirect successfully for default values', () => {
      const mockWindowOpen = jest.spyOn(window.location, 'assign');
      redirect(DEFAULT_URL);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL);
    });
    it('redirect successfully in new tab with name', () => {
      const mockWindowOpen = jest.spyOn(window, 'open');
      const args = { name: 'somename', openInNewTab: true };
      redirect(DEFAULT_URL, args);
      expect(mockWindowOpen).toHaveBeenCalledWith(DEFAULT_URL, args.name);
    });
  });
});
