import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import { OctokitResponse } from '@octokit/types';

import { accessGroups } from './access';
import { DataQuery, logAndExport } from './util';

async function run(): Promise<void> {
	try {
		const { actor } = context; // core.getInput('user') - future
		const { owner, repo } = context.repo;

		const token: string = core.getInput('github-token', { required: false });

		const octokit = getOctokit(token, {
			baseUrl: context.apiUrl,
		});

		const { data }: OctokitResponse<DataQuery> = await octokit.graphql(
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

		const { groups, highestGroup } = accessGroups(context, data);

		logAndExport('groups', groups, `${context.actor} has access to %s`);
		logAndExport('highest-group', highestGroup, `${context.actor} groups.first -> %s`);
	} catch (err: unknown) {
		const error = err as Error
		
		if (error.stack) {
			core.debug(error.stack);
		}
		core.setFailed(error.message);
	}
}

void run();
