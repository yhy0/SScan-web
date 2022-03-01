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
        name: 'Nuclei',
        icon: '/dist/nuclei.svg',
        path: '/nuclei',
        component: './Nuclei',
    },
    {
        name: 'Xray',
        icon: '/dist/xray.svg',
        path: '/xray',
        component: './Xray',
    },
    {
        name: '黑名单',
        icon: '/dist/blacklist.svg',
        path: '/blacklist',
        component: './Blacklist',
    },
];
