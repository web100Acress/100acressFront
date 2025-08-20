import React from "react";
import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Portal } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import AuthModal from "../../Components/AuthModal";

export default function RightSection({
  colorChange,
  isSearchOpen,
  setIsSearchOpen,
  token,
  firstName,
  isAdmin,
  isBlogger,
  go,
  HandleUserLogout,
  ShowLogOutMessage,
  showModal,
  showAuth,
  setShowAuth,
}) {
  const { isOpen: isAcctOpen, onOpen: onAcctOpen, onClose: onAcctClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex
      alignItems="center"
      gap={{ base: 1, md: 2 }}
      order={{ base: 3, md: 3 }}
      justifyContent={{ base: "flex-end", md: "flex-end" }}
      flex={{ base: "initial", md: 1 }}
      position="relative"
      zIndex={10001}
      flexWrap="nowrap"
      whiteSpace="nowrap"
      overflowX={{ base: 'auto', md: 'visible' }}
      sx={{ '::-webkit-scrollbar': { display: 'none' } }}
    >
      {/* Search trigger */}
      <IconButton
        aria-label="Search"
        icon={<SearchIcon />}
        size="sm"
        variant="ghost"
        color={colorChange ? "white" : "#111"}
        _hover={{ bg: "transparent", color: colorChange ? "whiteAlpha.800" : "#111" }}
        opacity={{ base: !isSearchOpen ? 1 : 0, md: colorChange && !isSearchOpen ? 1 : 0 }}
        transition="opacity 300ms ease"
        pointerEvents={{ base: !isSearchOpen ? "auto" : "none", md: colorChange && !isSearchOpen ? "auto" : "none" }}
        display={{ base: "inline-flex", sm: "inline-flex" }}
        onClick={() => setIsSearchOpen(true)}
      />

      <Box>
        {token ? (
          // Authenticated user: Drawer on mobile, Menu on desktop
          isMobile ? (
            <>
              <Button onClick={() => (isAcctOpen ? onAcctClose() : onAcctOpen())} aria-label="Profile" variant="ghost" bg="transparent" _hover={{ bg: "transparent" }} px={2}>
                <Flex align="center" gap={2}>
                  <Box as="span" border="1px solid rgba(0,0,0,0.35)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center">
                    <Box as="span" lineHeight={0}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </Box>
                  </Box>
                </Flex>
              </Button>
              <Drawer isOpen={isAcctOpen} placement="right" onClose={onAcctClose} size="xs" zIndex={15000} closeOnOverlayClick={true} closeOnEsc={true}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">{firstName || 'Account'}</DrawerHeader>
                  <DrawerBody p={0}>
                    <Box px={4} py={3} color="#666" fontSize="12px">Signed in</Box>
                    <Box h="1px" bg="#eee" />
                    <Box as={Button} variant="ghost" w="100%" justifyContent="flex-start" borderRadius={0} onClick={() => { onAcctClose(); go('/userdashboard/'); }} fontSize="16px" py={6}>View Profile</Box>
                    {isAdmin && (
                      <Box as={Button} variant="ghost" w="100%" justifyContent="flex-start" borderRadius={0} onClick={() => { onAcctClose(); go('/admin/'); }} fontSize="16px" py={6}>Admin</Box>
                    )}
                    {isBlogger && (
                      <Box as={Button} variant="ghost" w="100%" justifyContent="flex-start" borderRadius={0} onClick={() => { onAcctClose(); go('/seo/blogs'); }} fontSize="16px" py={6}>Blog</Box>
                    )}
                    <Box h="1px" bg="#eee" />
                    <Box as={Button} colorScheme="red" variant="ghost" w="100%" justifyContent="flex-start" borderRadius={0} onClick={() => { onAcctClose(); HandleUserLogout(); ShowLogOutMessage(); }} fontSize="16px" py={6}>Log out</Box>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <Menu placement="bottom-end" isLazy strategy="fixed">
              <MenuButton
                as={Button}
                aria-label="Profile"
                variant="ghost"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                px={2}
              >
                <Flex align="center" gap={2}>
                  <Box
                    as="span"
                    border="1px solid rgba(0,0,0,0.35)"
                    borderRadius="full"
                    w="32px"
                    h="32px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box as="span" lineHeight={0}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </Box>
                  </Box>
                  {firstName && (
                    <Box as="span" color={colorChange ? "white" : "#111"} fontSize="14px" fontWeight="600" display={{ base: "none", md: "inline" }}>
                      {firstName}
                    </Box>
                  )}
                </Flex>
              </MenuButton>
              <Portal>
                <MenuList p={0} minW="220px" maxH="60vh" overflowY="auto" zIndex={14000}>
                  <Box px={3} pt={2} pb={2} color="#666" fontSize="12px">Signed in</Box>
                  <Box h="1px" bg="#eee" />
                  <MenuItem onClick={() => go('/userdashboard/')} fontSize="14px">View Profile</MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => go('/admin/')} fontSize="14px">Admin</MenuItem>
                  )}
                  {isBlogger && (
                    <MenuItem onClick={() => go('/seo/blogs')} fontSize="14px">Blog</MenuItem>
                  )}
                  <Box h="1px" bg="#eee" />
                  <MenuItem onClick={() => { HandleUserLogout(); ShowLogOutMessage(); }} fontSize="14px">Log out</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          )
        ) : (
          <>
            <Button onClick={showModal} aria-label="Profile" variant="ghost" bg="transparent" _hover={{ bg: "transparent" }} px={2}>
              <Flex align="center" gap={2}>
                <Box as="span" border="1px solid rgba(0,0,0,0.35)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center">
                  <Box as="span" lineHeight={0}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </Box>
                </Box>
                <Box as="span" color={colorChange ? "white" : "#111"} fontSize="14px" display={{ base: "none", sm: "inline" }}>Log in</Box>
              </Flex>
            </Button>
            <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="register" />
          </>
        )}

        {/* Post property CTA */}
        {token ? (
          <Link to="/postproperty/">
            <Button size="sm" variant="solid" bg="white" color="#111" border="2px solid #e53e3e" boxShadow="sm" _hover={{ boxShadow: '0 0 0 3px rgba(229,62,62,0.15)', bg: 'white' }} fontWeight="700" fontSize="14px" letterSpacing="0.3px" display={{ base: "none", lg: "inline-flex" }} gap={3} alignItems="center" borderRadius="xl" px={4} py={2} ml={{ base: 2, md: 3 }}>
              <Box as="span">Post property</Box>
              <Box as="span" bg="#FACC15" color="#e53e3e" px={3} py={0.5} fontSize="11px" fontWeight="800" lineHeight={1} style={{ clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)' }}>
                FREE
              </Box>
            </Button>
          </Link>
        ) : (
          <Link to="/auth/signin/">
            <Button size="sm" variant="solid" bg="white" color="#111" border="2px solid #e53e3e" boxShadow="sm" _hover={{ boxShadow: '0 0 0 3px rgba(229,62,62,0.15)', bg: 'white' }} fontWeight="700" fontSize="14px" letterSpacing="0.3px" display={{ base: "none", lg: "inline-flex" }} gap={3} alignItems="center" borderRadius="xl" px={4} py={2} ml={{ base: 2, md: 3 }}>
              <Box as="span">Post property</Box>
              <Box as="span" bg="#FACC15" color="#e53e3e" px={3} py={0.5} fontSize="11px" fontWeight="800" lineHeight={1} style={{ clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)' }}>
                FREE
              </Box>
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
}

