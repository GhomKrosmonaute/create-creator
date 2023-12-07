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

## Create and publish a boilerplate creator

I would take as an example the boilerplate of a simple website: [GhomKrosmonaute/Vitrined](https://github.com/GhomKrosmonaute/Vitrined)

1. Generate the creator with `npm create @ghom/creator vitrined-CLI GhomKrosmonaute/Vitrined`
2. Move to the creator folder `cd vitrined-CLI`
3. Optionally check if everything is correct in the generated **package.json**
4. Publish the creator with `npm publish --access public`
5. It's done! Then your boilerplate creator can be tested with `npm create vitrined`
