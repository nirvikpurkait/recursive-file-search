const fsProm = require("fs/promises");
const fs = require("fs");
const path = require("path");

function recursiveFileSearchAsync(
	initialPath,
	options = { ignore: [], filter: [] }
) {
	// check if options is an object literal
	if (
		typeof options !== "object" ||
		Array.isArray(options) ||
		options instanceof Set ||
		options instanceof Map
	)
		throw new Error(
			"options must be an object literal, undefined, or null"
		);

	// ------------------------IGNORE SECTION------------------------

	// initializing the output as an array
	let pathContents = [];
	// ignores files or folders by default
	let ignoringContents = ["node_modules"];

	// append ignoring file or folder provided by user
	if (options?.ignore) {
		ignoringContents = [...ignoringContents, ...options.ignore];
	}

	// if user provide to ignore by extension
	let ignoreByExt = [];
	for (eachContent of ignoringContents) {
		if (eachContent.split(".")[0] === "*") {
			let splitedContent = eachContent.split(".");
			ignoreByExt.push(splitedContent[splitedContent.length - 1]);
		}
	}

	// ------------------------IGNORE SECTION------------------------

	// ------------------------FILTER SECTION------------------------

	const filteringContents = [];
	if (options?.filter) {
		for (eachContent of options.filter) {
			if (eachContent.split(".")[0] === "*") {
				const splitedContent = eachContent.split(".");
				filteringContents.push(
					splitedContent[splitedContent.length - 1]
				);
			}
		}
	}

	// ------------------------FILTER SECTION------------------------

	// asynchronous operation for file searching
	const recusiveFileSearch = async (
		initialPath,
		ignoringContents,
		ignoreByExt
	) => {
		if (typeof initialPath !== "string") {
			throw new Error(`Path must be a string`);
		}
		if (!fs.lstatSync(initialPath).isDirectory()) {
			throw new Error(`You must provide a directory`);
		}

		// contains files and folders of a directory
		const dirContents = await fsProm.readdir(initialPath);

		for (let eachContent of dirContents) {
			// check if file or folder is specified to ignore
			if (
				ignoringContents.length !== 0 &&
				ignoringContents.includes(eachContent)
			)
				continue;
			// check if file is ignored by extension
			if (
				ignoreByExt.length !== 0 &&
				ignoreByExt.includes(
					eachContent.split(".")[eachContent.split(".").length - 1]
				)
			)
				continue;

			const newPath = path.join(initialPath, eachContent);

			// check if new path is directory or not
			// if directory call the function again if not add the content to the output
			const isDir = fs.lstatSync(newPath).isDirectory();
			if (isDir) {
				await recusiveFileSearch(
					newPath,
					ignoringContents,
					ignoreByExt
				);
			} else {
				pathContents.push(eachContent);
			}
		}

		if (filteringContents.length !== 0) {
			pathContents = pathContents.filter((eachContent) => {
				let splitedContentForFilter = eachContent.split(".");
				if (
					filteringContents.includes(
						splitedContentForFilter[
							splitedContentForFilter.length - 1
						]
					)
				)
					return eachContent;
			});
		}

		return pathContents;
	};
	// return the answer as a promise, promise value is an array
	return recusiveFileSearch(initialPath, ignoringContents, ignoreByExt);
}

module.exports = recursiveFileSearchAsync;
