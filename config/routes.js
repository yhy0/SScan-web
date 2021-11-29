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
        name: 'welcome',
        icon: 'smile',
        path: '/welcome',
        component: './Welcome',
    },
    {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        component: './Admin',
        routes: [
            {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
            },
            {
                component: './404',
            },
        ],
    },
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        name: '资产管理',
        icon: 'FireOutlined',
        path: '/assets',
        component: './Aassets',
    },
    {
        name: '子域名管理',
        icon: 'smile',
        path: '/subdomains',
        component: './Subdomains',
    },
    {
        name: '扫描信息',
        icon: 'StarOutlined',
        path: '/scanInfo',
        component: './ScanInfo',
    },
    {
        name: '黑名单IP',
        icon: 'BugOutlined',
        path: '/blacklist',
        component: './Blacklist',
    },
];
