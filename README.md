# access-groups

[![Action Status](https://github.com/sudojunior/access-groups)](https://github.com/sudojunior/access-groups/workflows/build-test/badge.svg)
![XO Code Style](https://badgen.net/badge/code%20style/XO/5ed9c7)
![Stargazers](https://badgen.net/github/stars/sudojunior/access-groups)

An action to help determine what groups a user belongs to.

**This action does not create any GitHub entities or modify repositories.**

> Future releases may include a fail-if clause, which would act as a fast fail for that step or job.

## Context

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

## Future consideration

### User / Repo context override (via argument)

*Currenly open in [#22](https://github.com/sudojunior/access-groups/issues/22)*

```yaml
- uses: sudojunior/access-groups@main
  with:
    user: ${{ github.actor }} # as default
    repo: ${{ github.repository }} # as default
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

## Credits

*A place to give my thanks to direct and indirect contributors.* ❤

### Packages

- [actions/toolkit](https://github.com/actions/toolkit) - API and Actions wrapper
- [VSCode](https://github.com/Microsoft/vscode) - Preferred editor
- [`xo`](https://github.com/xojs/xo) && [`ava`](https://github.com/avajs/ava) - CI linting and testing
- [@vercel/ncc](https://github.com/vercel/ncc) - Build process