export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    coverageReporters: ['lcov'],
    coverageDirectory: 'coverage',
    collectCoverageFrom:["**/src/controllers/*.{ts,tsx}",
        "**/src/facade.ts",
        "!server.ts",
        "api.ts",
        "**/src/persistence/*.{ts,tsx}",
        "!**/src/persistence/DefaultMongo.ts",
        "**/src/entities/*.{ts,tsx}",
    ]
}