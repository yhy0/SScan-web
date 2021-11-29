import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text >{children}</Typography.Text>
        </code>
    </pre>
);

const Welcome = () => {
    return (
        <PageContainer>
            <Card>
                <Typography.Title
                    level={2}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <SmileTwoTone />
                    <a href="https://github.com/yhy0/SScan"
                        rel="noopener noreferrer"
                        target="__blank"> SScan </a>
                    <HeartTwoTone twoToneColor="#eb2f96" /> yhy
                </Typography.Title>
                <CodePreview>子域名查询 subfinder被动获取 + shuffledns 主动爆破</CodePreview>
                <CodePreview>端口扫描 masscan + nmap</CodePreview>
                <CodePreview>集成 nuclei 进行漏扫</CodePreview>
                <CodePreview>黑名单ip，不进行端口扫描</CodePreview>
                <CodePreview>使用 dismap 进行指纹识别</CodePreview>
                <CodePreview>cdn 自动跳过端口扫描, CDN IP 判断方法</CodePreview>
                <CodePreview>钉钉机器人通知，需要在配置文件中配置token和Secret</CodePreview>
                <CodePreview>子域名接管检测subjack</CodePreview>
                <CodePreview>循环扫描</CodePreview>
                <CodePreview>扫描结果导出csv</CodePreview>

            </Card>
        </PageContainer>
    );
};

export default Welcome;
