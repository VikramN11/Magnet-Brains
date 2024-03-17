import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink} from '@chakra-ui/react'
import axios from 'axios'


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if (!name || !email || !password) {
     setErrMessage('Please fill in all fields.');
   } 
   else if (!name || !/^[a-zA-Z\s]*$/.test(name)) {
    setErrMessage('Please enter a valid name.');
   }
   else if (!validateEmail(email)) {
     setErrMessage('Please enter a valid email address.');
   } else if (!password || !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
     setErrMessage('Password is invalid. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
} else {
   try{
     const payload = {name, email, password};

     await axios.post(`https://nice-gray-scarab-coat.cyclic.app/users/register`, payload).then(res=>{
       console.log(res.data);
       alert("Registration Successful");
       navigate("/login")
       setName('');
       setEmail('');
       setPassword('');
       setErrMessage('');
      }).catch(err=>{
       console.log(err)});
   }
   catch (error) {
       console.log(error);
       setErrMessage('Registration failed. Please try again later.');
     }
 }
}

const validateEmail = (email)=>{
 const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegexp.test(email);
}

  return (
    <div>
      <Flex
      minH={'80vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={12} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={400}>
          <Stack spacing={4}>    
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={e=>setName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={e=>setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={e=>setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <ChakraLink as={ReactRouterLink} to='/login'>Login</ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </div>
  )
}

export default Signup