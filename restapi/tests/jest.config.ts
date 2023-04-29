export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:["**/src/controllers/*.{ts,tsx}",
        "**/src/facade.ts",
        "!server.ts",
        "api.ts",
        "**/src/persistence/*.{ts,tsx}",
        "!**/src/persistence/DefaultMongo.ts",
        "**/src/entities/*.{ts,tsx}",
    ],
    testResultsProcessor:"jest-sonar-reporter"
}