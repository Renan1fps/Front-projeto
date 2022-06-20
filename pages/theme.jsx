/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import { toast } from "react-toastify";
import { Button, Flex, HStack, Stack } from "@chakra-ui/react";
import { Feature } from "../components/AdvancedCard"
import { Header } from "../components/Header";
import { useState } from "react";
import { useRef } from "react";
import { ThemeRequest } from "../services/request/theme";
import { SelectChoices } from "../components/Choices/index"
import { LoadingContext } from "../context/loading";
import { Loading } from "../components/Spinner";


export default function Themes() {
  const isMount = useRef();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext);
  const [themes, setThemes] = useState([]);
  const [isFirstAccess, setIsFirstAccess] = useState();

  useEffect(() => {
    if (isMount.current) return;

    isMount.current = true;

    if (!isAuthenticated) {
      toast.error("Usuário não autenticado");
      Router.push("/login");
    } else {
      if (user && !user.idAdmin && user.idChoices[0] === null || user.idChoices[1] === null || user.idChoices[2] === null) {
        toast.error("Selecione temas para poder ver postagens");
        setIsFirstAccess(true);
      } else {
        getData();
      }
    }
  }, []);

  async function getData() {
    increseLoading();
    try {
      const data = await ThemeRequest.getAllThemes();
      if (data) {
        setThemes(data);
      }
      decreaseLoading();
    } catch (err) {
      console.log(err);
      toast.error("Algo de errado aconteceu, tente novamente mais tarde");
      decreaseLoading();
    } finally {
      decreaseLoading();
    }
  }

  return (isFirstAccess ? (<SelectChoices />) : (loading ? <Loading /> :
    <Flex height="100vh">
      <Header />
      <Stack spacing={8}>
        <Flex flexDir="column" align="center" justify="center" padding="8">
          {themes.map(theme => (
            <Feature
              title={theme.name}
              desc={theme.resum}
              minHi={100}
              mwi={200}
              minWi={500}
              click={() => ("")}
            />
          ))}
        </Flex>
        { user && user.isAdmin ?
            <HStack justify="center" align="center">
              <Button ml="500" mt="6" onClick={() => Router.push("/create-theme")}>
                Criar Tema
              </Button>
            </HStack> : <></>}
      </Stack>
    </Flex>)
  );
}