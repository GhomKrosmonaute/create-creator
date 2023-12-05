#!/usr/bin/env node

const path = require("path")
const fs = require("fs")
const exec = require("child_process").exec

const [_installPath, gitRepository, _packageName] = process.argv.slice(2)

if (!_installPath) {
  console.error("Please specify a directory")
  return process.exit(1)
}

if (!gitRepository) {
  console.error("Please specify a git repository")
  return process.exit(1)
}

if (!/^\S+\/\S+$/.test(gitRepository)) {
  console.error(
    "Please specify a valid git repository with format: <username>/<repository>",
  )
  return process.exit(1)
}

const installPath = path.resolve(_installPath)
const packageName =
  _packageName || `create-${path.basename(installPath).replace("create-", "")}`

if (!fs.existsSync(installPath)) {
  fs.mkdirSync(installPath, { recursive: true })
}

const template = (str) =>
  str
    .replace(/package-name-without-create/g, packageName.replace("create-", ""))
    .replace(
      /right-package-name/g,
      packageName.includes("/") ? packageName.split("/")[1] : packageName,
    )
    .replace(/right-git-repository/g, gitRepository.split("/").slice(-1)[0])
    .replace(/left-git-repository/g, gitRepository.split("/")[0])
    .replace(/package-name/g, packageName)
    .replace(/git-repository/g, gitRepository)

const binJs = template(
  fs.readFileSync(path.join(__dirname, "template", "bin.js"), "utf8"),
)
const packageJson = template(
  fs.readFileSync(path.join(__dirname, "template", "package.json"), "utf8"),
)
const readme = template(
  fs.readFileSync(path.join(__dirname, "template", "readme.md"), "utf8"),
)
const gitignore = fs.readFileSync(
  path.join(__dirname, "template", "template.gitignore"),
  "utf8",
)

fs.writeFileSync(path.join(installPath, "bin.js"), binJs)
fs.writeFileSync(path.join(installPath, "package.json"), packageJson)
fs.writeFileSync(path.join(installPath, "readme.md"), readme)
fs.writeFileSync(path.join(installPath, ".gitignore"), gitignore)

// install dependencies
exec(`cd "${installPath}" && npm install`, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
    return process.exit(1)
  }
  console.log(stdout)
  console.log(stderr)
  console.log(`Successfully installed "${gitRepository}" in "${installPath}"`)
  process.exit(0)
})
