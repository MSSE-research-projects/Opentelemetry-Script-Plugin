import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, {useEffect, useState} from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { loginUser } from '@/services/backend/user';
import styles from './index.less';
import {storeCredential} from "@/services/localStorage";

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
      const msg = await loginUser({ ...values });

      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = 'Login Succeeds';
        storeCredential(msg.token)
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query;
        history.push(redirect || '/');
        return;
      }

      setUserLoginState({ status: 'error' });
    } catch (error) {
      console.log(error)
      const defaultLoginFailureMessage = 'Login Failed'
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle="Login"
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {status === "error" && (
            <LoginMessage
              content="Invalid username or password."
            />

          )}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
