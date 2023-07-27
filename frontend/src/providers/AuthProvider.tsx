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

  const login: LoginFunc = async (username: string, password: string) => {
    const loginInfo = { username, password };

    try {
      const res = await fetch(`${host}/auth/login`, {
        method: 'Post',
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

      const { user } = await retrieveUserData(accessToken);
      console.log(user.company.companyId);
      localStorage.setItem('companyId', user.company.companyId);
      localStorage.setItem('userId', user.userId);

      setIsLoggedIn(true);
      setUserInfo(() => {
        const update = {
          userId: user.userId,
          token: accessToken,
          companyId: user.company.companyId,
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
      const data = await res.json();

      if (data.statusCode === 401) {
        throw new Error(data.message);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, ...userInfo, logout, register }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
