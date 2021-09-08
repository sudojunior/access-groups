import t from 'ava'
import { context } from '@actions/github'

import { accessGroups } from '../src/access'
import { DataQuery } from '../src/util'

const ENV = process.env;

// Should figure out a way to do matrix-like testing offline...
// ... and to write tests correctly

const mockData: DataQuery = {
	user: {
		isSiteAdmin: false,
		isBountyHunter: false,
		isCampusExpert: false,
		isDeveloperProgramMember: true
	},
	repository: {
		isInOrganization: false,
		owner: {
			__typename: "User",
			login: "sudojunior",
			hasSponsorsListing: true,
			isSponsoredBy: false
		},
		collaborators: {
			edges: [
				{
					node: {
						login: "sudojunior"
					},
					permission: "ADMIN"
				}
			]
		}
	}
}

t('actor is not a site admin', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(!groups.includes('site admin'));
});
t('actor is repository owner', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(groups.includes('repo owner'));
});

t("actor's highest group is 'repo owner'", t => {
	const { highestGroup } = accessGroups(context, mockData);

	t.is(highestGroup, 'repo owner');
});

t.todo('actor is a repository collaborator');
// #region organization permissions
t.todo('actor is an organization member (skip if non-org owner)');
t.failing('actor is a repository admin', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(groups.includes('repo admin'));
});
t.failing('actor is a repository maintainer', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(groups.includes('repo maintainer'));
});
t.failing('actor is a repository triage member', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(groups.includes('repo triage'));
});
t.todo('actor is author of issue / pull request in the current scope');
// #endregion
t('actor is not a campus expert', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(!groups.includes('campus-expert'));
});
t('actor is not a bounty hunter', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(!groups.includes('bounty-hunter'));
});
t('actor is a developer program member', t => {
	const { groups } = accessGroups(context, mockData);

	t.assert(groups.includes('developer-program-member'));
});
t.todo(
	'actor is a sponsor to the owner of the repository (or to deligated member?)'
);
t.todo('actor is an observer (private repository read access)');
t.todo('actor is a stargazer to the repository');
