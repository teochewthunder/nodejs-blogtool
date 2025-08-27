# NodeJS Blogtool
Tool used to convert my personal shorthand to HTML-friendly format.

*app.js*
- `loadChanges()`:
  - `async` function that calls `loadFile()`, then assigns the resultant array to `changes`.
  - (from this point on, `changes` is then used to make replacements in input.)
- `loadFile(filepath)`:
  - `async` function that reads the CSV file specified
  - has a parameter, `filepath`, which is the path of the CSV file to be processed.
  - returns a promise that uses `fs` to read the file as a CSV, and return an array of all the rows read.
  - each row read runs the `unescapeSpecialChars()` function on the `find` column because some of the data is escaped.
- `unescapeSpecialChars(str)`:
  - has a parameter, `str`, which is the string to be processed.
  - escaped characters are replaced with their unescaped equivalents.

*Note:* `body-parser` is no longer used for the common scenario of passing simple data through `POST` in a form. For this, the latest versions of `Express` will handle it. Just use `app.use(express.json());`.
