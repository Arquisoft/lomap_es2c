export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/auth/**.{ts,tsx}",
        "!server.ts",
        "!src/api/**.{ts,tsx}",
        "src/components/**.{ts,tsx}",
        "!src/views/**.{ts,tsx}",
        "!src/utils/**.{ts,tsx}",
        "!src/podManager/**.{ts,tsx}",
        "!src/shared/**.{ts,tsx}",
    ]
}