const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options
      }
    ]
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include,
                exclude,

                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    }
});

exports.extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        filename: '[name].css'
    });

    return {
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use,
                        fallback: 'style-loader'
                    })
                }
            ]
        },
        plugins: [ plugin ]
    };
};

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                include, 
                exclude,
                options
            }
        ]
    }
});

exports.loadJavascript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include,
                exclude,

                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }
        ]
    }
});
