// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { TextEncoder, TextDecoder } from 'util';


import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Explicit mocks for CRWN Clothing SVGs
jest.mock('./assets/shopping-bag.svg', () => ({
    ReactComponent: () => <svg data-testid="shopping-icon" />,
    default: 'shopping-bag.svg',
}));

jest.mock('./assets/crown.svg', () => ({
    ReactComponent: () => <svg data-testid="crown-logo" />,
    default: 'crown.svg',
}));