import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthProvider } from "../context/auth";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ToastContainer autoClose={3000} />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
