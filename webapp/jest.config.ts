export default {
    rootDir: './',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/auth/**.tsx",
        "src/components/**.tsx",
    ]
}