module.exports = {
  "moduleDirectories": [
    ".",
    "src",
    "src/config",
    "src/controllers",
    "src/dto",
    "src/enitities",
    "src/modules",
    "src/services",
    "node_modules"
  ],
  "moduleFileExtensions": [ "js", "json", "ts" ],
  "roots": [ "src" ],
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "coverageDirectory": "../coverage",
  "moduleNameMapper": {
    "src/(.*)": "<rootDir>/src/$1"
  }
}