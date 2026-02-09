import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import HomeDesktopBlog from './homeDesktop';
import HomeMobileBlog from './homemobileblog';

const BlogIndex = () => {
  // Check if screen is smaller than 768px (mobile)
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  // Render mobile component for mobile, desktop for desktop
  return isSmallerThan768 ? <HomeMobileBlog /> : <HomeDesktopBlog />;
};

export default BlogIndex;
