const Timestamp = new Date().getTime();
module.exports = {

    configureWebpack: config => {
        // 解决打包上线后的缓存问题
        config.output.filename(`static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`).end()
        config.output.chunkFilename(`static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`).end()
        // 生产环境去掉console信息
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },

    publicPath: './',
    outputDir: './dist',
    assetsDir: "./dist",
    productionSourceMap: false,
    filenameHashing: false,
    lintOnSave: false,
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            "/Api": {
                target: process.env.NODE_ENV,
                ws: true,
                changeOrigin: true,
                secure: false, // 如果是https接口，需要配置这个参数
                pathRewrite: {
                    "^/Api": "",
                },
            },
        },
    }
}
