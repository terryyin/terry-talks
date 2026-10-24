import '@testing-library/jest-dom';
import {TextDecoder, TextEncoder} from 'node:util';

Object.assign(globalThis, {TextDecoder, TextEncoder});

// FontFace loading needs a browser; unit tests exercise composition structure.
jest.mock('@remotion/fonts', () => ({
	loadFont: jest.fn().mockResolvedValue(undefined),
}));
