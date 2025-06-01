import { spawn } from "child_process"

type Arguments = {
  command: string[]
  verbose?: boolean
  expandVars?: boolean
}

const parseArguments = (args: string[]): Arguments => {
  const parsed: Arguments = { command: [] }
  let i = 0

  while (i < args.length) {
    const arg = args[i]

    if (arg === "-v" || arg === "--verbose") {
      parsed.verbose = true
    } else if (arg === "--expand-vars" || arg === "--expand") {
      parsed.expandVars = true
    } else if (arg === "-h" || arg === "--help") {
      console.log(`
Usage: npx-env [options] <command> [args...]

A cross-platform command runner that ensures all system environment variables 
are properly passed to child processes, including npx commands.

Options:
  -v, --verbose       Show environment variables being passed
  --expand-vars       Expand environment variables in MCP config env values
  -h, --help          Show this help message

Examples:
  npx-env npx -y @modelcontextprotocol/server-memory
  npx-env --expand-vars npx -y @modelcontextprotocol/server-memory
  npx-env node server.js
  npx-env npm start

Use case: When npx doesn't pick up system environment variables properly.
Variable expansion: Use $VAR, \${VAR}, or %VAR% in MCP config env values.
Environment setting: Use 'ENV:VAR_NAME=value' syntax to set environment variables.
`)
      process.exit(0)
    } else {
      parsed.command = args.slice(i)
      break
    }
    i++
  }

  if (parsed.command.length === 0) {
    throw new Error("No command specified. Use --help for usage information.")
  }

  return parsed
}

const expandEnvironmentVariables = (
  value: string,
  envContext: Record<string, string | undefined> = process.env,
): string => {
  // Handle both Unix ($VAR, ${VAR}) and Windows (%VAR%) style variables
  return value
    .replace(/\$\{([^}]+)\}|\$([A-Za-z_][A-Za-z0-9_]*)/g, (match, braced, unbraced) => {
      const varName = braced || unbraced
      return envContext[varName] || process.env[varName] || match
    })
    .replace(/%([A-Za-z_][A-Za-z0-9_]*)%/g, (match, varName) => {
      return envContext[varName] || process.env[varName] || match
    })
}

const runCommand = (command: string[], verbose: boolean = false, expandVars: boolean = false): Promise<number> => {
  return new Promise((resolve, reject) => {
    const [cmd, ...originalArgs] = command

    let childEnv = { ...process.env }
    let args = originalArgs

    // If expand-vars is enabled, expand environment variables in command args and env values
    if (expandVars) {
      // First, look for ENV: prefixed arguments and convert them to environment variables
      const newArgs: string[] = []
      for (const arg of args) {
        if (arg.startsWith('ENV:')) {
          // Format: ENV:VAR_NAME=value
          const envAssignment = arg.slice(4) // Remove 'ENV:' prefix
          const [envVar, ...valueParts] = envAssignment.split('=')
          const envValue = valueParts.join('=') // Handle values with = in them
          
          if (envVar && envValue !== undefined) {
            const expandedValue = expandEnvironmentVariables(envValue, childEnv)
            childEnv[envVar] = expandedValue
            if (verbose) {
              console.log(`Set env var: ${envVar}=${expandedValue}`)
            }
          }
        } else {
          newArgs.push(arg)
        }
      }
      args = newArgs

      // Then expand remaining command arguments
      args = args.map((arg) => {
        const expanded = expandEnvironmentVariables(arg, childEnv)
        if (arg !== expanded && verbose) {
          console.log(`Expanded arg: ${arg} → ${expanded}`)
        }
        return expanded
      })

      // Then expand environment variables that reference other variables in the same env
      let hasChanges = true
      let iterations = 0
      const maxIterations = 5 // Prevent infinite loops

      while (hasChanges && iterations < maxIterations) {
        hasChanges = false
        iterations++

        Object.keys(childEnv).forEach((key) => {
          if (childEnv[key]) {
            const original = childEnv[key]!
            const expanded = expandEnvironmentVariables(original, childEnv)
            if (original !== expanded) {
              if (verbose && iterations === 1) {
                console.log(`Expanded env ${key}: ${original} → ${expanded}`)
              }
              childEnv[key] = expanded
              hasChanges = true
            }
          }
        })
      }
    }

    if (verbose) {
      console.log(`Running: ${cmd} ${args.join(" ")}`)
      console.log("Environment variables:")
      Object.entries(childEnv)
        .filter(
          ([key]) => key.includes("MEMORY") || key.includes("API") || key.includes("TOKEN") || key.includes("KEY"),
        )
        .forEach(([key, value]) => {
          console.log(`  ${key}=${value}`)
        })
    }

    const child = spawn(cmd, args, {
      stdio: "inherit",
      env: childEnv,
      shell: process.platform === "win32",
    })

    child.on("error", (error) => {
      reject(new Error(`Failed to start command: ${error.message}`))
    })

    child.on("close", (code) => {
      resolve(code || 0)
    })
  })
}

const main = async (): Promise<void> => {
  try {
    const args = process.argv.slice(2)
    const { command, verbose, expandVars } = parseArguments(args)

    const exitCode = await runCommand(command, verbose, expandVars)
    process.exit(exitCode)
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { runCommand, parseArguments, expandEnvironmentVariables }
