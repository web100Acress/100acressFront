import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CenterLogo({ colorChange, isSearchOpen }) {
  return (
    <Flex
      order={{ base: 2, md: 1 }}
      justifyContent={{ base: "center", md: "flex-start" }}
      flex={{ base: "initial", md: 1 }}
      position="relative"
      zIndex={10001}
      display={{ base: isSearchOpen ? 'none' : 'flex', md: 'flex' }}
    >
      <Link to="/">
        <Image
          src={
            colorChange
              ? "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/lg.webp"
              : "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp"
          }
          alt="100acress logo"
          height={{ base: "44px", md: "52px", lg: "60px" }}
          objectFit="contain"
          draggable={false}
          transition="opacity 200ms ease"
        />
      </Link>
    </Flex>
  );
}
