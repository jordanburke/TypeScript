import { Drive, DriveItem, Site } from "@microsoft/microsoft-graph-types"
import { GraphArray, GraphClient } from "./graph-client"

export class SharepointGraphApi {

  private client = GraphClient()

  public async sites(siteId = ""): Promise<Site | GraphArray<Site>> {
    return (await this.client.api(`/sites/${siteId}`).get()) as Site | GraphArray<Site>
  }

  async siteDrives(siteId: string, driveId = ""): Promise<Drive | GraphArray<Drive>> {
    return (await this.client.api(`/sites/${siteId}/drives/${driveId}`).get()) as Drive | GraphArray<Drive>
  }

  async siteDrive(siteId: string): Promise<Drive> {
    return (await this.client.api(`/sites/${siteId}/drive`).get()) as Drive
  }

  async siteDriveItems(siteId: string): Promise<GraphArray<DriveItem>> {
    return (await this.client.api(`/sites/${siteId}/drive/root/children`).get()) as GraphArray<DriveItem>
  }

  async siteDriveItemChildren(siteId: string, path: string): Promise<GraphArray<DriveItem>> {
    return (await this.client.api(`/sites/${siteId}/drive/root:/${path}:/children`).get()) as GraphArray<DriveItem>
  }

  async siteDriveItemContent(siteId: string, path: string, fileName: string): Promise<any> {
    return (await this.client.api(`/sites/${siteId}/drive/root:/${path}/${fileName}:/content`).get()) as any
  }

  async siteDriveUploadFile(siteId: string, path: string, fileName: string, content: string) {
    // We can remove this await or make it optional if we need to speed this up!
    const result = await new Promise(async (resolve) => {
      const contentPath = `/sites/${siteId}/drive/root:/${path}/${fileName}:/content`
      return await this.client.api(contentPath).put(content, resolve)
    })
    return { name: fileName, success: result || true }
  }
}
