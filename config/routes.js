export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user',
                routes: [
                    {
                        name: 'login',
                        path: '/user/login',
                        component: './user/Login',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        name: 'SScan',
        icon: '/dist/logo.svg',
        path: '/welcome',
        component: './Welcome',
    },
    {
        path: '/',
        component: './Welcome',
    },
    {
        path: '/404',
        component: './404',
    },
    {
        name: '资产管理',
        icon: '/dist/assets.svg',
        path: '/assets',
        component: './Aassets',
    },
    {
        name: '子域名管理',
        icon: '/dist/subdomains.svg',
        path: '/subdomains',
        component: './Subdomains',
    },
    {
        name: '扫描信息',
        icon: '/dist/scaninfo.svg',
        path: '/scanInfo',
        component: './ScanInfo',
    },
    {
        name: 'Vul',
        icon: '/dist/nuclei.svg',
        path: '/Vul',
        component: './Vul',
    },
    // {
    //     name: '黑名单',
    //     icon: '/dist/blacklist.svg',
    //     path: '/blacklist',
    //     component: './Blacklist',
    // },
    {
        name: '设置',
        icon: '/dist/blacklist.svg',
        path: '/setting',

        routes: [
            {
                name: '黑名单',
                path: '/setting/Blacklist',
                // icon: '/dist/blacklist.svg',        // 沙雕 ant design，二级菜单不显示 icon 竟然是新功能，也没个详细文档让我配置
                component: './Setting/Blacklist',
            },
            {
                name: 'CDN',
                path: '/setting/CDN',
                // icon: '/dist/blacklist.svg',
                component: './Setting/CDN',
            },
        ],
    },
];
