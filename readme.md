# @ghom/create-creator

Boilerplate for `npm create <...>` CLI creation.

## Usage

```bash
npm create @ghom/creator <install-path> <git-repository> [package-name]
```

## Example

For example, if you want to create a npm creator for the ``user/todo`` boilerplate named ``create-todo``, you can use the following command:

```bash
npm create @ghom/creator ./my-todo user/todo
```

And if you want to force the created package name to be ``@user/create-todo``, you can use the following command:

```bash
npm create @ghom/creator ./my-todo user/todo @user/create-todo
```
