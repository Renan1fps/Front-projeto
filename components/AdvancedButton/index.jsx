import Router from 'next/router'
import { Button } from "@chakra-ui/react";

export function AdvancedButton() {
  return (
    <Button
      onClick={() => Router.push("/login")}
      borderRadius="16"
      bg="#4eedd8"
      transition="filter 0.5s"
      _hover={{
        filter: "brightness(0.8)",
      }}
    >
      Entrar
    </Button>
  );
}
