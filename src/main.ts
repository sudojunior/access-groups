import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github';
import {OctokitResponse} from '@octokit/types';

import {accessGroups} from './access';
import {DataQuery, logAndExport} from './util';

async function run(): Promise<void> {
	try {
		console.log(`Actor: ${context.actor}`);
		console.log(`Repo: ${JSON.stringify(context.repo)}`);

		const {actor} = context; // Core.getInput('user') - future
		const {owner, repo} = context.repo;

		const token: string = core.getInput('github-token', {required: false});

		const octokit = getOctokit(token, {
			baseUrl: context.apiUrl,
		});

		const {data}: OctokitResponse<DataQuery> = await octokit.graphql(
			`
			query accessData($owner: String!, $repo: String!, $user: String!) {
				user(login: $user) {
					...Access
				}
				repository(owner: $owner, name: $repo) {
					owner {
						...Access
					}
					collaborators(query: $user) {
						edges {
							node {
								...Access
							}
							permission
						}
					}
				}
			}
			
			fragment Access on User {
				login
				isViewer
				isSiteAdmin
				__typename
			}
			`,
			{
				owner,
				repo,
				user: actor,
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
