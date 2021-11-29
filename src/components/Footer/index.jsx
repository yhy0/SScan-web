import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
    const defaultMessage = 'yhy 出品';
    const currentYear = new Date().getFullYear();
    return (
        <DefaultFooter
            copyright={`${currentYear} ${defaultMessage}`}
            links={[
                {
                    key: 'yhy',
                    title: 'yhy',
                    href: 'https://github.com/yhy0',
                    blankTarget: true,
                },
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/yhy0/SScan',
                    blankTarget: true,
                },
                {
                    key: 'SScan',
                    title: 'SScan',
                    href: 'https://github.com/yhy0/SScan',
                    blankTarget: true,
                },
            ]}
        />
    );
};
