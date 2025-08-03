# NodeJS Blogtool
STB----
Use `await` because if we try to access `changes` immedately after loading CSV and populating `changes`, `changes` will still be empty.


END STB---

*Note:* `body-parser` is no longer used for the common scenario of passing simple data through `POST` in a form. For this, the latest versions of `Express` will handle it. Just use `app.use(express.json());`.
