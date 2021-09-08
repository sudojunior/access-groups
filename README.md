# access-groups

[![Test](https://github.com/sudojunior/access-groups/actions/workflows/test.yml/badge.svg)](https://github.com/sudojunior/access-groups/actions/workflows/test.yml)
[![CodeQL](https://github.com/sudojunior/access-groups/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/sudojunior/access-groups/actions/workflows/codeql-analysis.yml)
![XO Code Style](https://badgen.net/badge/code%20style/XO/5ed9c7)
![Stargazers](https://badgen.net/github/stars/sudojunior/access-groups)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

An action to help determine what groups a user belongs to.

**This action does not create any GitHub entities or modify repositories.**

> Future releases may include a fail-if clause, which would act as a fast fail for that step or job.

## Usage

```yaml
- id: access
  uses: sudojunior/access-groups@main # or specific tag
  
- if: ${{ include(steps.access.outputs.groups, "repo collaborator") }}
  # only run if the user is a repo collaborator
  uses: actions/github-script@v4.0.2
  with:
    script: |
      await github.issues.createComment({
        issue_number: context.issue.number,
        body: "You're a collaborator on this repository!",
        owner: context.repo.owner,
        repo: context.repo.repo
      })
```

## Arguments

### GitHub Token {Future}

*Will allow for scope use of context info like organization and sponsors (maybe...).*

```yaml
- id: groups
  uses: sudojunior/access-groups@main
  with:
    github-token: ${{ github.token }} # as default
```

## Output

- `groups` is an array of access groups, as explained below.
- `highest-group` is the first element from `groups`.

### Explaination of `groups`

GitHub has a set of adaptive groups that exist under the hood to control permissions per repository and organization.

It is worth noting that the data for the query to determine other groups is there, but may not implemented yet.

### Access groups

- `site admin` = Covers both public deployment for GitHub Staff and Enterprise Deployment
- `repo owner` -> `site admin` = (If under user scope) is current actor **the owner** of this repository?
- `repo admin` -> `site admin` = is current actor an **admin** of this repository?
- `repo maintainer` -> `repo admin` = is current actor a **maintainer** of this repository?
- `repo triage` -> `repo maintainer` = is current actor a member of the **triage** team in this repository?
- `repo observer` -> `repo triage` = is current actor an **observer** to this repository?
- `bounty-hunter` = is current actor a [bounty hunter](https://bounty.github.com/)?
- `campus-expert` = is current actor a [campus expert](https://education.github.com/experts)? (may include alumni)
- `developer-program-member` = is current actor a [developer program member](https://developer.github.com/program/)?

#### Future

- (Scope) Organization
  - [ ] [Member (#8)](https://github.com/sudojunior/access-groups/issues/8)
  - [x] [Repo Admin (#11)](https://github.com/sudojunior/access-groups/issues/11)
  - [x] [Repo Maintainer (#12)](https://github.com/sudojunior/access-groups/issues/12)
  - [x] [Repo Triage (#14)](https://github.com/sudojunior/access-groups/issues/14)
  - [ ] [Read / Observer (#20)](https://github.com/sudojunior/access-groups/issues/20)
- (Scope) User
  - [ ] [Follower (#26)](https://github.com/sudojunior/access-groups/issues/26)
  - [x] [Campus Expert (#16)](https://github.com/sudojunior/access-groups/issues/16)
  - [x] [Bounty Hunter (#17)](https://github.com/sudojunior/access-groups/issues/17)
  - [x] [Developer Program Member (#18)](https://github.com/sudojunior/access-groups/issues/18)
- (Scope) Repository
  - [ ] [Stargazer (#25)](https://github.com/sudojunior/access-groups/issues/25)
  - [ ] [Repo Collaborator (#9)](https://github.com/sudojunior/access-groups/issues/9)
  - [ ] [Context Author {Issue / PR / Discussion?} (#15)](https://github.com/sudojunior/access-groups/issues/15)
  - [ ] [Repo Contributor (#27)](https://github.com/sudojunior/access-groups/issues/27)
- [ ] [Sponsor {User / Organization} (#19)](https://github.com/sudojunior/access-groups/issues/19)

#### Distant Future

*Using GraphQL notation, instead of group identifiers.*

- `isEmployee` = Checks if the actor is a GitHub Employee
- `isHireable` = Checks if the actor is Hireable
- `isGitHubStar` = Checks if the actor is part of the GitHub Star program
- `repositoriesContributedTo` = Checks if the actor has contributed to any repositories *other than their own, unless specified.
  (quantity required - `first` or `last`)

---

- Organization Team Member (wildcard)  
  Contains child teams, and team roles (MAINTAINER, MEMBER)  
  (Dangerous recursion with child teams)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/features/security"><img src="https://avatars.githubusercontent.com/u/27347476?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dependabot</b></sub></a><br /><a href="#maintenance-dependabot" title="Maintenance">🚧</a> <a href="#security-dependabot" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

### Packages

- [actions/toolkit](https://github.com/actions/toolkit) - API and Actions wrapper
- [VSCode](https://github.com/Microsoft/vscode) - Preferred editor
- [`xo`](https://github.com/xojs/xo) && [`ava`](https://github.com/avajs/ava) - CI linting and testing
- [@vercel/ncc](https://github.com/vercel/ncc) - Build process

## Known Issues

- Any file matching to `./tests/**/*.ts` has a warning exactly like the one below, it is unknown as to why this is happening - but it does not affect the build process.
  > Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.  
    The file does not match your project config: tests\main.test.ts.  
    The file must be included in at least one of the projects provided.

## Future consideration

- [Complete Security Checklist](https://github.com/sudojunior/access-groups/security)

### User / Repo context override (via argument)

*Currenly open in [#22](https://github.com/sudojunior/access-groups/issues/22)*

```yaml
- uses: sudojunior/access-groups@main
  with:
    user: ${{ github.actor }} # as default
    repo: ${{ github.repository }} # as default
```