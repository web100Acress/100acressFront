import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CenterLogo({ colorChange, isSearchOpen, centerOnCompact = false }) {
  return (
    <Flex
      order={{ base: 2, md: 1 }}
      justifyContent={{ base: "center", md: centerOnCompact ? "center" : "flex-start" }}
      flex={{ base: "initial", md: 1 }}
      position={centerOnCompact ? "absolute" : "relative"}
      left={centerOnCompact ? "50%" : "auto"}
      transform={centerOnCompact ? "translateX(-50%)" : "none"}
      zIndex={10000}
      display={{ base: isSearchOpen ? 'none' : 'flex', md: 'flex' }}
      pointerEvents="auto"
      flexShrink={0}
      alignItems="center"
    >
      <Link to="/">
        <Image
          src={
            colorChange
              ? "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/lg.webp"
              : "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp"
          }
          alt="100acress logo"
          height="60px"
          minH="60px"
          maxH="60px"
          width="auto"
          maxW="unset"
          objectFit="contain"
          draggable={false}
          transition="opacity 200ms ease"
          flexShrink={0}
        />
      </Link>
    </Flex>
  );
}
