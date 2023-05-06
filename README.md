# Intro

This library gets all nested files form a directory.

<hr>

## Install

```
npm install recursive-file-search
```

<hr>

## Include the library

```
const {	recursiveFileSearchSync, recursiveFileSearchAsync} = require("recursive-file-search");
```

Before using the functions provided by the library take a look at the folder and file structure (we are going to use this structure as example later) -

```
    | gp-folder
    |   | p-folder
    |   |   | ch-folder
    |   |   |   | gch-folder
    |   |   |   | gch-file.html
    |   |   |   | gch-file.css
    |   |   |   | gch-file.js
    |   |   | ch-file.html
    |   |   | ch-file.css
    |   |   | ch-file.js
    |   | p-file.html
    |   | p-file.css
    |   | p-file.js
    | script.js
```

This library offers two types of functions -

-   #### Synchronous function
-   #### Asynchronous function

**To use the synchronous function -**

```
const yourVariableName = recursiveFileSearchSync(directory-path [, options])
```

In sync version, `yourVariableName` is an array consist of file names

**To use the asynchronous function -**

```
const yourVariableName = recursiveFileSearchAsync(directory-path [, options])
```

In async version, `yourVariableName` is a promise, whose value is an array consist of file names

As the asyc function returns a promise, we can chain it with `.then()` or `.catch()` method

### APIs

```
options = {
    ignore: [folder-name,file-name],
    filter: [*.file-ext,*.other-ext],
    defaultIgnore: false
}
```

<hr>

## Points to note

-   This library ignores **node_modules** folder by default, you can disable it by using API provided above.
-   Each element of the array of API have to be a string.
<hr>

## API use case

### `ignore` as API

```
const yourVariableName = recursiveFileSearchSync(directory-path , { ignore: ["ch-folder", "script.js", "*.html"]})
```

**output**

```
[ 'p-file.css', 'p-file.js', 'ch-file.css', 'ch-file.js' ]
```

```
const yourVariableName = recursiveFileSearchAsync(directory-path , { ignore: ["ch-folder", "script.js", "*.html"]})

yourVariableName
  .then((data) => console.log(data))
```

**output**

```
[ 'p-file.css', 'p-file.js', 'ch-file.css', 'ch-file.js' ]
```

### `filter` as API

```
const yourVariableName = recursiveFileSearchSync(directory-path , { filter: [ "*.html"]})
```

**output**

```
[ 'p-file.html', 'ch-file.html', 'gch-file.html' ]
```

```
const yourVariableName = recursiveFileSearchAsync(directory-path , { filter: ["*.html"]})

yourVariableName
  .then((data) => console.log(data))
```

**output**

```
[ 'p-file.html', 'ch-file.html', 'gch-file.html' ]
```

### `defaultIgnore` as API

If You want to disable the default ignore functionlity, you can use `defaultIgnore` API to disable it.

```
const yourVariableName = recursiveFileSearchSync(directory-path , { defaultIgnore: false})
```

```
const yourVariableName = recursiveFileSearchAsync(directory-path , { defaultIgnore: false})

yourVariableName
  .then((data) => console.log(data))
```

<hr>
