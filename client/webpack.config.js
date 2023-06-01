module.exports = {
    target: "node",
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                include: [Path.join(__dirname, "src")],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};