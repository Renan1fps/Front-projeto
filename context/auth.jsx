import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router'
import { api } from "../services/api"

export const AuthContext = createContext([]);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageUser= localStorage.getItem('userInfos');
    const storageAuth = localStorage.getItem('token');

    if (storageAuth) {
      setUser(JSON.parse(storageUser));
      setUserToken(JSON.parse(storageAuth))
      setLoading(false);
    }

    setLoading(false);
  }, []);

  function storageAuth(data) {
    localStorage.setItem('token', JSON.stringify(data));
  }

  async function signIn({ email, password }) {
    setLoadingAuth(true);
    try {
      const { data } = await api.post('/users/auth', { email, password });

      if (!data.token) {
        setLoadingAuth(false);
        throw new Error("invalid credentials");
      }
      
      const dataUSer = {
        ...data.user,
        ...data.choices,
      };
      //api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
      setUser(dataUSer);
      setUserToken(data.token);
      storageAuth(data.token);
      setLoading(false);
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('userInfos', JSON.stringify(dataUSer));
      toast.success('Bem-vindo novamente');
      Router.push("/");
    } catch (err) {
      setLoadingAuth(false);
      toast.error('Credenciais inválidas');
    }
  }

  async function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfos');
    window.location.reload();
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!userToken, signIn, user, loading, signOut, loadingAuth,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
