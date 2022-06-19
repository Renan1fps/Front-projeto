import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import { toast } from "react-toastify";

export default function Themes() {
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Usuário não autenticado");
      Router.push("/login");
    }
  }, [isAuthenticated]);

  return <h1>Autenticado</h1>;
}
