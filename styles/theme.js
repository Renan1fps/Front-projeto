import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      colors:{
        mine:{
          900: "#4eedd8"
        }
      },
      body: {
        bg: "gray.900",
      },
    },
  },
});
