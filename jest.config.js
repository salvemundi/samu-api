module.exports = {
  "moduleDirectories": [
    ".",
    "src",
    "src/config",
    "src/controllers",
    "src/dto",
    "src/entities",
    "src/modules",
    "src/services",
    "node_modules"
  ],
  "moduleFileExtensions": [ "ts", "json", "js" ],
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