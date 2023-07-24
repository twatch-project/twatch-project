import React, { useState } from 'react';
import { ChildProps, IAuthContext, UserRole } from '../types/auth.context';
import { host } from '../constant';

export type AuthProviderProps = ChildProps;
type UserInfo = Pick<IAuthContext, 'userId' | 'token'>;

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

      if (data.statusCode === 401) {
        throw new Error(data.message);
      }

      localStorage.setItem('token', data.token);
      const accessToken = localStorage.getItem('token') || 'foo';

      const { userId } = await retrieveUserData(accessToken);

      localStorage.setItem('userId', userId);

      setIsLoggedIn(true);
      setUserInfo(() => {
        const update = {
          userId,
          token: accessToken,
        };
        return update;
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const logout: LogoutFunc = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    setUserInfo({ userId: null, token: null });
    // toast.success('Successful Logout')
  };

  const register: RegisterFunc = async (username: string, password: string, role: UserRole, email: string) => {
    const registerInfo = { username, password, role, email };
    console.log(registerInfo);

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

  // const CompanyProfile: CompanyProfileFunc = async (
  //   companyName: string,
  //   companyRegistration: string,
  //   body: string,
  //   imageContent: string,
  //   address: string,
  //   sub_district: string,
  //   district: string,
  //   province: string,
  //   contract: string,
  //   tag: string,
  // ) => {
  //   const CompanyProfileInfo = {
  //     companyName,
  //     companyRegistration,
  //     body,
  //     imageContent,
  //     address,
  //     sub_district,
  //     district,
  //     province,
  //     contract,
  //     tag,
  //   }
  //   console.log(CompanyProfileInfo)

  //   try {
  //     const res = await fetch(`${host}/user`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(CompanyProfileInfo),
  //     })
  //     const data = await res.json()

  //     if (data.statusCode === 401) {
  //       throw new Error(data.message)
  //     }
  //   } catch (err: any) {
  //     throw new Error(err.message)
  //   }
  // }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, ...userInfo, logout, register }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
