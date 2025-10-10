import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CenterLogo({ colorChange, isSearchOpen, centerOnCompact = false }) {
  return (
    <Flex
      order={{ base: 2, md: 1 }}
      justifyContent={{ base: "center", md: centerOnCompact ? "center" : "flex-start" }}
      flex={{ base: "initial", md: 1 }}
      position="relative"
      zIndex={10000}
      display={{ base: isSearchOpen ? 'none' : 'flex', md: 'flex' }}
      pointerEvents="auto"
      flexShrink={0}
      alignItems="center"
      height="100%"
    >
      <Link to="/">
        <Image
          src={
            colorChange
              ? "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logowhite.webp.webp"
              : "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/red.100acresslogo.webp"
          }
          alt="100acress logo"
          height={{ base: '45px', sm: '50px', md: '60px' }}
          minH={{ base: '45px', sm: '50px', md: '60px' }}
          maxH={{ base: '45px', sm: '50px', md: '60px' }}
          width={{ base: '169.04px', sm: '187.82px', md: '225.38px' }}
          minW={{ base: '169.04px', sm: '187.82px', md: '225.38px' }}
          maxW={{ base: '169.04px', sm: '187.82px', md: '225.38px' }}
          objectFit="contain"
          draggable={false}
          transition="opacity 200ms ease"
          flexShrink={0}
        />
      </Link>
    </Flex>
  );
}