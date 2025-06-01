import { parseArguments } from "../src"

describe("cross-env-runner", () => {
  describe("parseArguments", () => {
    it("should parse basic command", () => {
      const result = parseArguments(["node", "script.js"])
      expect(result.command).toEqual(["node", "script.js"])
      expect(result.verbose).toBeFalsy()
    })

    it("should parse verbose flag", () => {
      const result = parseArguments(["-v", "node", "script.js"])
      expect(result.command).toEqual(["node", "script.js"])
      expect(result.verbose).toBe(true)
    })

    it("should parse long verbose flag", () => {
      const result = parseArguments(["--verbose", "npm", "start"])
      expect(result.command).toEqual(["npm", "start"])
      expect(result.verbose).toBe(true)
    })

    it("should throw error for missing command", () => {
      expect(() => parseArguments([])).toThrow("No command specified")
    })

    it("should handle complex npx commands", () => {
      const result = parseArguments(["npx", "-y", "@modelcontextprotocol/server-memory"])
      expect(result.command).toEqual(["npx", "-y", "@modelcontextprotocol/server-memory"])
      expect(result.verbose).toBeFalsy()
    })
  })
})
