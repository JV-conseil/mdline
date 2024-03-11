# mdline

markdown to timeline tool.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install mdline

## Usage: CLI

    Usage
      $ mdline <input> [Options]

    Options
      --output, -o  Output path

    Examples
      $ mdline ./timeline.md -o timeline.html

## Usage: Module

```js
import { processText } from "mdline";
import * as parser from "@mdline/mdline-parser";
import * as formatter from "@mdline/mdline-formatter-html";
processText("...", {
    parser,
    formatter
})
.then(result => {
    console.log(result);
});
```

## Changelog

See [Releases page](https://github.com/JV-conseil/mdline/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/JV-conseil/mdline/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/JV-conseil](https://github.com/JV-conseil)
- [twitter/JVconseil](https://twitter.com/JVconseil)

## License

License EUPL 1.2 @ JV-conseil
