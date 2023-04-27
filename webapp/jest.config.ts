export default {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "auth/**.{ts,tsx}",
        "!server.ts",
        "!api/**.{ts,tsx}",
        "components/**.{ts,tsx}",
        "!views/**.{ts,tsx}",
        "!utils/**.{ts,tsx}",
        "!podManager/**.{ts,tsx}",
        "!shared/**.{ts,tsx}",
    ]
}