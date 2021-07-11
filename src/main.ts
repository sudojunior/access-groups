import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'

import {accessGroups} from './access'

async function run(): Promise<void> {
  try {
    const user = context.actor // core.getInput('user') - future
    const token: string = core.getInput('github-token') // mirroring 'actions/github-script'

    // const endpoint = core.getInput('endpoint')

    const octokit = getOctokit(token)

    const data = octokit.request(
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

    const {groups} = await accessGroups(
      {
        // endpoint
        user
      },
      data as any
    )

    core.debug(`${user} has access to ${groups.join(', ')}`)

    core.setOutput('groups', groups)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
