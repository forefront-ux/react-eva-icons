module.exports = {
    rootDir: '../',
    verbose: true,
    setupFiles: ['<rootDir>/test/enzyme.config.js', 'jest-prop-type-error'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/test/__mocks__/fileMock.js',
      '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js'
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    modulePathIgnorePatterns: ['<rootDir>/icons']
};
  