import { Spinner, Flex } from '@chakra-ui/react'

export function Loading() {
    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Flex>
    )
}