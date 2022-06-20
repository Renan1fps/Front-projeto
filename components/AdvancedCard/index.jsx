import {
    Box,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

export function Feature({ title, desc, hi, mwi, minWi, minHi, more, click, isDisable, ...rest }) {
    const [selected, setSelected] = useState(false);

    function teste() {
        console.log("DISABLE", isDisable)
        if (isDisable >= 3) {
            return
        }

        if (selected) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }

    return (
        <Box
            p={5} shadow='md'
            borderWidth='1px'
            {...rest}
            bg={selected ? "green.500" : "gray.700"}
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
            onClick={() => { click(); teste() }}
        >
            <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4} textAlign="justify" >{desc}</Text>
        </Box>
    )
}