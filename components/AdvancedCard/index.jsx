import { Box, Heading, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Router from "next/router";

export function Feature({ title, desc, hi, mwi, minWi, minHi, more, click, ...rest }) {
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
            transition="all 0.8s"
            _hover={{
                background: "gray.500",
                minWidth: minWi + 10,
                minH: minHi + 10,
                cursor: "pointer",
            }}
            maxWidth={mwi}
            minWidth={minWi}
            height="100"
            minH={minHi}
            mt="16"
            ml="480"
            overflow="hidden"
            onClick={() => click()}
        >
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4} textAlign="justify">{desc}</Text>
        </Box>
    )
}