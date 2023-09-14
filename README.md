# qy-githooks

> Provide Git hooks, including commitlint and lint-staged, and strictly prohibit merging the testing branch into master, with ongoing additions...


# Install

```
npm install qy-githooks --save-dev
```

# Usage

Edit `package.json > ghi` script and run it once:

```sh
npm pkg set scripts.ghi="githooks install"

npm run ghi
```