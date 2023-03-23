/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  transform: {
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(firebase|@firebase/firestore)/)",
  ],

  //   transformIgnorePatterns: ["node_modules/(?!(firebase|@firebase/firestore)/)"],

  globals: {
    "babel-jest": {
      babelrc: false,
      configFile: false,
      config: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      },
    },
  },

  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
};
