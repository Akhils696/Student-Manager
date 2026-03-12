import * as matchers from '@testing-library/jest-dom/matchers';

if (globalThis.expect) {
  globalThis.expect.extend(matchers);
}

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
