/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Flex, Input, Stack, Button, InputGroup, InputRightElement, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { UsereRequest } from "../../services/request/users";
import { LoadingContext } from "../../context/loading";
import { Loading } from "../Spinner";

export function FormUserDetails() {
    const isMount = useRef();
    const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [loadingData, setLoading] = useState(false);
    const { query } = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");
    const [admin, setIsAdmin] = useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);


    useEffect(() => {
        if (isMount.current) return;

        isMount.current = true;

        if (!isAuthenticated) {
            toast.error("Usuário não autenticado");
            Router.push("/login");
        }
        getData();
    }, []);


    async function getData() {
        increseLoading();
        try {
            const data = await UsereRequest.getUserById(query.id);
            if (data) {
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin)
            }
            decreaseLoading();
        } catch (err) {
            console.log(err);
            toast.error("Algo de errado aconteceu, tente novamente mais tarde");
            decreaseLoading();
        } finally {
            decreaseLoading();
        }
    }


    async function register() {
        if (email === "" || name === "") {
            toast.error("Preencha todos os campos")
            return;
        }
        if (password !== passwordConfirmation) {
            toast.error("Senhas diferentes")
            return;
        }
        setLoading(true);
        try {
            await UsereRequest.updateUserByID(query.id, {
                name,
                email,
                password: password || "n",
                isAdmin: admin
            }, () => {
                toast.success("Usuário atualizado com sucesso");
                Router.push("/")
            })
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function deleteUser() {
        setLoading(true);
        try {
            await UsereRequest.deleteUserById(query.id, () => {
                toast.success("Usuário Deleteado");
                Router.push("/")
            })
            setLoading(false);
        } catch (err) {
            toast.success("Algo deu errado, tente novamente mais tarde");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (loading ? <Loading /> :
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
                    <Select _placeholder="Selecione uma opção"
                        color="whiteAlpha.900"
                        onChange={(e) => setIsAdmin(Boolean(e.target.value))}
                        defaultValue={admin}
                    >
                        <option value={true} style={{
                            background: "#192129",
                        }} >Admin</option>
                        <option value={false} style={{
                            background: "#192129",
                        }} >Usuário</option>
                    </Select>
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
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Confirme sua Senha"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                        {loadingData ? "Salvando" : "Salvar"}
                    </Button>
                    <Button
                        bg="red.500"
                        onClick={() => deleteUser()}
                        h="8"
                        ml="32"
                    >
                        {loadingData ? "Excluindo" : "Excluir"}
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
}
