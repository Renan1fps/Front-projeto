/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Flex, Input, Stack, Button, Image } from "@chakra-ui/react";
import { toast } from "react-toastify";
import Router from "next/router";
import { AuthContext } from "../../context/auth";
import { LoadingContext } from "../../context/loading";
import { Loading } from "../Spinner";
import { ThemeRequest } from "../../services/request/theme";

export function FormCreatePost() {
    const isMount = useRef();
    const { user, isAuthenticated } = useContext(AuthContext);
    const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext);
    const [loadingC, setLoading] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (isMount.current) return;

        isMount.current = true;
        if (!isAuthenticated || !user.isAdmin) {
            toast.error("Usuário sem permissão");
            Router.push("/login");
        }
    }, []);

    async function register() {
        setLoading(true)
        try {
            await ThemeRequest.createThema({ name: title }, () => toast.success("Tema cadastrado com sucesso!"),
            Router.push("/"))
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.success("Algo deu errado, tente novamente mais tarde")
        } finally {
            setLoading(false);
        }
    }

    return (loading ? <Loading /> :
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex
                as="form"
                bg="gray.800"
                w="500"
                maxWidth={800}
                p="8"
                borderRadius="8"
            >
                <Stack spacing="4">
                    <Image src="/images/logoV2.png" alt="logoV2.png" filter="invert(10%)" />
                    <Input
                        placeholder="Titulo do Tema"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        color="whiteAlpha.900"
                    />
                    <Button
                        bg="#4eedd8"
                        onClick={() => register()}
                        h="8"
                        ml="32"
                    >
                        {loadingC ? "Cadastrando" : "Cadastrar"}
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
}
