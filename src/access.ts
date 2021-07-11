interface AccessOptions {
  // endpoint: string
  user: string
  repo: string
}

// {scope}_{group} = {scope} {group}

export enum AccessGroup {
  site_admin = 'site admin',
  repo_owner = 'repo owner'
}

export interface AccessData {
  viewer: {
    isEmployee: boolean
    isHireable: boolean
    isSiteAdmin: boolean
    isGitHubStar: boolean
    isBountyHunter: boolean
    isCampusExpert: boolean
    isSponsoringViewer: boolean
    isDeveloperProgramMember: boolean
  }
}

interface AccessResponse {
  groups: AccessGroup[]
}

const defaultOptions = {
  // endpoint: "https://api.github.com"
}

export function accessGroups(
  options: Partial<AccessOptions> = {},
  data: AccessData
): AccessResponse {
  options = Object.assign(defaultOptions, options)

  const groups: Set<AccessGroup> = new Set()

  //#region setup
  const viewer = data.viewer
  //#endregion

  //#region site_admin
  if (viewer.isSiteAdmin) {
    groups.add(AccessGroup.site_admin)
  }
  //#endregion

  //#region repo_owner

  return {groups: [...groups]}
}
