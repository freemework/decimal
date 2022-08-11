# Freemework

[Freemework](https://docs.freemework.org) is a general purposes framework with goal to provide cross language API. Learn API once - develop for any programming language.

## Freemework Decimal Library

This is workspace branch of **Freemework Decimal Library** multi project repository based on [orphan](https://git-scm.com/docs/git-checkout#Documentation/git-checkout.txt---orphanltnew-branchgt) branches.

Branches (sub-projects):

* `docs` - Sources of library [documentation](https://docs.freemework.org/decimal).
* `src-csharp` - C# Sources
* `src-dart` - Dart Sources
* `src-python` - Python Sources
* `src-typescript-bignumberjs` - TypeScript Sources wrapper around [bignumber.js](https://www.npmjs.com/package/bignumber.js)

## Get Started

```shell
git clone git@github.com:freemework/decimal.git freemework.decimal
cd freemework.decimal
for BRANCH in docs src-csharp src-dart src-python src-typescript-bignumberjs; do git worktree add "${BRANCH}" "${BRANCH}"; done
code "Freemework-Decimal.code-workspace"
```
