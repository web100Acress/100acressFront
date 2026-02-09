  import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Portal } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// import { Link } from "react-router-dom";
import AuthModal from "../../../Resister/AuthModal";
import api from "../../../config/apiClient";
import { Button as MovingBorderButton } from "../../../Components/ui/moving-border";
import showToast from "../../../Utils/toastUtils";

export default function RightSection({
  colorChange,
  isSearchOpen,
  isHome,
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
  isHr,
  isSalesHead,
}) {
  const { isOpen: isAcctOpen, onOpen: onAcctOpen, onClose: onAcctClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const fileInputRef = useRef(null);
  const [hideRight, setHideRight] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const openAuth = () => {
      if (typeof setShowAuth === 'function') setShowAuth(true);
    };
    const closeAuth = () => {
      if (typeof setShowAuth === 'function') setShowAuth(false);
    };

    try {
      window.addEventListener('showAuthModal', openAuth);
      window.addEventListener('closeAuthModal', closeAuth);
    } catch (_) {}

    return () => {
      try {
        window.removeEventListener('showAuthModal', openAuth);
        window.removeEventListener('closeAuthModal', closeAuth);
      } catch (_) {}
    };
  }, [setShowAuth]);

  useEffect(() => {
    setHideRight(false);
  }, [isMobile]);

  const handleFileChange = async (e) => {
    try {
      const file = (e.target.files && e.target.files[0]) || null;
      if (!file || !userId) return;
      const isImage = (file.type || '').toLowerCase().startsWith('image/');
      const maxSize = 5 * 1024 * 1024;
      if (!isImage) { showToast.error('Only image files are allowed'); return; }
      if (file.size > maxSize) { showToast.error('File too large (max 5MB)'); return; }
      if (!token) { showToast.error('Please log in to change your photo'); return; }
      const form = new FormData();
      form.append('avatar', file);
      const res = await api.post(`/postPerson/users/${userId}/avatar`, form);
      const url = res?.data?.data?.avatarUrl || '';
      if (url && typeof onAvatarUpdated === 'function') onAvatarUpdated(url);
      showToast.success('Profile photo updated');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Upload failed';
      showToast.error(msg);
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
        color={isHome ? "white" : (!colorChange ? "red" : "white")}
        _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }}
        opacity={{ base: !isSearchOpen ? 1 : 0, md: !colorChange && !isSearchOpen ? 1 : 0 }}
        transition="opacity 300ms ease"
        pointerEvents={{ base: !isSearchOpen ? "auto" : "none", md: !colorChange && !isSearchOpen ? "auto" : "none" }}
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
                      color={isHome ? "white" : (!colorChange ? "red" : "white")}
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
              {/* Mobile Drawer */}
              <div className={`fixed inset-0 z-[15000] ${isAcctOpen ? 'visible' : 'invisible'}`}>
                {/* Overlay */}
                <div 
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAcctOpen ? 'opacity-50' : 'opacity-0'}`}
                  onClick={onAcctClose}
                />
                
                {/* Drawer Content */}
                <div className={`absolute right-0 top-0 h-full w-[260px] max-w-[260px] bg-white shadow-xl transform transition-transform duration-300 ${isAcctOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                  {/* Drawer Header - Close button on LEFT, Avatar on RIGHT */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    {/* Close Button - LEFT SIDE */}
                    <button 
                      onClick={onAcctClose}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Name and Avatar - RIGHT SIDE */}
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-gray-900">
                        {firstName || 'Account'}
                      </span>
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                        {avatarUrl ? (
                          <img 
                            src={avatarUrl.includes('http') ? avatarUrl : `${process.env.REACT_APP_API_URL || ''}${avatarUrl}`}
                            alt={firstName || 'Profile'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <span 
                          className={`${!avatarUrl ? 'flex' : 'hidden'} items-center justify-center w-full h-full bg-blue-500 text-white text-sm font-bold`}
                        >
                          {firstName ? firstName.charAt(0).toUpperCase() : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drawer Body */}
                  <div className="flex flex-col justify-between h-[calc(100%-60px)] overflow-y-auto pb-6">
                    <div className="p-3 space-y-3">
                      {/* View Profile */}
                      <button 
                        onClick={() => { onAcctClose(); go('/userdashboard/'); }}
                        className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all"
                      >
                        <span className="mb-1">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span className="text-gray-900 text-sm font-semibold">View Profile</span>
                      </button>
      
                      {/* Activity */}
                      <button 
                        onClick={() => { onAcctClose(); go('/activity'); }}
                        className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all"
                      >
                        <span className="mb-1">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span className="text-gray-900 text-sm font-semibold">Activity</span>
                      </button>
      
                      {/* Admin */}
                      {isAdmin && (
                        <button 
                          onClick={() => { onAcctClose(); go('/admin/'); }}
                          className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all"
                        >
                          <span className="mb-1">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className="text-gray-900 text-sm font-semibold">Admin</span>
                        </button>
                      )}
      
                      {/* Blogger */}
                      {isBlogger && (
                        <button 
                          onClick={() => { onAcctClose(); go('/seo/blogs'); }}
                          className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all"
                        >
                          <span className="mb-1">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 5h14v14H5z" stroke="#111" strokeWidth="1.6"/>
                              <path d="M8 9h8M8 12h8M8 15h5" stroke="#111" strokeWidth="1.6" strokeLinecap="round"/>
                            </svg>
                          </span>
                          <span className="text-gray-900 text-sm font-semibold">Blog</span>
                        </button>
                      )}
      
                      {/* HR */}
                      {isHr && (
                        <button 
                          onClick={() => { onAcctClose(); go('/hr/dashboard'); }}
                          className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all"
                        >
                          <span className="mb-1">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className="text-gray-900 text-sm font-semibold">HR</span>
                        </button>
                      )}
      
                      {/* Sales Head */}
                      {isSalesHead && (
                        <button 
                          onClick={() => { onAcctClose(); go('/sales-head/dashboard'); }}
                          className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all"
                        >
                          <span className="mb-1">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="9" cy="7" r="4" stroke="#111" strokeWidth="1.6"/>
                              <path d="m22 9-6 6m0-6 6 6" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <span className="text-gray-900 text-sm font-semibold">Sales Head</span>
                        </button>
                      )}
                    </div>
      
                    {/* Logout Button */}
                    <div className="px-4 pb-3">
                      <button 
                        onClick={() => { onAcctClose(); HandleUserLogout(); ShowLogOutMessage(); }}
                        className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                    
                    {/* Bottom spacer for mobile nav */}
                    <div className="h-16 md:h-0" />
                  </div>
                </div>
              </div>
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
                      color={isHome ? "white" : (!colorChange ? "red" : "white")}
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
                    <Box as="span" color={isHome ? "white" : (!colorChange ? "red" : "white")} fontSize="14px" fontWeight="600" display={{ base: "none", xl: "inline" }}>
                      {firstName}
                    </Box>
                  )}
                </Flex>
              </MenuButton>
              <Portal>
                <MenuList p={1} minW="220px" maxH="60vh" overflowY="auto" zIndex={14000} border="1px solid #e5e7eb" boxShadow="lg" rounded="xl" bg="white" position="relative">
                  <Flex justify="flex-end" p={2} position="absolute" top={0} right={0} zIndex={1}>
                    <IconButton
                      aria-label="Close menu"
                      icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>}
                      size="sm"
                      variant="ghost"
                      onClick={() => {}}
                      _hover={{ bg: '#f3f4f6' }}
                    />
                  </Flex>
                  <Box px={3} pt={6} pb={2} textAlign="center">
                    {firstName && (
                      <Box color="#111" fontSize="16px" fontWeight="600" mb={1}>
                        {firstName}
                      </Box>
                    )}
                    {/* <Box color="#666" fontSize="12px">Signed in</Box> */}
                  </Box>
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
                  {isHr && (
                    <MenuItem onClick={() => go('/hr/dashboard')} fontSize="14px" py={2.5} _hover={{ bg: '#f9fafb' }}>
                      <Box as="span" lineHeight={0} mr={3}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Box>
                      HR
                    </MenuItem>
                  )}
                  {isSalesHead && (
                    <MenuItem onClick={() => go('/sales-head/dashboard')} fontSize="14px" py={2.5} _hover={{ bg: '#f9fafb' }}>
                      <Box as="span" lineHeight={0} mr={3}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="9" cy="7" r="4" stroke="#111" strokeWidth="1.6"/>
                          <path d="m22 9-6 6m0-6 6 6" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Box>
                      Sales Head
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
                <Box as="span" color={isHome ? "white" : (!colorChange ? "red" : "white")} fontSize="14px" display={{ base: "none", xl: "inline" }}>Log in</Box>
              </Flex>
            </Button>
            <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="login" />
          </>
        )}
      </Box>

      {/* Desktop Post Property CTA with moving red border */}
      <Box display={{ base: 'none', md: 'inline-flex' }} ml={0.5}>
        <div onClick={() => {
  // Allow access to post property without login
  window.location.href = '/postproperty/';
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