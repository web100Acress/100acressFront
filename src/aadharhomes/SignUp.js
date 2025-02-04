import { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Footer from "../Components/Actual_Components/Footer";
import Free from "../../src/Pages/Free";
import { Outlet } from "react-router-dom";

const avatars = [
  {
    name: "Ashish Bhadauriya",
    url: "../../Images/ashish.jpg",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Simran Karnwal",
    url: "../../Images/sim.PNG",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function SignUp() {

  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <>
      <Box position={"relative"} className="mt-10">

        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 10 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Welcome to{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.500)"
                bgClip="text"
              >
                100acress
              </Text>
              <span color="white" bgColor="red">
                .com
              </span>
            </Heading>
            <Text
              mt={"-40px"}
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              We’re India's most trust worthy real estate Dealer and we are
              looking for amazing investors and buyers just like you! Become a
              part of our team and skyrocket your life!
            </Text>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup mt={"-10%"}>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={avatarSize}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient: "linear(to-bl, red.400,pink.400)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text
                mt={"-10%"}
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                mt={"-10%"}
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg", lg: "2xl" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={useBreakpointValue({ base: "54px", md: "70px" })}
                minHeight={useBreakpointValue({ base: "54px", md: "70px" })}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient: "linear(to-bl, orange.400,yellow.400)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Stack>

          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8, lg: 4 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            boxShadow="2xl"
          >
            <Stack spacing={4}></Stack>
            <Outlet />
          </Stack>
        </Container>
      </Box>
      <Free />
      <Footer />
    </>
  );
}
