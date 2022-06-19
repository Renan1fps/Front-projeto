/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import { toast } from "react-toastify";
import { Flex, Stack } from "@chakra-ui/react";
import { Feature } from "../components/AdvancedCard"
import { Header } from "../components/Header";
import { useState } from "react";
import { PostsRequest } from "../services/request/posts";
import { useRef } from "react";


export default function Posts() {
  const isMount = useRef();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

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
      const data = await PostsRequest.getAllPosts();
      if (data) {
        setPosts(data);
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
          {posts.map(post => (
            <Feature
              title={post.title}
              desc={post.resum}
              minHi={400}
              mwi={500}
              minWi={500}
              more={true}
              click={()=> Router.push(`post-details?id=${post.id_post}`)}
            />
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
}