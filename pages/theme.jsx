/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import { toast } from "react-toastify";
import { Flex, HStack, Stack } from "@chakra-ui/react";
import { Feature } from "../components/AdvancedCard"
import { Header } from "../components/Header";
import { useState } from "react";
import { useRef } from "react";
import { ThemeRequest } from "../services/request/theme";


export default function Themes() {
  const isMount = useRef();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    if(isMount.current) return;

    isMount.current = true;

    if (!isAuthenticated) {
      toast.error("Usuário não autenticado");
      Router.push("/login");
    } else {
      getData();
    }
  }, []);


  async function getData() {
    try {
      const data = await ThemeRequest.getAllThemes();
      if (data) {
        console.log(data)
        setThemes(data);
      }
    } catch (err) {
      console.log(err)
      toast.error("Algo de errado aconteceu, tente novamente mais tarde")
    }
  }

  return (
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
              click={()=> ("")}
            />
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
}