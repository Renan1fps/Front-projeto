import Router from "next/router";
import { Flex, Image, Text } from "@chakra-ui/react";
import { AdvancedButton } from "../AdvancedButton/index";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { SignOutButton } from "../SigOut/index";

export function Header() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Flex
      as="header"
      flexDir="row"
      bg="gray.700"
      h="20"
      w="100vw"
      position="absolute"
      justify="space-evenly"
      align="center"
    >
      <Image
        src="/images/logoBranco.png"
        alt="logo"
        boxSize="150"
        width=""
        padding="4"
      />
      <Text
        fontSize="1xl"
        fontWeight="bold"
        color="whiteAlpha.800"
        transition="filter 0.5s"
        _hover={{
          color: "#4eedd8",
          cursor: "pointer",
          filter: "brightness(0.8)",
        }}
        brightness
        onClick={() => Router.push("/")}
      >
        Início
      </Text>
      <Text
        fontSize="1xl"
        fontWeight="bold"
        color="whiteAlpha.800"
        transition="filter 0.5s"
        _hover={{
          color: "#4eedd8",
          cursor: "pointer",
          filter: "brightness(0.8)",
        }}
        onClick={() => Router.push("/posts")}
      >
        Postagens
      </Text>
      <Text
        fontSize="1xl"
        fontWeight="bold"
        color="whiteAlpha.800"
        transition="filter 0.5s"
        _hover={{
          color: "#4eedd8",
          cursor: "pointer",
        }}
        onClick={() => Router.push("/theme")}
      >
        Temas
      </Text>
      {isAuthenticated && user && user.isAdmin ? <Text
        fontSize="1xl"
        fontWeight="bold"
        color="whiteAlpha.800"
        transition="filter 0.5s"
        _hover={{
          color: "#4eedd8",
          cursor: "pointer",
        }}
        onClick={() => Router.push("/users")}
      >
        Usuários
      </Text> : null}
      {isAuthenticated ? <SignOutButton /> : <AdvancedButton />}
    </Flex>
  );
}
