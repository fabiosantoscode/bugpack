const path = require("path")

module.exports = {
    mode: "production",
    entry: "./bug.js",
    optimization: {
        minimizer: [
            new (require("terser-webpack-plugin"))({
                parallel: false,
                terserOptions: {
                    ecma: 8,
                    keep_classnames: true,
                    keep_fnames: true,
                },
            })
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bug.out.js"
    }
}
