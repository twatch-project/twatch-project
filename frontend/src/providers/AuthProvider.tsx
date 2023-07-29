import React, { useState } from 'react';
import { ChildProps, IAuthContext, UserRole } from '../types/auth.context';
import { host } from '../constant';
import { toast } from 'react-hot-toast';

export type AuthProviderProps = ChildProps;
type UserInfo = Pick<IAuthContext, 'userId' | 'token' | 'companyId'>;

type LoginFunc = IAuthContext['login'];
type LogoutFunc = IAuthContext['logout'];
type RegisterFunc = IAuthContext['register'];

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const retrieveUserData = (token: string) =>
  fetch(`${host}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    companyId: localStorage.getItem('companyId'),
  });
  const [userEmail, setUserEmail] = useState<string | null>('');

  const login: LoginFunc = async (username: string, password: string) => {
    const loginInfo = { username, password };

    try {
      const res = await fetch(`${host}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await res.json();
      if (data.statusCode === 404) {
        throw new Error(data.massage);
      }

      if (data.statusCode === 401) {
        throw new Error(data.message);
      }

      localStorage.setItem('token', data.accessToken);
      const accessToken = localStorage.getItem('token') || 'foo';

      const { user, company } = await retrieveUserData(accessToken);

      localStorage.setItem('companyId', company);
      localStorage.setItem('userId', user.userId);
      setUserEmail(user.email);
      setIsLoggedIn(true);
      setUserInfo(() => {
        const update = {
          userId: user.userId,
          token: accessToken,
          companyId: company,
        };
        return update;
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const logout: LogoutFunc = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');
    setIsLoggedIn(false);
    setUserInfo({ userId: null, token: null, companyId: null });
    toast.success('Successful Logout');
  };

  const register: RegisterFunc = async (username: string, password: string, role: UserRole, email: string) => {
    const registerInfo = { username, password, role, email };

    try {
      const res = await fetch(`${host}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
      });
      const status = await res.status;

      if (status === 401) {
        toast.error('THIS USERNAME IS USED ALREADY`');
        throw new Error(`This username is used already`);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, ...userInfo, logout, register, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
