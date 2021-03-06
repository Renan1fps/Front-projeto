import React, { useContext, useState } from "react";
import { Flex, Input, Stack, Button, Image, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import Router from "next/router";

export function FormLogin() {
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  async function userAuth() {
    if (email !== "" && password !== "") {
      await signIn({ email, password });
    } else {
      toast.error("Preencha todos os campos")
    }
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        bg="gray.700"
        w="100%"
        maxWidth={300}
        p="8"
        borderRadius="8"
      >
        <Stack spacing="4">
          <Image src="/images/logoBranco.png" alt="logo" />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="whiteAlpha.900"
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              color="whiteAlpha.900"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.5rem" size="sm" onClick={handleClick} bg="gray.600">
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button bg="#4eedd8" onClick={() => userAuth()}>
            {loadingAuth ? "Carregando..." : "Entrar"}
          </Button>
          <Button
            bg="gray.600"
            onClick={() => Router.push("/signIn")}
            h="8"
            ml="32"
            color="whiteAlpha.700"
            _hover={{
              color: "black",
              background: "gray.100",
            }}
          >
            Cadastre-se
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
