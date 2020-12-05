// module.exports = {
//     devServer: {
//         port: 8090,
//         proxy: {
//             '/api': {
//                 // 此处的写法，我访问的是http://localhost:8080/api/dataHome.json设置代理后，axios请求不需要把域名带上，只需要把路径前面加上 /api 即可。
//                 target: 'http://localhost:8002/',
//                 // 允许跨域
//                 changeOrigin: true,
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }

const os = require('os')

const netWorkInterfaces = os.networkInterfaces()
var localIp = ''
Object.keys(netWorkInterfaces).map(i => {
    if (netWorkInterfaces[i].length > 0) {
        netWorkInterfaces[i].map((x, k) => {
            if (k === 1 && x.address !== '127.0.0.1') {
                localIp = x.address
            }
        })
    }
})

module.exports = {
    devServer: {
        host: localIp,
        port: 8090, // 端口号
        https: false,
        open: false, //配置自动启动浏览器

        // 配置多个代理
        proxy: {
            '/api': {
                pathRewrite: {
                    '^/api': ''
                },
                // 此处的写法，我访问的是http://localhost:8080/api/dataHome.json设置代理后，axios请求不需要把域名带上，只需要把路径前面加上 /api 即可。
                target: 'http://localhost:8002/',
                //允许跨域
                changeOrigin: true,
                ws: true,
            }
        }
    }
};