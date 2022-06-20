/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import {
    Flex,
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalBody,
    Lorem,
    ModalFooter
} from "@chakra-ui/react";
import { Feature } from "../AdvancedCard/index"
import { Header } from "../Header/index";
import { useState } from "react";
import { useRef } from "react";
import { ThemeRequest } from "../../services/request/theme";
import Router from "next/router";
import { ChoiceRequest } from "../../services/request/choice";

export function SelectChoices() {
    const isMount = useRef();
    const { isAuthenticated, user } = useContext(AuthContext);
    const [themes, setThemes] = useState([]);
    const [selectRows, setSelectRows] = useState([]);
    const [isOpen, setIsopen] = useState(false)

    console.log("Aquii", selectRows)

    useEffect(() => {
        if (isMount.current) return;

        isMount.current = true;
        getData();
    }, []);

    async function getData() {
        try {
            const data = await ThemeRequest.getAllThemes();
            if (data) {
                setThemes(data);
            }
        } catch (err) {
            console.log(err)
            toast.error("Algo de errado aconteceu, tente novamente mais tarde")
        }
    }

    function selectChoices(theme) {
        console.log({ user })
        const index = selectRows.indexOf(theme.id);
        if (index > -1) {
            selectRows.splice(index, 1);
        } else {
            setSelectRows([...selectRows, theme]);
        }
    }

    async function createChoices() {
        let choices = [];
        for (let i = 0; i < selectRows.length; i++) {
            choices[i] = selectRows[i].id
        }
        try {
            await ChoiceRequest.createChoices(choices, user.id);
        } catch (error) {
            console.log(error);
            toast.error("Algo deu errado");
        }
    }

    return (
        <Flex height="100vh">
            <Header />

            <Stack spacing={8}>
                <Flex flexDir="column" align="center" justify="center" padding="8">
                    {themes.map(theme => (
                        <Feature
                            title={theme.name}
                            desc={theme.resum}
                            minHi={100}
                            mwi={200}
                            minWi={500}
                            click={selectRows.length === 3 ?
                                () => { toast.error("Limite atingido 😢"), setIsopen(true) } :
                                () => { selectChoices(theme) }}
                            isDisable={selectRows.length}
                        />
                    ))}
                </Flex>
            </Stack>
            <>
                <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={() => Router.push("/")}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Salvar Escolhas</ModalHeader>
                        <ModalBody>{
                            selectRows.map(row => (
                                <p><strong>{row.name}</strong></p>
                            ))
                        }</ModalBody>
                        <ModalCloseButton />
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => createChoices()}>
                                Salvar
                            </Button>
                            <Button onClick={() => Router.push("/")}>Cancelar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </Flex>
    );
}
