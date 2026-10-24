// eslint-disable-next-line no-undef
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	resolver: '<rootDir>/tests/jest.resolver.cjs',
	setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
	roots: ['<rootDir>/src', '<rootDir>/tests'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};
