import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import SellPropertyInput from "./SellPropertyInput";
import Nav from "./Nav";
import Footer from "../Components/Actual_Components/Footer";

export default function SellPropertInput() {
  return (
    <>
      <Nav />

      {/* <div className="flex">
        <div className="w-full md:w-1/2 h-5/6">
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 10, md: 10 }}
            direction={{ base: "column", md: "row" }}
            paddingLeft={{ base: "0", lg: "120", md: "55" }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                paddingTop={20}
                fontSize={{ base: "2xl", sm: "3xl", lg: "5xl" }} // Adjusted font sizes
              >
                <Text
                  as={"span"}
                  position={"relative"}
                  _after={{
                    content: "''",
                    width: "full",
                    height: "20%", // Adjusted height
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    bg: "red.400",
                    zIndex: -1,
                  }}
                >
                  Post your property
                </Text>
                <br />
                <Text as={"span"} color={"red.400"}>
                  get the best prices
                </Text>
              </Heading>
              <Text
                color={"gray.500"}
                maxW={"500px"}
                width={"100%"}
                fontSize={["sm", "md", "lg"]}
              >
                100acress is the best place to sell your property, we are
                dedicated to providing advisory and mediation services for all
                your needs; you can expect us every time. All that is for you!
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <Button
                  rounded={"full"}
                  size={{ base: "md", sm: "lg" }} // Adjusted button size
                  fontWeight={"normal"}
                  px={{ base: 4, sm: 6 }} // Adjusted horizontal padding
                  py={{ base: 3, sm: 4 }} // Adjusted vertical padding
                  colorScheme={"red"}
                  bg={"red.400"}
                  _hover={{ bg: "red.500" }}
                >
                  Get started
                </Button>
                <Button
                  rounded={"full"}
                  size={{ base: "md", sm: "lg" }} // Adjusted button size
                  fontWeight={"normal"}
                  px={{ base: 4, sm: 6 }} // Adjusted horizontal padding
                  leftIcon={<PlayIcon h={4} w={4} color={"gray.300"} />}
                >
                  How It Works
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </div>

        <div className="w-full md:w-1/2 lg:h-5/6 md:h-auto sm:h-auto">
          <SellPropertyInput />
        </div>
        
      </div> */}

      <div className=" container-fluid">
        <div className="row">
          <div className="col-md-5">
            <Stack
              align="center"
              spacing={{ base: 8, md: 10 }}
              py={{ base: 10, md: 10 }}
              direction={{ base: "column", md: "row" }}
              paddingLeft={{ base: 0, lg: 20, md: 5 }} 
              
            >
              <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  paddingTop={20}
                  fontSize={{ base: "2xl", sm: "3xl", lg: "5xl" }}
                >
                  <Text
                    as="span"
                    position="relative"
                    _after={{
                      content: "''",
                      width: "full",
                      height: "20%",
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "red.400",
                      zIndex: -1,
                      
                    }}
                  >
                    Post your property
                  </Text>
                  <br />
                  <Text as="span" color="red.400">
                    get the best prices
                  </Text>
                </Heading>
                <Text
                  color="gray.500"
                  maxW="500px"
                  width="100%"
                  fontSize={["sm", "md", "lg"]}
                  style={{width:"300px"}}
                >
                 100acress is the best place to sell your property, we are
                  dedicated to providing advisory and mediation services for all
                  your needs; you can expect us every time. All that is for you!
                </Text>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={{ base: "column", sm: "row" }}
                  marginLeft={-10}
                >
                  <Button
                    rounded="full"
                    size={{ base: "md", sm: "lg" , md: "md" }}
                    fontWeight="normal"
                    px={{ base: 4, sm: 6 }}
                    py={{ base: 3, sm: 4 }}
                    colorScheme="red"
                    bg="red.400"
                    _hover={{ bg: "red.500" }}
                  >
                    Get started
                  </Button>
                  <Button
                    rounded="full"
                    size={{ base: "md", sm: "lg", md:"md" }}
                    fontWeight="normal"
                    className="hidden md:block"
                    px={{ base: 4, sm: 6 }}
                    leftIcon={<PlayIcon h={4} w={4} color="gray.300" />}
                  >
                    How It Works
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </div>

          <div className="col-md-7 text-center">
            <div className="lg:w-4/5 md:w-[420px] lg:mx-20">
              <SellPropertyInput />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

// import Footer from "../Components/Actual_Components/Footer";
// import SellPropertyInput from "./SellPropertyInput";
// import Nav from "./Nav";
// import { Flex, Box } from "@chakra-ui/react";

// export default function SellProperty() {
//   return (
//     <>
//       <Nav />
//       <div className="container lg:px-10 max-w-7xl py-10 ">
//         <div className="flex flex-col lg:flex-row items-center md:px-10" >
//           <div className="lg:w-1/2 lg:mt-[-15rem] lg:pt-28">

//             <strong className=" sm:text-xl lg:text-2xl xl:text-3xl font-semibold relative top-2">
//               <span className="relative inline-block sm:order-2 md:m-[-1px] lg:text-5xl md:text-3xl  ">
//                 Post your property
//                 <span className="absolute bottom-[-8] left-0 w-full h-1.5 bg-red-600 z-0"></span>
//               </span>
//               <br />
//               <span className="text-red-600 md:m-[-3px] lg:pt-1 md:pt-5 lg:text-5xl md:text-3xl ">get the best prices</span>
//             </strong>
//             <p className="text-gray-500 max-w-lg lg:max-w-xl lg:pt-5 text-xs sm:text-sm md:text-base lg:text-base xl:text-xl hidden md:block md:pt-3">
//               100acres is the best place to sell your property, we are dedicated to providing advisory and mediation services for all your needs; you can expect us every time. All that is for you!
//             </p>
//           </div>

//           <Flex
//             flex={1}
//             justify="center"
//             position="relative"
//             w="full"

//           >
//             <Box
//               position="relative"
//               rounded="2xl"
//               boxShadow="l"
//               width={{ base: "full", sm: "80%", md: "100%",lg:"70%" }}
//               margin='-25px'
//               padding='14px'
//               overflow="hidden"

//             >
//               <SellPropertyInput />
//             </Box>
//           </Flex>
//         </div>

//           <p  className="text-gray-500 max-w-md lg:max-w-xl text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl md:hidden">100acres is the best place to sell your property, we are dedicated to providing advisory and mediation services for all your needs; you can expect us every time. All that is for you!</p>

//       </div>

//       <Footer />
//     </>
//   );
// }
