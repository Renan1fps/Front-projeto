/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { LoadingContext } from "../context/loading";
import Router from "next/router";
import { toast } from "react-toastify";
import { Flex, Stack, Button, HStack } from "@chakra-ui/react";
import { Feature } from "../components/AdvancedCard"
import { Header } from "../components/Header";
import { useState } from "react";
import { PostsRequest } from "../services/request/posts";
import { useRef } from "react";
import { Loading } from "../components/Spinner";


export default function Posts() {
  const isMount = useRef();
  const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (isMount.current) return;

    isMount.current = true;

    if (!isAuthenticated) {
      toast.error("Usuário não autenticado");
      Router.push("/login");
    } else {
      getData();
    }
  }, []);


  async function getData() {
    increseLoading();
    let data = null;
    try {
      if (user.isAdmin) {
        console.log("Entrou aqui ADMIN", user)
        data = await PostsRequest.getAllPosts();
      } else {
        console.log("Entrou aqui não admin")
        data = await PostsRequest.getPostsByChoice(user.idChoices);
      }

      if (data) {
        setPosts(data);
      }
      decreaseLoading();
    } catch (err) {
      console.log(err)
      toast.error("Algo de errado aconteceu, tente novamente mais tarde")
    } finally {
      decreaseLoading()
    }
  }


  return (loading ? <Loading /> :
    <Flex height="100vh">
      <Header />
      <Stack spacing={8}>
        <Flex flexDir="column" align="center" justify="center" padding="8">
          {posts.map(post => (
            <Feature
              title={post.title}
              desc={post.resum}
              minHi={400}
              mwi={500}
              minWi={500}
              more={true}
              click={() => Router.push(`post-details?id=${post.id_post}`)}
            />
          ))}
          <HStack justify="center" align="center">
            <Button ml="500" mt="8" onClick={() => Router.push("/create-post")}>
              Criar Post
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Flex>
  );
}