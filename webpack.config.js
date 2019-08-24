const path = require("path")

module.exports = {
    mode: "production",
    entry: "./main.js",
    optimization: {
        minimizer: [
            new (require("terser-webpack-plugin"))({
                parallel: false  // Work around a bug in terser-webpack-plugin that shows bad stack traces.
            })
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "main.out.js"
    }
};
