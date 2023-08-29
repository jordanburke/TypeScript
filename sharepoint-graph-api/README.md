## sharepoint-graph-api

A simple SharePoint API over the Microsoft Graph API

Example Usage:
``` javascript
import { SharepointGraphApi } from "sharepoint-graph-api"

const api = new SharepointGraphApi()

const childrenFiles = api.siteDriveItemChildren()
```

You will need to set these environment variables:
```
MS_APP_TENANT_ID
MS_APP_CLIENT_ID
MS_APP_SECRET
```