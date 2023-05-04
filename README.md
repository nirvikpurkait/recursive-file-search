# Intro

This library gets all nested files form a directory

# Upcoming features

-   Filter all files with the help of extension
    name

# To install this library execute the follwoing command

```
npm install recursive-file-search
```

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

-   Synchronous function
-   Asynchronous function

**To use the synchronous function -**

```
const yourVariableName = recursiveFileSearchSync(directory-path [, options])
```

In sync version `yourVariableName` is an array consist of file names

**To use the asynchronous function -**

```
const yourVariableName = recursiveFileSearchAsync(directory-path [, options])
```

In async version `yourVariableName` is a promise, whose value is an array consist of file names

As the asyc function returns a promise, we can chain it with `.then()` or `.catch()` method

**The option is an object that can have multiple values**

```
options = {
    ignore: [folder-name,file-name]
}
```

## Points to note

This library ignores **node_modules** folder by default

# Use cases

```
const yourVariableName = recursiveFileSearchSync(directory-path , { ignore: ["ch-folder", "script.js", "*.html"]})
```

**ans**

`[ 'p-file.css', 'p-file.js', 'ch-file.css', 'ch-file.js' ]`

```
const yourVariableName = recursiveFileSearchAsync(directory-path , { ignore: ["ch-folder", "script.js", "*.html"]})

yourVariableName
  .then((data) => console.log(data))
```

**ans**

`[ 'p-file.css', 'p-file.js', 'ch-file.css', 'ch-file.js' ]`
