import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github';
import {OctokitResponse} from '@octokit/types';

import {accessGroups} from './access';
import {DataQuery, logAndExport} from './util';

async function run(): Promise<void> {
	try {
		const {actor} = context; // core.getInput('user') - future
		const {owner, repo} = context.repo;

		const token: string = core.getInput('token', {required: true});

		const octokit = getOctokit(token, {
			baseUrl: context.apiUrl,
		});

		const {data}: OctokitResponse<DataQuery> = await octokit.graphql(
			`
      query data {
        user(login: $actor) {
          ...Access
        }
        repository(owner: $owner, name: $repo) {
          collaborators(query: $actor) {
            ...Access
          }
        }
      }
      
      fragment Access on User {
        login
        isViewer
        isSiteAdmin
      }
      `,
			{
				owner,
				repo,
				actor,
			},
		);

		core.debug(`Access Data: ${JSON.stringify(data)}`);

		const {groups, highestGroup} = accessGroups(context, data);

		logAndExport('groups', groups, `${context.actor} has access to %s`);
		logAndExport('highest-group', highestGroup, `${context.actor} groups.first -> %s`);
	} catch (error: unknown) {
		core.setFailed((error as Error).message);
	}
}

void run();
