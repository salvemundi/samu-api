module.exports = {
    "moduleDirectories": [ "node_modules", "src" ],
    "moduleFileExtensions": [ "js", "json", "ts" ],
    "roots": [ "src" ],
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "coverageDirectory": "../coverage",
    "moduleNameMapper": {
      "src/(.*)": "<rootDir>/src/$2.ts"
    }
}