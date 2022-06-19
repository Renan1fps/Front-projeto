import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router'


export const AuthContext = createContext([]);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageAuth = localStorage.getItem('token');

    if (storageAuth) {
      setUser(JSON.parse(storageAuth));
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
      //const { data } = await api.post('/auth', { email, password });
      const opa = { data: { access_token: null, refresh_token: null}}

      if (!opa.data.access_token) {
        setLoadingAuth(false);
      }
      const dataUSer = {
        access_token: opa.data.access_token,
        refresh_toke: opa.data.refresh_token,
      };
      //api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
      setUser(dataUSer);
      storageAuth(dataUSer);
      setLoading(false);
      localStorage.setItem('token', JSON.stringify(dataUSer));
      toast.success('Bem-vindo novamente');
      Router.push("/");
    } catch (err) {
      setLoadingAuth(false);
      toast.error('Credenciais inválidas');
    }
  }

  async function signOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user, signIn, user, loading, signOut, loadingAuth,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
