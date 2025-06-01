import { parseArguments, expandEnvironmentVariables } from '../src/index';

describe('npx-env', () => {
  describe('parseArguments', () => {
    it('should parse basic command', () => {
      const result = parseArguments(['node', 'script.js']);
      expect(result.command).toEqual(['node', 'script.js']);
      expect(result.verbose).toBeFalsy();
      expect(result.expandVars).toBeFalsy();
    });

    it('should parse verbose flag', () => {
      const result = parseArguments(['-v', 'node', 'script.js']);
      expect(result.command).toEqual(['node', 'script.js']);
      expect(result.verbose).toBe(true);
    });

    it('should parse expand-vars flag', () => {
      const result = parseArguments(['--expand-vars', 'node', 'script.js']);
      expect(result.command).toEqual(['node', 'script.js']);
      expect(result.expandVars).toBe(true);
    });

    it('should parse short expand flag', () => {
      const result = parseArguments(['--expand', 'npm', 'start']);
      expect(result.command).toEqual(['npm', 'start']);
      expect(result.expandVars).toBe(true);
    });

    it('should throw error for missing command', () => {
      expect(() => parseArguments([])).toThrow('No command specified');
    });

    it('should handle complex npx commands', () => {
      const result = parseArguments(['npx', '-y', '@modelcontextprotocol/server-memory']);
      expect(result.command).toEqual(['npx', '-y', '@modelcontextprotocol/server-memory']);
      expect(result.verbose).toBeFalsy();
      expect(result.expandVars).toBeFalsy();
    });

    it('should handle multiple flags', () => {
      const result = parseArguments(['-v', '--expand-vars', 'node', 'script.js']);
      expect(result.command).toEqual(['node', 'script.js']);
      expect(result.verbose).toBe(true);
      expect(result.expandVars).toBe(true);
    });
  });

  describe('expandEnvironmentVariables', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = {
        ...originalEnv,
        TEST_VAR: '/test/path',
        USER_HOME: '/Users/testuser',
        ONEDRIVE_PATH: '/Users/testuser/OneDrive'
      };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should expand simple variables', () => {
      const result = expandEnvironmentVariables('$TEST_VAR/file.json');
      expect(result).toBe('/test/path/file.json');
    });

    it('should expand braced variables', () => {
      const result = expandEnvironmentVariables('${USER_HOME}/Documents');
      expect(result).toBe('/Users/testuser/Documents');
    });

    it('should expand multiple variables', () => {
      const result = expandEnvironmentVariables('${ONEDRIVE_PATH}/Memory/memory.json');
      expect(result).toBe('/Users/testuser/OneDrive/Memory/memory.json');
    });

    it('should leave unknown variables unchanged', () => {
      const result = expandEnvironmentVariables('$UNKNOWN_VAR/file.json');
      expect(result).toBe('$UNKNOWN_VAR/file.json');
    });

    it('should handle mixed expanded and unexpanded variables', () => {
      const result = expandEnvironmentVariables('${USER_HOME}/$UNKNOWN/Documents');
      expect(result).toBe('/Users/testuser/$UNKNOWN/Documents');
    });

    it('should handle no variables', () => {
      const result = expandEnvironmentVariables('/static/path/file.json');
      expect(result).toBe('/static/path/file.json');
    });
  });
});