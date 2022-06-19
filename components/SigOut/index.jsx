import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export function SignOutButton() {
  const { signOut } = useContext(AuthContext);
  return (
    <Button
      onClick={() => signOut() }
      borderRadius="16"
      bg="#4eedd8"
      transition="filter 0.5s"
      _hover={{
        filter: "brightness(0.8)",
      }}
    >
      Sair
    </Button>
  );
}
