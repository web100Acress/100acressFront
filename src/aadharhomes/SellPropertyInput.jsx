import { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  option,
  Radio,
  RadioGroup,
  Stack,
  Tag, TagLabel, TagCloseButton, useRadio, useRadioGroup, HStack, InputRightAddon
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import CustomRadioGroup from "./utility/CustomRadioGroup";
import ImageUpload from "./utility/ImageUpload";

const Form1 = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const details = {
    PropertyName: "",
    propetyType: "",
    Area: 0,
    city: "",
    state: "",
    address: "",
    LandMark: "",
    // slide2
    furnishing: false,
    buildYear: "",
    type: "",
    amenities: [""],
    availableDate: "",
    //slide3
    frontImage: "",
    otherImage: [""],
    price: 0,
    description: "",
  };
  return (
    <>
     <div>
     <Heading  w='100%' paddingRight={"4%"} textAlign={"center"} fontWeight='normal' mb='2%'>
        Property Details
      </Heading>
      <Flex>
        <FormControl  mr='5%' w={"50%"} >
          <FormLabel htmlFor='PropertyName' fontWeight={"normal"}>
            Property Name
          </FormLabel>
          <Input className="text-sm pl-0" id='PropertyName' placeholder='Property Name' />
        </FormControl>

        <FormControl w={"50%"}>
          <FormLabel htmlFor='propertyType' fontWeight={"normal"}>
            Select  property
          </FormLabel>
          <Select placeholder='Select option'>
            <option value='option1'>Commercial</option>
            <option value='option2'>Residential</option>
          </Select>
        </FormControl>
      </Flex>

      <FormControl mt='2%' as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor='country'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}>
          Country / Region
        </FormLabel>
        <Select
          id='country'
          name='country'
          autoComplete='country'
          placeholder='Select option'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'>
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor='postal_code'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          PIN / Postal
        </FormLabel>
        <Input
          type='text'
          name='postal_code'
          id='postal_code'
          autoComplete='postal-code'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor='city'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          City
        </FormLabel>
        <Input
          type='text'
          name='city'
          id='city'
          autoComplete='city'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor='state'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          State / Province
        </FormLabel>
        <Input
          type='text'
          name='state'
          id='state'
          autoComplete='state'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor='street_address'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          w={'600'}
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          Street address
        </FormLabel>
        <Input
          type='text'
          name='street_address'
          id='street_address'
          autoComplete='street-address'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>
     </div>
    </>
    
  );
};

const Form2 = () => {
  const [amenity, setAmenity] = useState([]); 
  const [newAmenity, setNewAmenity] = useState(""); 



  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newAmenity.trim() !== "") {

      setAmenity([...amenity, newAmenity.trim()]); 
      setNewAmenity(""); 
    }
  };

  
  const handleInputChange = (e) => {
    setNewAmenity(e.target.value);
  };

  const squareRadioButtonArgument_object = {
    options: ['yes', 'no',],
    groupName: 'dynamicGroup',
    defaultOption: 'no',
  }

  return (
    <>
      <Heading w='100%' textAlign={"center"} fontWeight='normal' mb='2%'>
        About Property
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor='country'
          fontSize='md'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}>
          Furnishing
        </FormLabel>

        <CustomRadioGroup options={squareRadioButtonArgument_object.options} name={squareRadioButtonArgument_object.groupName} defaultValue={squareRadioButtonArgument_object.defaultOption} />

      </FormControl>

      <FormControl mt='3' as={GridItem} colSpan={[3, 2]}>
        <FormLabel
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}>
          Area
        </FormLabel>
        <InputGroup size='sm'>
          <Input
            type='number'
            placeholder='area'
            focusBorderColor='brand.400'
            rounded='md'
          />
          <InputRightAddon children='yard²' />
        </InputGroup>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor='street_address'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          Build Year
        </FormLabel>
        <Input
          type='number'
          name='street_address'
          id='street_address'
          autoComplete='street-address'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor='Type'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          Type
        </FormLabel>
        <Input
          type='text'
          name='city'
          id='city'
          autoComplete='city'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor='Ammenities'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          Ammenities
        </FormLabel>
        <Input
          placeholder="Press 'Enter' to add"
          type='text'
          name='staAmmenitieste'
          id='Ammenities'
          autoComplete='Ammenities'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
          value={newAmenity}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <Box spacing={4}>
          {amenity.map((amenities, index) => (
            <Tag
              m={"1"}
              size='md'
              key={index}
              borderRadius='full'
              variant='solid'
              colorScheme='blue'>
              <TagLabel>{amenities}</TagLabel>
              <TagCloseButton
                onClick={() => {
               
                  const updatedAmenity = [...amenity];
                  updatedAmenity.splice(index, 1);
                  setAmenity(updatedAmenity);
                }}
              />
            </Tag>
          ))}
        </Box>

      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor='available-date'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: "gray.50",
          }}
          mt='2%'>
          Available date
        </FormLabel>
        <Input
          type='text'
          name='postal_code'
          id='postal_code'
          autoComplete='postal-code'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>
    </>
  );
};

export const Form3 = () => {
  const inputStyle = {
    height: "2.5rem", // Adjust the height here as needed
    
  };
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal">
        Front Image
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
           
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Preview Image
          </FormLabel>
          <Input
            type="file"
            placeholder="Upload image"
            paddingTop={"4px"}
            focusBorderColor="brand.400"
            rounded="md"
            style={inputStyle}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={[3,2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Other Images (Up to 3)
          </FormLabel>
          <Input
            type="file"
            multiple
            placeholder="Upload up to 3 images"
            focusBorderColor="brand.400"
            rounded="md"
            paddingTop={"4px"}
          />

          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Price
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
              ₹
            </InputLeftAddon>
            <Input
              type="number"
              placeholder="Price"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Description
          </FormLabel>
          <Textarea
            placeholder="More about your property"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
          />
          <FormHelperText>
            Brief description for your property. URLs are hyperlinked.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};


export default function SellPropertInput() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  return (
    <>
      <Box
        borderWidth='1px'
        rounded='lg'
        shadow='1px 1px 3px rgba(0,0,0,0.3)'
        maxWidth={"900px"}
      
        p={6}
        m='10px auto'
        as='form'>
        <Progress
          hasStripe
          value={progress}
          mb='5%'
          mx='5%'
          isAnimated></Progress>
      {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt='5%' w='100%'>
          <Flex w='100%' justifyContent='space-between'>
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme='teal'
                variant='solid'
                w='7rem'
                mr='5%'>
                Back
              </Button>

              <Button
                w='4.2rem'
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme='teal'
                variant='outline'>
                Next
              </Button>
              
            </Flex>
            {step === 3 ? (
              <Button
                w='5rem'
                colorScheme='red'
                variant='solid'
                onClick={() => {
                  toast({
                    title: "your property hasd been added.",
                    description: "you can check at listing page",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}