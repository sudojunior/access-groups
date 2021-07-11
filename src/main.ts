import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'
import {OctokitResponse} from '@octokit/types'

import {AccessData, accessGroups} from './access'

async function run(): Promise<void> {
  try {
    const user = context.actor // core.getInput('user') - future
    const repo = context.payload.repository?.full_name
    const token: string = core.getInput('github-token') // mirroring 'actions/github-script'

    // const endpoint = core.getInput('endpoint')

    const octokit = getOctokit(token)

    const {data}: OctokitResponse<AccessData> = await octokit.request(
      `
      {
        viewer {
          isViewer
          isEmployee
          isHireable
          isSiteAdmin
          isGitHubStar
          isBountyHunter
          isCampusExpert
          isSponsoringViewer
          isDeveloperProgramMember
        }
      }
      `
    )

    core.debug(`Access Data: ${JSON.stringify(data)}`)

    const {groups} = accessGroups(
      {
        // endpoint
        user,
        repo
      },
      data
    )

    core.debug(`${user} has access to ${groups.join(', ')}`)

    core.setOutput('groups', groups)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
