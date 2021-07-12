import t from 'ava'
import { context } from '@actions/github'

import { accessGroups } from '../src/access'

const ENV = process.env

// Should figure out a way to do matrix-like testing offline...
// ... and to write tests correctly

const mockUser = {
	login: "sudojunior",
	__typename: "User",
	isSiteAdmin: false
}

const mockData = {
	repository: {
		owner: mockUser,
	}
}

t.failing('actor is not a site admin', expect => {
	const { groups } = accessGroups(context, mockData);

	expect.assert(!groups.includes('site admin'))
	expect.fail("Check disabled")
})

t('actor is repository owner', expect => {
	const { groups } = accessGroups(context, mockData);

	expect.log(`${mockData.repository.owner.login} (repo owner) -> ${context.actor} (context actor)`)
	expect.assert(groups.includes('repo owner'))
})

t("actor's highest group is 'repo owner'", expect => {
	const { highestGroup } = accessGroups(context, mockData);

	expect.is(highestGroup, 'repo owner')
})

t.todo('actor is a repository collaborator')
// #region organization permissions
t.todo('actor is an organization member (skip if non-org owner)')
t.todo('actor is a repository admin')
t.todo('actor is a repository maintainer')
t.todo('actor is a repository triage member')
t.todo('actor is author of issue / pull request in the current scope')
// #endregion
t.todo('actor is a campus expert')
t.todo('actor is a bounty hunter')
t.todo('actor is a developer program member')
t.todo(
	'actor is a sponsor to the owner of the repository (or to deligated member?)'
)
t.todo('actor is an observer (private repository read access)')
t.todo('actor is a stargazer to the repository')
