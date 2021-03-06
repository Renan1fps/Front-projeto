/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from "react";
import { Flex, Input, Stack, Button, Image, Textarea, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";
import Router from "next/router";
import { PostsRequest } from "../../services/request/posts";
import { AuthContext } from "../../context/auth";
import { LoadingContext } from "../../context/loading";
import { ThemeRequest } from "../../services/request/theme";
import { useEffect } from "react";
import { Loading } from "../Spinner";

export function FormCreatePost() {
    const { user } = useContext(AuthContext);
    const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext);
    const isMount = useRef();
    const [loadingC, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [resum, setResum] = useState("");
    const [idTheme, setIdTheme] = useState("false")
    const [themes, setThemes] = useState([])


    useEffect(() => {
        if (isMount.current) return;

        isMount.current = true;
        getData();
    }, []);

    async function getData() {
        increseLoading();
        try {
            const data = await ThemeRequest.getAllThemes();
            if (data) {
                setThemes(data);
            }
            decreaseLoading();
        } catch (err) {
            console.log(err)
            toast.error("Algo de errado aconteceu, tente novamente mais tarde")
        } finally {
            decreaseLoading();
        }
    }


    async function register() {
        if (title === "" || body === "" || resum === "" || idTheme === "") {
            toast.error("Preencha todos os campos")
            return;
        }
        setLoading(true);
        try {
            await PostsRequest.create({ title, body, resum, idTheme, IdUser: user.id },
                () => toast.success("Post cadastrado com sucesso!"),
                Router.push("/")
            )
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
                    <Select _placeholder="Selecione uma op????o"
                        color="whiteAlpha.900"
                        onChange={(e) => setIdTheme(e.target.value)}>
                        {themes.map(row => (
                            <option value={row.id} style={{
                                background: "#192129",
                            }} >{row.name || "--"}</option>
                        ))}
                    </Select>
                    <Input
                        placeholder="Titulo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        color="whiteAlpha.900"
                    />
                    <Textarea
                        placeholder='Resumo'
                        color="whiteAlpha.900"
                        onChange={(e) => setResum(e.target.value)}
                    />
                    <Textarea
                        placeholder='Deposite seu artigo'
                        color="whiteAlpha.900"
                        onChange={(e) => setBody(e.target.value)}
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
