import React, { useRef } from "react";
import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Portal, useToast } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import AuthModal from "../../Components/AuthModal";
import api from "../../config/apiClient";

export default function RightSection({
  colorChange,
  isSearchOpen,
  setIsSearchOpen,
  token,
  avatarUrl,
  userId,
  onAvatarUpdated,
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
  const fileInputRef = useRef(null);
  const toast = useToast();

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file || !userId) return;

      // Client-side validation: images only, <= 5MB
      const isImage = (file.type || '').toLowerCase().startsWith('image/');
      const maxSize = 5 * 1024 * 1024;
      if (!isImage) {
        toast({ title: 'Only image files are allowed', status: 'error', duration: 3000, isClosable: true });
        return;
      }
      if (file.size > maxSize) {
        toast({ title: 'File too large (max 5MB)', status: 'error', duration: 3000, isClosable: true });
        return;
      }

      // Ensure user is authenticated (Bearer is auto-added by api client from localStorage)
      if (!token) {
        toast({ title: 'Please log in to change your photo', status: 'warning', duration: 2500, isClosable: true });
        return;
      }

      const form = new FormData();
      form.append('avatar', file);
      // Use centralized axios client (handles baseURL and Authorization)
      const res = await api.post(`/users/${userId}/avatar`, form);
      const data = res && res.data ? res.data : null;
      const url = (data && data.data && data.data.avatarUrl) ? data.data.avatarUrl : '';
      if (url && typeof onAvatarUpdated === 'function') onAvatarUpdated(url);
      toast({ title: 'Profile photo updated', status: 'success', duration: 2500, isClosable: true });
    } catch (err) {
      console.error('Avatar upload error:', err);
      const msg = (err && err.response && err.response.data && (err.response.data.message || err.response.data.error))
        || err?.message
        || 'Upload failed';
      toast({ title: msg, status: 'error', duration: 3500, isClosable: true });
    } finally {
      // reset input to allow same file reselect
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
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
        display={{ base: "none", md: "inline-flex" }}
        onClick={() => setIsSearchOpen(true)}
      />

      <Box>
        {/* Hidden file input for avatar upload */}
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        {token ? (
          // Authenticated user: Drawer on mobile, Menu on desktop
          isMobile ? (
            <>
              <Button onClick={() => (isAcctOpen ? onAcctClose() : onAcctOpen())} aria-label="Profile" variant="ghost" bg="transparent" _hover={{ bg: "transparent" }} px={2}>
                <Flex align="center" gap={2}>
                  <Box as="span" border="1px solid rgba(0,0,0,0.35)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center" overflow="hidden">
                    {avatarUrl ? (
                      <Box
                        as="img"
                        src={avatarUrl}
                        alt="Profile"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        onError={() => {
                          toast({ title: 'Could not load profile image', status: 'error', duration: 2500, isClosable: true });
                        }}
                      />
                    ) : (
                      <Box as="span" lineHeight={0}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </Box>
                    )}
                  </Box>
                </Flex>
              </Button>
              <Drawer
                isOpen={isAcctOpen}
                placement="right"
                onClose={onAcctClose}
                size="xs"
                zIndex={15000}
              >
                <DrawerOverlay />
                <DrawerContent maxW="260px">
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">{firstName || 'Account'}</DrawerHeader>

                  <DrawerBody display="flex" flexDirection="column" justifyContent="space-between" p={0}>
                    {/* Top Section */}
                    <Box>
                      <Box position="sticky" top={0} zIndex={0} bg="white" borderBottom="1px solid #eee">
                        <Box px={4} py={3} color="#666" fontSize="12px">Signed in</Box>
                      </Box>

                      {/* View Profile */}
                      <Button
                        variant="ghost"
                        w="100%"
                        display="flex"
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                        py={3}
                        px={4}
                        minH={{ base: 14, md: 12 }}
                        bg="white"
                        borderWidth="1px"
                        borderColor="#e5e7eb"
                        rounded="xl"
                        boxShadow="xs"
                        transition="all 0.15s ease"
                        _hover={{ bg: 'white', boxShadow: 'sm' }}
                        _active={{ bg: 'white', boxShadow: 'xs' }}
                        onClick={() => { onAcctClose(); go('/userdashboard/'); }}
                        my={3}
                        mx={3}
                        position="relative"
                        zIndex={1}
                      >
                        <Box as="span" lineHeight={0} mb={1}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </Box>
                        <Box as="span" color="#111" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" whiteSpace="normal" wordBreak="break-word" lineHeight="1.25">View Profile</Box>
                      </Button>

                      {/* Removed Change Photo from sidebar menu as per requirement */}

                      {/* Admin */}
                      {isAdmin && (
                        <Button
                          variant="ghost"
                          w="100%"
                          display="flex"
                          flexDir="column"
                          justifyContent="center"
                          alignItems="center"
                          textAlign="center"
                          py={3}
                          px={4}
                          minH={{ base: 14, md: 12 }}
                          bg="white"
                          borderWidth="1px"
                          borderColor="#e5e7eb"
                          rounded="lg"
                          boxShadow="xs"
                          transition="all 0.15s ease"
                          _hover={{ bg: 'white', boxShadow: 'sm' }}
                          _active={{ bg: 'white', boxShadow: 'xs' }}
                          onClick={() => { onAcctClose(); go('/admin/'); }}
                          my={3}
                          mx={4}
                          position="relative"
                          zIndex={2}
                          borderRadius="xl"
                        >
                          <Box as="span" lineHeight={0} mb={1}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Box>
                          <Box as="span" color="#111" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" whiteSpace="normal" wordBreak="break-word" lineHeight="1.25">Admin</Box>
                        </Button>
                      )}

                      {/* Blogger */}
                      {isBlogger && (
                        <Button
                          variant="ghost"
                          w="100%"
                          display="flex"
                          flexDir="column"
                          justifyContent="center"
                          alignItems="center"
                          textAlign="center"
                          py={3}
                          px={4}
                          minH={{ base: 14, md: 12 }}
                          bg="white"
                          borderWidth="1px"
                          borderColor="#e5e7eb"
                          rounded="xl"
                          boxShadow="xs"
                          transition="all 0.15s ease"
                          _hover={{ bg: 'white', boxShadow: 'sm' }}
                          _active={{ bg: 'white', boxShadow: 'xs' }}
                          onClick={() => { onAcctClose(); go('/seo/blogs'); }}
                          my={3}
                          mx={3}
                          position="relative"
                          zIndex={1}
                        >
                          <Box as="span" lineHeight={0} mb={1}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 5h14v14H5z" stroke="#111" strokeWidth="1.6"/>
                              <path d="M8 9h8M8 12h8M8 15h5" stroke="#111" strokeWidth="1.6" strokeLinecap="round"/>
                            </svg>
                          </Box>
                          <Box as="span" color="#111" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" whiteSpace="normal" wordBreak="break-word" lineHeight="1.25">Blog</Box>
                        </Button>
                      )}
                    </Box>

                    {/* Logout Button at Bottom */}
                    <Box px={4} pb={3}>
                      <Button
                        colorScheme="red"
                        w="100%"
                        borderRadius="md"
                        fontWeight="600"
                        onClick={() => { onAcctClose(); HandleUserLogout(); ShowLogOutMessage(); }}
                      >
                        Log out
                      </Button>
                    </Box>
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
                  <Box as="span" border="1px solid rgba(0,0,0,0.35)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center" overflow="hidden">
                    {avatarUrl ? (
                      <Box
                        as="img"
                        src={avatarUrl}
                        alt="Profile"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    ) : (
                      <Box as="span" lineHeight={0}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </Box>
                    )}
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
                  {/* Removed Change photo from dropdown menu */}
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

        {/* Mobile Post property CTA */}
        {token ? (
          <Link to="/postproperty/">
            <IconButton
              aria-label="Post property"
              variant="outline"
              size="sm"
              borderColor="#e53e3e"
              color={colorChange ? "white" : "#e53e3e"}
              _hover={{ bg: colorChange ? "whiteAlpha.200" : "red.50" }}
              display={{ base: "inline-flex", lg: "none" }}
              borderRadius="full"
              ml={{ base: 1, md: 2 }}
              icon={
                <Box as="span" lineHeight={0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 8.5v-3M15 7h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </Box>
              }
            />
          </Link>
        ) : (
          <Link to="/auth/signin/">
            <IconButton
              aria-label="Post property"
              variant="outline"
              size="sm"
              borderColor="#e53e3e"
              color={colorChange ? "white" : "#e53e3e"}
              _hover={{ bg: colorChange ? "whiteAlpha.200" : "red.50" }}
              display={{ base: "inline-flex", lg: "none" }}
              borderRadius="full"
              ml={{ base: 1, md: 2 }}
              icon={
                <Box as="span" lineHeight={0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 8.5v-3M15 7h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </Box>
              }
            />
          </Link>
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