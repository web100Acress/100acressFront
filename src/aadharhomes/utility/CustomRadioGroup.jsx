import React from 'react';
import { Box, HStack, useRadioGroup, useRadio } from '@chakra-ui/react'; // Import your UI library components here

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                _checked={{
                    bg: 'teal.600',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={4}
                py={2}
            >
                {props.children}
            </Box>
        </Box>
    );
}

function CustomRadioGroup({ options, name, defaultValue }) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: name || 'furnishing', // if you dont provide any name to it by default it will stay as furnishing or you can create a default parameter
        defaultValue: defaultValue || 'no', // Use provided defaultValue or default will stay as no
        onChange: console.log, // update this by passing prop to check values
    });

    const group = getRootProps();

    return (
        <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                );
            })}
        </HStack>
    );
}


export default CustomRadioGroup;