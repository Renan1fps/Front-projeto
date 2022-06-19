import { Box, Heading, Text } from "@chakra-ui/react";

export function Feature({ title, desc, ...rest }) {
    return (
        <Box 
        p={5} shadow='md' 
        borderWidth='1px' 
        {...rest} 
        bg="gray.700"
        borderRadius="8"
        color="whiteAlpha.800"
        boxShadow='dark-lg'
        rounded='md'
        _hover={{
            background: "gray.500"
        }}
        maxWidth="600"
        minWidth="600"
        height="100"
        minH="200"
        mt="16"
        ml="480"
        >
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4}>{desc}</Text>
        </Box>
    )
}