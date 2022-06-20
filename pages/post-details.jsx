/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import Router from "next/router";
import { toast } from "react-toastify";
import {
    Flex, Stack, Text, Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    ButtonGroup,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { useState } from "react";
import { PostsRequest } from "../services/request/posts";
import { useRef } from "react";
import { useRouter } from "next/router"
import { LoadingContext } from "../context/loading";
import { Loading } from "../components/Spinner";


export default function Posts({ match }) {
    const isMount = useRef();
    const { query } = useRouter();
    const { isAuthenticated, user } = useContext(AuthContext);
    const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext)
    const [post, setPost] = useState({});
    const [isOpenState, setIsOpenState] = useState(false);

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
        try {
            const data = await PostsRequest.getPostById(query.id);
            if (data) {
                setPost(data);
            }
            decreaseLoading();
        } catch (err) {
            console.log(err)
            toast.error("Algo de errado aconteceu, tente novamente mais tarde")
        } finally {
            decreaseLoading();
        }
    }

    async function deletePost() {
        increseLoading();
        try {
            await PostsRequest.deletePostById(query.id, () => {
                decreaseLoading();
                toast.success("Post deletado com sucesso"),
                    Router.push("/")
            });
        } catch (err) {
            toast.error("Algo de errado aconteceu, tente novamente mais tarde")
            Router.push("/")
        } finally {
            decreaseLoading();
        }
    }

    return (loading ? <Loading /> :
        <Flex height="100vh">
            <Header />
            <Stack spacing={8}>
                <Flex flexDir="column" align="center" justify="center" padding="8" mt="32">
                    <Text fontSize='3xl' color="whiteAlpha.900">{post.title}</Text>
                    <Text fontSize='xl' color="whiteAlpha.800" textAlign="justify">{post.resum}</Text>
                    <Text fontSize='xl' mt="8" color="whiteAlpha.800" textAlign="justify">{post.body}</Text>
                    <Button mr={5} bg="red.600" onClick={() => setIsOpenState(true)}>
                        Apagar
                    </Button>
                    <Popover
                        returnFocusOnClose={false}
                        isOpen={isOpenState}
                        onClose={() => setIsOpenState(false)}
                        placement='right'
                        closeOnBlur={false}
                    >
                        <PopoverTrigger >
                            <Button display="none" colorScheme='pink'></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverHeader fontWeight='semibold'>Confirmação</PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                você está prestes a excluir esse post, deseja prosseguir?
                            </PopoverBody>
                            <PopoverFooter display='flex' justifyContent='flex-end'>
                                <ButtonGroup size='sm'>
                                    <Button variant='outline' onClick={() => setIsOpenState(false)}>Cancelar</Button>
                                    <Button colorScheme='red' onClick={() => deletePost()}>Continuar</Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </Flex>
            </Stack>
        </Flex>
    );
}