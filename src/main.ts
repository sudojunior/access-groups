import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github';

import {accessGroups} from './access';
import {DataQuery, logAndExport} from './util';

async function run(): Promise<void> {
	try {
		const {actor} = context; // Core.getInput('user') - future
		const {owner, repo} = context.repo;

		if (actor.endsWith('[bot]')) {
			core.info('Forceful termination, actor is a bot (variables are empty).');
			core.setOutput('groups', []);
			core.setOutput('highest-group', '');
			process.exit();
		}

		const token: string = core.getInput('github-token');

		const octokit = getOctokit(token);

		const data: DataQuery = await octokit.graphql(
			`
			query accessData($owner: String!, $actor: String!, $repo: String!) {
				user(login: $actor) {
					isSiteAdmin
					isBountyHunter
					isCampusExpert
					isDeveloperProgramMember
				}
				repository(owner: $owner, name: $repo) {
					isInOrganization
					
					owner {
						__typename
						
						... on User {
							login
							hasSponsorsListing
							isSponsoredBy(accountLogin: $actor)
						}
						
						... on Organization {
							hasSponsorsListing
							isSponsoredBy(accountLogin: $actor)
							membersWithRole {
								edges {
									role
									node {
										login
									}
								}
							}
						}
					}
					collaborators(query: $actor) {
						edges {
							node {
								login
							}
							permission
						}
					}
				}
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

		logAndExport('groups', groups, `${actor} has access to %s`);
		logAndExport('highest-group', highestGroup, `${actor} groups.first -> %s`);
	} catch (error: unknown) {
		core.setFailed((error as Error));
	}
}

void run();
