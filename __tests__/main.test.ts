import {accessGroups, AccessGroup} from '../src/access'

interface TestGroup {
  key: string
  identifier: string
  expectFail: boolean
}

const tests: TestGroup[] = [
  {key: 'a github employee', identifier: 'github employee', expectFail: true},
  {key: 'hireable', identifier: 'hireable', expectFail: true},
  {key: 'a site admin', identifier: 'site admin', expectFail: true},
  {key: 'a github star', identifier: 'github star', expectFail: true},
  {
    key: 'a bounty hunter',
    identifier: 'github bounty hunter',
    expectFail: true
  },
  {key: 'a campus expert', identifier: 'campus expert', expectFail: true},
  {key: 'a sponsor', identifier: 'sponsor', expectFail: true},
  {
    key: 'a developer program member',
    identifier: 'github dev program member',
    expectFail: true
  } // idk
]

const {groups} = accessGroups(
  {
    user: 'sudojunior'
  },
  {
    viewer: {
      // mock user data, but true to what is expected
      isEmployee: false,
      isHireable: false,
      isSiteAdmin: false,
      isGitHubStar: false,
      isBountyHunter: false,
      isCampusExpert: false,
      isSponsoringViewer: false,
      isDeveloperProgramMember: false
    }
  }
)

for (const {key, identifier, expectFail} of tests) {
  test('user is ' + key, () => {
    let outcome = groups.includes(identifier as AccessGroup)

    if (expectFail) outcome = !outcome

    expect(outcome).toBe(true)
  })
}
