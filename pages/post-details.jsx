/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import { toast } from "react-toastify";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { useState } from "react";
import { PostsRequest } from "../services/request/posts";
import { useRef } from "react";
import { useRouter } from "next/router"


export default function Posts({ match }) {
    const isMount = useRef();
    const { query } = useRouter();
    const { isAuthenticated, user } = useContext(AuthContext);
    const [post, setPost] = useState({});

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
        try {
            const data = await PostsRequest.getPostById(query.id);
            if (data) {
                setPost(data);
            }
        } catch (err) {
            console.log(err)
            toast.error("Algo de errado errado aconteceu, tente novamente mais tarde")
        }
    }

    return (
        <Flex height="100vh">
            <Header />
            <Stack spacing={8}>
                <Flex flexDir="column" align="center" justify="center" padding="8" mt="32">
                    <Text fontSize='3xl' color="whiteAlpha.900">{post.title}</Text>
                    <Text fontSize='xl' color="whiteAlpha.800" textAlign="justify">{post.resum}</Text>
                    <Text fontSize='xl' mt="8" color="whiteAlpha.800" textAlign="justify">{post.body}</Text>
                </Flex>
            </Stack>
        </Flex>
    );
}