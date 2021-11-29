import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';
import token from '@/utils/token';

const LoginMessage = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login = () => {
    const [userLoginState, setUserLoginState] = useState({});
    const [type, setType] = useState('account');
    const { initialState, setInitialState } = useModel('@@initialState');

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();

        if (userInfo) {
            await setInitialState((s) => ({ ...s, currentUser: userInfo }));
        }
    };

    const handleSubmit = async (values) => {
        try {
            // 登录
            const msg = await login({ ...values, type });

            if (msg.code === 1) {
                const defaultLoginSuccessMessage = '登录成功！';
                token.save(msg.data.token);
                message.success(defaultLoginSuccessMessage);
                await fetchUserInfo();
                /** 此方法会跳转到 redirect 参数所在的位置 */

                if (!history) return;
                const { query } = history.location;
                const { redirect } = query;
                history.push(redirect || '/');
                return;
            }

            console.log(msg); // 如果失败去设置用户错误信息

            setUserLoginState(msg);
        } catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            message.error(defaultLoginFailureMessage);
        }
    };

    const { code, type: loginType, error } = userLoginState;
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" src="/dist/logo.svg" />}
                    title="SScan"
                    subTitle={'SScan 信息收集平台'}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane key="account" tab={'账户密码登录'} />
                    </Tabs>

                    {code === 0 && error !== '' && <LoginMessage content={'错误的用户名和密码'} />}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={styles.prefixIcon} />,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名是必填项！',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={styles.prefixIcon} />,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: '密码是必填项！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码 ?
                        </a>
                    </div>
                </LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
