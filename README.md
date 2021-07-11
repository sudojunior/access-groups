<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# access-groups

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

### Explaination of `groups`

GitHub has a set of adaptive groups that exist under the hood to control permissions per repository and organization.

Groups for v1 are currently being limited to the following:

- `site admin`
- `repo owner`

It is worth noting that the data for the query to determine other groups is there, just not implemented yet.

## Usage

```yaml
- uses: sudojunior/access-groups@main # or specific tag
```

### For Enterprise Instance (future)

*Unless I'm able to determine what enterprise instance is being used to run the action...*

```yaml
- uses: sudojunior/access-groups@main
  with:
    endpoint: https://api.github.com # as default, without last '/' as standard with octokit
```

## Future consideration

- User context override (via argument)
  ```yaml
  - uses: sudojunior/access-groups@main
    with:
      user: ${{ github.actor }} # as default
  ```