# access-groups
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![build-test](https://github.com/sudojunior/access-groups/actions/workflows/test.yml/badge.svg)](https://github.com/sudojunior/access-groups/actions/workflows/test.yml)
![XO Code Style](https://badgen.net/badge/code%20style/XO/5ed9c7)
![Stargazers](https://badgen.net/github/stars/sudojunior/access-groups)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

An action to help determine what groups a user belongs to.

**This action does not create any GitHub entities or modify repositories.**

> Future releases may include a fail-if clause, which would act as a fast fail for that step or job.

## Arguments

### User context override {Considering}

*May override specific features, preventing intended flow.*

```yaml
- uses: sudojunior/access-groups@main
  with:
    user: ${{ github.actor }} # as default
```

## Output

- `groups` is an array of access groups, as explained below.
- `highest-group` is the first element from `groups`.

### Explaination of `groups`

GitHub has a set of adaptive groups that exist under the hood to control permissions per repository and organization.

Groups for v1 are currently being limited to the following:

- `site admin` - Actor is a Site Admin for this instance
- `repo owner` - Actor is the owner of the current repository

It is worth noting that the data for the query to determine other groups is there, just not implemented yet.

## Usage

```yaml
- uses: sudojunior/access-groups@main # or specific tag
```

### Access groups

| Group                          | Issue                                                        |
| ------------------------------ | ------------------------------------------------------------ |
| Organization Member            | [#8](https://github.com/sudojunior/access-groups/issues/8)   |
| Repo Collaborator              | [#9](https://github.com/sudojunior/access-groups/issues/9)   |
| Repo Admin (Organization)      | [#11](https://github.com/sudojunior/access-groups/issues/11) |
| Repo Maintainer (Organization) | [#12](https://github.com/sudojunior/access-groups/issues/12) |
| Repo Collaborator              | [#13](https://github.com/sudojunior/access-groups/issues/13) |
| Repo Triage (Organization)     | [#14](https://github.com/sudojunior/access-groups/issues/14) |
| Context Author (Issue / PR)    | [#15](https://github.com/sudojunior/access-groups/issues/15) |
| Campus Expert (Education)      | [#16](https://github.com/sudojunior/access-groups/issues/16) |
| Bounty Hunter (Security)       | [#17](https://github.com/sudojunior/access-groups/issues/17) |
| Developer Program Member       | [#18](https://github.com/sudojunior/access-groups/issues/18) |
| Sponsor (User / Organization)  | [#19](https://github.com/sudojunior/access-groups/issues/19) |
| Read / Observer (Organization) | [#20](https://github.com/sudojunior/access-groups/issues/20) |
| Stargazer                      | [#25](https://github.com/sudojunior/access-groups/issues/25) |
| Follower (User)                | [#26](https://github.com/sudojunior/access-groups/issues/26) |
| Repo Contributor               | [#27](https://github.com/sudojunior/access-groups/issues/27) |

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