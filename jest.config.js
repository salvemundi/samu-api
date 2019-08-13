module.exports = {
  "moduleDirectories": [
    "<rootDir>/.",
    "<rootDir>/src",
    "<rootDir>/src/config",
    "<rootDir>/src/controllers",
    "<rootDir>/src/dto",
    "<rootDir>/src/entities",
    "<rootDir>/src/modules",
    "<rootDir>/src/services",
    "<rootDir>/node_modules"
  ],
  "moduleFileExtensions": [ "ts", "json", "js" ],
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "coverageDirectory": "../coverage",
  "moduleNameMapper": {
    "src/(.*)": "<rootDir>/src/$1"
  }
}