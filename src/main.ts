import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github';
import {OctokitResponse} from '@octokit/types';

import {accessGroups} from './access';
import {DataQuery, logAndExport} from './util';

async function run(): Promise<void> {
	try {
		const {actor} = context; // Core.getInput('user') - future
		const {owner, repo} = context.repo;

		const token: string = core.getInput('github-token', {required: false});

		const octokit = getOctokit(token, {
			baseUrl: context.apiUrl,
		});

		const {data}: OctokitResponse<DataQuery> = await octokit.graphql(
			`
			query accessData($owner: String!, $repo: String!) {
				repository(owner: $owner, name: $repo) {
					owner {
						...Access
					}
				}
			}
			
			fragment Access on User {
				login
				isSiteAdmin
				__typename
			}
			`,
			{
				owner,
				repo,
			},
		);

		core.debug(`Access Data: ${JSON.stringify(data)}`);

		const {groups, highestGroup} = accessGroups(context, data);

		logAndExport('groups', groups, `${actor} has access to %s`);
		logAndExport('highest-group', highestGroup, `${actor} groups.first -> %s`);
	} catch (error: unknown) {
		core.setFailed((error as Error).message);
	}
}

void run();
