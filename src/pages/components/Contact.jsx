import React from "react";
import {
  Card,
  CardFooter,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Contact = () => {
  const footerDirection = useBreakpointValue({ base: "row", md: "column" });

  return (
    <>
      <Card
        overflow="hidden"
        variant="outline"
        rounded="lg"
        boxShadow="md"
        position="absolute"
        top="2"
        right="2"
      >
        <CardFooter
          display="flex"
          flexDirection={footerDirection}
          justifyContent="center"
          gap={4}
        >
          <Tooltip
            bg="whiteAlpha.800"
            color="gray.800"
            borderRadius="md"
            maxW="md"
            padding="2"
            placement="left"
            label="LinkedIn"
          >
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/stephen-paul-i/"
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              colorScheme="blue"
              icon={<FaLinkedin />}
              size="md"
              _hover={{
                bg: "blue.600",
                transform: "scale(1.1)",
                boxShadow: "lg",
              }}
            />
          </Tooltip>

          <Tooltip
            bg="whiteAlpha.800"
            color="gray.800"
            borderRadius="md"
            maxW="md"
            padding="2"
            placement="left"
            label="Gmail"
          >
            <IconButton
              as="a"
              href="mailto:stephenpaul4040@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              colorScheme="red"
              icon={<SiGmail />}
              size="md"
              _hover={{
                bg: "red.600",
                transform: "scale(1.1)",
                boxShadow: "lg",
              }}
            />
          </Tooltip>

          <Tooltip
            bg="whiteAlpha.800"
            color="gray.800"
            borderRadius="md"
            maxW="md"
            padding="2"
            placement="left"
            label="GitHub"
          >
            <IconButton
              as="a"
              href="https://github.com/Stephenpaul-03"
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              colorScheme="gray"
              icon={<FaGithub />}
              size="md"
              _hover={{
                bg: "gray.400",
                transform: "scale(1.1)",
                boxShadow: "lg",
              }}
            />
          </Tooltip>
        </CardFooter>
      </Card>
    </>
  );
};

export default Contact;
