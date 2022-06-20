/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Header } from "../components/Header";
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/auth';
import { LoadingContext } from '../context/loading';
import { UsereRequest } from '../services/request/users';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { Loading } from '../components/Spinner';

export default function Users() {
    const isMount = useRef();
    const { isAuthenticated, user } = useContext(AuthContext);
    const { increseLoading, decreaseLoading, loading } = useContext(LoadingContext);
    const [usersData, setUsersData] = useState([]);


    useEffect(() => {
        if (isMount.current) return;

        isMount.current = true;
        console.log({ user })
        if (!isAuthenticated || !user.isAdmin) {
            toast.error("Usuário sem permissão");
            Router.push("/login");
        } else {
            getData();
        }
    }, []);

    async function getData() {
        increseLoading();
        try {
            const data = await UsereRequest.getAllUsers();
            if (data) {
                setUsersData(data);
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

    return (loading ? <Loading /> :
        <Flex height="100vh">
            <Header />
            <Flex justify="center" align="center" w="100%">
                <Box bg="gray.500"
                    minW="1000"
                    p="8"
                    borderRadius="8"
                    maxW="1000"
                    maxH="500"
                    overflowY="scroll"
                    mt="32"
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#8ccef0",
                            borderRadius: "24px",
                        },
                    }}
                >
                    <TableContainer >
                        <Table variant='simple'>
                            <TableCaption>Usuários</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th align='center'>Nome</Th>
                                    <Th align='center'>Email</Th>
                                    <Th align='center'>Admin</Th>
                                    <Th align='center'>Ação</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {usersData.map(user => (
                                    <Tr key={user.id}>
                                        <Td><strong>{user.name}</strong></Td>
                                        <Td><strong>{user.email}</strong></Td>
                                        <Td><strong>{user.isAdmin ? "Sim" : "Não"}</strong></Td>
                                        <Td><ArrowForwardIcon
                                            onClick={() => Router.push(`user-details?id=${user.id}`)}
                                            _hover={{
                                                cursor: "pointer",
                                            }}
                                        /></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </Flex >
    )
}