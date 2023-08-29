import { ClientSecretCredential } from "@azure/identity"
import {
  TokenCredentialAuthenticationProvider,
  TokenCredentialAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials"
import { Client } from "@microsoft/microsoft-graph-client"

export type GraphArray<T> = {
  "@odata.context": string
  value: T[]
}

export const GraphClient = () => {

  const MS_APP_TENANT_ID = process.env.MS_APP_TENANT_ID
  const MS_APP_CLIENT_ID = process.env.MS_APP_CLIENT_ID
  const MS_APP_SECRET = process.env.MS_APP_SECRET
  if (!MS_APP_TENANT_ID || !MS_APP_CLIENT_ID || !MS_APP_SECRET) {
    throw new Error("Missing MS_APP_TENANT_ID, MS_APP_CLIENT_ID, or MS_APP_SECRET")
  } else {
    const tokenCredential = new ClientSecretCredential(
      MS_APP_TENANT_ID,
      MS_APP_CLIENT_ID,
      MS_APP_SECRET,
    )
    // Set your scopes and options for TokenCredential.getToken (Check the ` interface GetTokenOptions` in (TokenCredential Implementation)[https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-auth/src/tokenCredential.ts])
    const options: TokenCredentialAuthenticationProviderOptions = { scopes: ["https://graph.microsoft.com/.default"] }
    // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
    const authProvider = new TokenCredentialAuthenticationProvider(tokenCredential, options)
    return Client.initWithMiddleware({
      debugLogging: true,
      authProvider: authProvider,
    })
  }
}