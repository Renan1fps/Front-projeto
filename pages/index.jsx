import { Header } from "../components/Header";
import { Text, Flex, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex height="100vh">
      <Header />
      <Flex align="flex-start" justify="center" mt="64" h="100vh" ml="16">
        <Text
          fontSize="6xl"
          fontWeight="bold"
          color="whiteAlpha.800"
          transition="filter 0.5s"
          _hover={{
            color: "#4eedd8",
            cursor: "pointer",
          }}
          ml="32"
          mt="16"
        >
          Seja bem vindo! 👋
        </Text>
        <Image
          src="/images/logoV2.png"
          alt="logo"
          boxSize="500"
          width=""
          padding="4"
          mt="-32"
        />
      </Flex>
    </Flex>
  );
}