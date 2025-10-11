  import React, { useEffect, useRef, useState } from "react";
  import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Portal, useToast } from "@chakra-ui/react";
  import { SearchIcon } from "@chakra-ui/icons";
  // import { Link } from "react-router-dom";
  import AuthModal from "../../Components/AuthModal";
  import api from "../../config/apiClient";
  import { Button as MovingBorderButton } from "../../Components/ui/moving-border";


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
  const [hideRight, setHideRight] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setHideRight(false);
  }, [isMobile]);

  const handleFileChange = async (e) => {
    try {
      const file = (e.target.files && e.target.files[0]) || null;
      if (!file || !userId) return;
      const isImage = (file.type || '').toLowerCase().startsWith('image/');
      const maxSize = 5 * 1024 * 1024;
      if (!isImage) { toast({ title: 'Only image files are allowed', status: 'error', duration: 3000, isClosable: true }); return; }
      if (file.size > maxSize) { toast({ title: 'File too large (max 5MB)', status: 'error', duration: 3000, isClosable: true }); return; }
      if (!token) { toast({ title: 'Please log in to change your photo', status: 'warning', duration: 2500, isClosable: true }); return; }
      const form = new FormData();
      form.append('avatar', file);
      const res = await api.post(`/users/${userId}/avatar`, form);
      const url = res?.data?.data?.avatarUrl || '';
      if (url && typeof onAvatarUpdated === 'function') onAvatarUpdated(url);
      toast({ title: 'Profile photo updated', status: 'success', duration: 2500, isClosable: true });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Upload failed';
      toast({ title: msg, status: 'error', duration: 3500, isClosable: true });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <Flex
      alignItems="center"
      gap={{ base: 0.5, md: 1 }}
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

      <Box opacity={1} pointerEvents="auto">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        {token ? (
          isMobile ? (
            <>
              <Button onClick={() => (isAcctOpen ? onAcctClose() : onAcctOpen())} aria-label="Profile" variant="ghost" bg="transparent" _hover={{ bg: "transparent" }} px={1}>
                <Flex align="center" gap={2}>
                  <Box as="span" border="1px solid rgba(0,0,0,0.1)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center" overflow="hidden" bg="gray.100">
                    {avatarUrl ? (
                      <Box 
                        as="img" 
                        src={avatarUrl.includes('http') ? avatarUrl : `${process.env.REACT_APP_API_URL || ''}${avatarUrl}`} 
                        alt={firstName || 'Profile'} 
                        w="100%" 
                        h="100%" 
                        objectFit="cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <Box 
                      as="span" 
                      display={!avatarUrl ? 'flex' : 'none'} 
                      alignItems="center" 
                      justifyContent="center" 
                      w="100%" 
                      h="100%" 
                      bg="blue.500" 
                      color="white"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {firstName ? firstName.charAt(0).toUpperCase() : 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      }
                    </Box>
                  </Box>
                </Flex>
              </Button>
              <Drawer isOpen={isAcctOpen} placement="right" onClose={onAcctClose} size="xs" zIndex={15000}>
                <DrawerOverlay />
                <DrawerContent maxW="260px" h="100vh">
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">{firstName || 'Account'}</DrawerHeader>
                  <DrawerBody display="flex" flexDirection="column" justifyContent="space-between" p={0} overflowY="auto" pb={6}>
                    <Box>
                      <Box position="sticky" top={0} zIndex={0} bg="white" borderBottom="1px solid #eee">
                        <Box px={4} py={3} color="#666" fontSize="12px">Signed in</Box>
                      </Box>
                      <Button variant="ghost" w="90%" display="flex" flexDir="column" justifyContent="center" alignItems="center" textAlign="center" py={3} px={4} minH={{ base: 14, md: 12 }} bg="white" borderWidth="1px" borderColor="#e5e7eb" rounded="xl" boxShadow="xs" transition="all 0.15s ease" _hover={{ bg: 'white', boxShadow: 'sm' }} _active={{ bg: 'white', boxShadow: 'xs' }} onClick={() => { onAcctClose(); go('/userdashboard/'); }} my={3} mx={3} position="relative" zIndex={1}>
                        <Box as="span" lineHeight={0} mb={1}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </Box>
                        <Box as="span" color="#111" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" whiteSpace="normal" wordBreak="break-word" lineHeight="1.25">View Profile</Box>
                      </Button>
                      <Button variant="ghost" w="90%" display="flex" flexDir="column" justifyContent="center" alignItems="center" textAlign="center" py={3} px={4} minH={{ base: 14, md: 12 }} bg="white" borderWidth="1px" borderColor="#e5e7eb" rounded="xl" boxShadow="xs" transition="all 0.15s ease" _hover={{ bg: 'white', boxShadow: 'sm' }} _active={{ bg: 'white', boxShadow: 'xs' }} onClick={() => { onAcctClose(); go('/activity'); }} my={3} mx={3} position="relative" zIndex={1}>
                        <Box as="span" lineHeight={0} mb={1}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Box>
                        <Box as="span" color="#111" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" whiteSpace="normal" wordBreak="break-word" lineHeight="1.25">Activity</Box>
                      </Button>
                      {isAdmin && (
                        <Button variant="ghost" w="90%" display="flex" flexDir="column" justifyContent="center" alignItems="center" textAlign="center" py={3} px={4} minH={{ base: 14, md: 12 }} bg="white" borderWidth="1px" borderColor="#e5e7eb" rounded="lg" boxShadow="xs" transition="all 0.15s ease" _hover={{ bg: 'white', boxShadow: 'sm' }} _active={{ bg: 'white', boxShadow: 'xs' }} onClick={() => { onAcctClose(); go('/admin/'); }} my={3} mx={4} position="relative" zIndex={2} borderRadius="xl">
                          <Box as="span" lineHeight={0} mb={1}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Box>
                          <Box as="span" color="#111" fontSize={{ base: 'sm', md: 'md' }} fontWeight="600" whiteSpace="normal" wordBreak="break-word" lineHeight="1.25">Admin</Box>
                        </Button>
                      )}
                      {isBlogger && (
                        <Button variant="ghost" w="100%" display="flex" flexDir="column" justifyContent="center" alignItems="center" textAlign="center" py={3} px={4} minH={{ base: 14, md: 12 }} bg="white" borderWidth="1px" borderColor="#e5e7eb" rounded="xl" boxShadow="xs" transition="all 0.15s ease" _hover={{ bg: 'white', boxShadow: 'sm' }} _active={{ bg: 'white', boxShadow: 'xs' }} onClick={() => { onAcctClose(); go('/seo/blogs'); }} my={3} mx={3} position="relative" zIndex={1}>
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
                    <Box px={4} pb={3}>
                      <Button colorScheme="red" w="100%" borderRadius="md" fontWeight="600" onClick={() => { onAcctClose(); HandleUserLogout(); ShowLogOutMessage(); }}>
                        Log out
                      </Button>
                    </Box>
                    {/* Spacer to ensure last item is not hidden behind mobile bottom nav */}
                    <Box h={{ base: 16, md: 0 }} />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <Menu placement="bottom-end" isLazy strategy="fixed">
              <MenuButton as={Button} aria-label="Profile" variant="ghost" bg="transparent" _hover={{ bg: "transparent" }} px={1}>
                <Flex align="center" gap={2}>
                  <Box as="span" border="1px solid rgba(0,0,0,0.1)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center" overflow="hidden" bg="gray.100">
                    {avatarUrl ? (
                      <Box 
                        as="img" 
                        src={avatarUrl.includes('http') ? avatarUrl : `${process.env.REACT_APP_API_URL || ''}${avatarUrl}`} 
                        alt={firstName || 'Profile'} 
                        w="100%" 
                        h="100%" 
                        objectFit="cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <Box 
                      as="span" 
                      display={!avatarUrl ? 'flex' : 'none'} 
                      alignItems="center" 
                      justifyContent="center" 
                      w="100%" 
                      h="100%" 
                      bg="blue.500" 
                      color="white"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {firstName ? firstName.charAt(0).toUpperCase() : 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      }
                    </Box>
                  </Box>
                  {firstName && (
                    <Box as="span" color={colorChange ? "white" : "#111"} fontSize="14px" fontWeight="600" display={{ base: "none", xl: "inline" }}>
                      {firstName}
                    </Box>
                  )}
                </Flex>
              </MenuButton>
              <Portal>
                <MenuList p={1} minW="220px" maxH="60vh" overflowY="auto" zIndex={14000} border="1px solid #e5e7eb" boxShadow="lg" rounded="xl" bg="white">
                  <Box px={3} pt={2} pb={2} color="#666" fontSize="12px">Signed in</Box>
                  <Box h="1px" bg="#eee" />
                  <MenuItem onClick={() => go('/userdashboard/')} fontSize="14px" py={2.5} _hover={{ bg: '#f9fafb' }}>
                    <Box as="span" lineHeight={0} mr={3}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </Box>
                    View Profile
                  </MenuItem>
                  <MenuItem onClick={() => go('/activity')} fontSize="14px" py={2.5} _hover={{ bg: '#f9fafb' }}>
                    <Box as="span" lineHeight={0} mr={3}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                    Activity
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => go('/admin/')} fontSize="14px" py={2.5} _hover={{ bg: '#f9fafb' }}>
                      <Box as="span" lineHeight={0} mr={3}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Box>
                      Admin
                    </MenuItem>
                  )}
                  {isBlogger && (
                    <MenuItem onClick={() => go('/seo/blogs')} fontSize="14px" py={2.5} _hover={{ bg: '#f9fafb' }}>
                      <Box as="span" lineHeight={0} mr={3}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 5h14v14H5z" stroke="#111" strokeWidth="1.6"/>
                          <path d="M8 9h8M8 12h8M8 15h5" stroke="#111" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                      </Box>
                      Blog
                    </MenuItem>
                  )}
                  <Box h="1px" bg="#eee" />
                  <MenuItem onClick={() => { HandleUserLogout(); ShowLogOutMessage(); }} fontSize="14px" py={2.5} _hover={{ bg: '#fef2f2' }}>
                    <Box as="span" lineHeight={0} mr={3}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 17l5-5-5-5" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12H9" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                    Log out
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          )
        ) : (
          <>
            <Button onClick={showModal} aria-label="Profile" variant="ghost" bg="transparent" _hover={{ bg: "transparent" }} px={1}>
              <Flex align="center" gap={2}>
                <Box as="span" border="1px solid rgba(0,0,0,0.1)" borderRadius="full" w="32px" h="32px" display="inline-flex" alignItems="center" justifyContent="center" bg="gray.100">
                  <Box as="span" lineHeight={0} color="gray.500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </Box>
                </Box>
                <Box as="span" color={colorChange ? "white" : "#111"} fontSize="14px" display={{ base: "none", xl: "inline" }}>Log in</Box>
              </Flex>
            </Button>
            <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="login" />
          </>
        )}
      </Box>

      {/* Desktop Post Property CTA with moving red border */}
      <Box display={{ base: 'none', md: 'inline-flex' }} ml={0.5}>
        {/* <Link to="/postproperty/"> */}
        <div onClick={() => {
  if (token) {
    window.location.href = '/postproperty/';
  } else {
    setShowAuth(true);
  }
}}>
  <MovingBorderButton
    borderRadius="1.75rem"
    className="text-black cursor-pointer"
    bgColor="#ffffff"
    ringColor={colorChange ? "#FACC15" : "#ef4444"}
  >
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
      <span style={{ fontSize: '14px' }}>Post Property</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#FACC15', color: '#e11d48', padding: '4px 14px', fontSize: '12px', fontWeight: 900, lineHeight: 1, clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }}>
        FREE
      </span>
    </span>
  </MovingBorderButton>
</div>
        {/* </Link> */}
      </Box>
    </Flex>
  );
}