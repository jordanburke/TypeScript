import { timingSafeEqual } from "crypto"
import { readFileSync } from "fs"
import ssh2 from "ssh2"
import { inspect } from "util"

const {
  utils: { parseKey },
  Server,
} = ssh2

const allowedUser = Buffer.from("jordan")
const allowedPassword = Buffer.from("password")
const allowedPubKey = parseKey(readFileSync("node-server-ssh.pub"))

const checkValue = (input, allowed) => {
  const autoReject = input.length !== allowed.length
  if (autoReject) {
    // Prevent leaking length information by always making a comparison with the
    // same input when lengths don't match what we expect ...
    allowed = input
  }
  const isMatch = timingSafeEqual(input, allowed)
  return !autoReject && isMatch
}

new Server(
  {
    hostKeys: [readFileSync("node-server-ssh")],
  },
  (client) => {
    console.log("Client connected!")

    client
      .on("authentication", (ctx) => {
        let allowed = true
        if (!checkValue(Buffer.from(ctx.username), allowedUser)) allowed = false

        switch (ctx.method) {
          case "password":
            if (!checkValue(Buffer.from(ctx.password), allowedPassword)) return ctx.reject()
            break
          case "publickey":
            if ("type" in allowedPubKey && "key" in ctx && "hashAlgo" in ctx) {
              const valid = !checkValue(ctx.key.data, allowedPubKey.getPublicSSH())
              const sig = !!(ctx.signature && !allowedPubKey.verify(ctx.blob, ctx.signature, ctx.hashAlgo))
              if (ctx.key.algo !== allowedPubKey.type || valid || sig) {
                return ctx.reject()
              }
            }
            break
          default:
            return ctx.reject()
        }

        if (allowed) ctx.accept()
        else ctx.reject()
      })
      .on("ready", () => {
        console.log("Client authenticated!")

        client.on("session", (accept, reject) => {
          const session = accept()
          console.log("accepted")
          session.once("exec", (accept, reject, info) => {
            console.log("Client wants to execute: " + inspect(info.command))
            const stream = accept()
            stream.stderr.write("Oh no, the dreaded errors!\n")
            stream.write("Just kidding about the errors!\n")
            stream.exit(0)
            stream.end()
          })
        })
      })
      .on("close", () => {
        console.log("Client disconnected")
      })
      .on("error", () => {
        console.error("Client Error")
      })
  },
).listen(0, "127.0.0.1", function (this: ssh2.Server) {
  // @ts-ignore
  console.log("Listening on port " + this.address().port)
})
