const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /\.css$/, 
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "url-loader" 
            }
        ]
    },
    devServer: {
        contentBase: 'dist', 
        port: 3000,
        overlay: true
    },
    resolve:{
        extensions: [
            '.js', 
            '.jsx'
        ]
    }
}