import { spawn } from 'child_process';

type Arguments = {
  command: string[];
  verbose?: boolean;
};

const parseArguments = (args: string[]): Arguments => {
  const parsed: Arguments = { command: [] };
  let i = 0;
  
  while (i < args.length) {
    const arg = args[i];
    
    if (arg === '-v' || arg === '--verbose') {
      parsed.verbose = true;
    } else if (arg === '-h' || arg === '--help') {
      console.log(`
Usage: npx-env [options] <command> [args...]

A cross-platform command runner that ensures all system environment variables 
are properly passed to child processes, including npx commands.

Options:
  -v, --verbose       Show environment variables being passed
  -h, --help          Show this help message

Examples:
  npx-env npx -y @modelcontextprotocol/server-memory
  npx-env node server.js
  npx-env npm start

Use case: When npx doesn't pick up system environment variables properly.
`);
      process.exit(0);
    } else {
      parsed.command = args.slice(i);
      break;
    }
    i++;
  }
  
  if (parsed.command.length === 0) {
    throw new Error('No command specified. Use --help for usage information.');
  }
  
  return parsed;
};

const runCommand = (command: string[], verbose: boolean = false): Promise<number> => {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command;
    
    if (verbose) {
      console.log(`Running: ${cmd} ${args.join(' ')}`);
      console.log('Environment variables:');
      Object.entries(process.env)
        .filter(([key]) => key.includes('MEMORY') || key.includes('API') || key.includes('TOKEN') || key.includes('KEY'))
        .forEach(([key, value]) => {
          console.log(`  ${key}=${value}`);
        });
    }
    
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      env: { ...process.env },
      shell: process.platform === 'win32',
    });
    
    child.on('error', (error) => {
      reject(new Error(`Failed to start command: ${error.message}`));
    });
    
    child.on('close', (code) => {
      resolve(code || 0);
    });
  });
};

const main = async (): Promise<void> => {
  try {
    const args = process.argv.slice(2);
    const { command, verbose } = parseArguments(args);
    
    const exitCode = await runCommand(command, verbose);
    process.exit(exitCode);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

export { runCommand, parseArguments };