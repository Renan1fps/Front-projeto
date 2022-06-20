import { Header } from "../components/Header";
import { Text, Flex, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

export default function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Flex height="100vh">
      <Header />
      <Flex align="flex-start" justify="center" mt="64" h="100vh" ml="16">
        <Text
          fontSize="5xl"
          fontWeight="bold"
          color="#4eedd8"
          transition="all 0.9s"
          _hover={{
            color: "#4eedd8",
            filter: "brightness(0.8)",
          }}
          ml="32"
          mt="16"
        >
          {isAuthenticated ? `Bem-vindo, ${user.name}👋` : "Seja bem-vindo! 📰"}
        </Text>
        <Image
          src="/images/logoV2.png"
          alt="logo"
          boxSize="500"
          width=""
          padding="4"
          mt="-32"
          filter="invert(30%)"
        />
      </Flex>
    </Flex>
  );
}
