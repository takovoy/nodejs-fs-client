# nodejs-fs-client
Node JS FileSystem client

Example:

```javascript
const path = require("path");
const basePath = path.join(__dirname, "/../../");
const fsClient = new FSClient(basePath);

async function someFileActionFunc() {
    await fsClient.createFile("some/relative/path.ext", "some content");
    await fsClient.updateFile("some/relative/path.ext", "some new content");
    return await fsClient.readFile("some/relative/path.ext");
}

someFileActionFunc()
    .then(content => console.log(content)) // some new content
    .catch(fsError => console.error(fsError)); // NodeJS error about open, write or read file
```
