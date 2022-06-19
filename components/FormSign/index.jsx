import React, { useState } from "react";
import { Flex, Input, Stack, Button, Image, InputGroup, InputRightElement } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { SignIn } from "../../services/request/signIn";
import Router from "next/router";

export function FormSign() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    async function register() {
        if (email === "" || password === "" || name === "") {
            toast.error("Preencha todos os campos")
            return;
        }
        setLoading(true);
        try {
            await SignIn.createUser({ name, password, email, isAdmin: false },
                () => toast.success("Usuário cadastrado com sucesso"),
                Router.push("/login")
            )
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex
                as="form"
                bg="gray.700"
                w="100%"
                maxWidth={300}
                p="8"
                borderRadius="8"
            >
                <Stack spacing="4">
                    <Image src="/images/logoBranco.png" alt="logo" />
                    <Input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        color="whiteAlpha.900"
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        color="whiteAlpha.900"
                    />
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                            color="whiteAlpha.900"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.5rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        bg="#4eedd8"
                        onClick={() => register()}
                        h="8"
                        ml="32"
                    >
                        {loading ? "Cadastrando" : "Cadastre-se"}
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
}
