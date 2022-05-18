import { Box, Button, CSSObject, Heading, HStack, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Concert } from '@miko/share-types';
import { FC } from 'react';
import { IMAGE_DOMAIN } from '../../const';
import { convertDate } from '../../helper';

const oneLine: CSSObject = {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  height: '1.2em',
  lineHeight: '1.2',
};

const RankingCard: FC<{ concert: Concert; topTitle: string }> = ({ concert, topTitle }) => {
  return (
    <Box w="full" shadow="base" borderWidth="1px" alignSelf={{ base: 'center', lg: 'flex-start' }} borderColor={useColorModeValue('gray.200', 'gray.500')} borderRadius={'xl'}>
      <Box position="relative">
        {
          <Box position="absolute" top="-16px" left="50%" style={{ transform: 'translate(-50%)' }}>
            <Text textTransform="uppercase" bg={useColorModeValue('red.300', 'red.700')} px={3} py={1} color="white" fontSize="sm" fontWeight="600" rounded="xl">
              {topTitle}
            </Text>
          </Box>
        }
        <Box>
          <VStack py={5} px={12} spacing={3}>
            <Heading sx={oneLine} size="lg">
              {concert.title}
            </Heading>
            <Image w={300} h={380} fit="cover" src={IMAGE_DOMAIN + concert.coverImage} rounded="base" shadow="md" />
          </VStack>
          <VStack h="full" bg={useColorModeValue('gray.50', 'gray.700')} py={4} borderBottomRadius={'xl'}>
            <HStack pt={1}>
              <Box>
                <Text fontWeight="350" color="#696969">
                  Artist:
                </Text>
                <Text fontWeight="350" color="#696969">
                  Concert Start Date:
                </Text>
                <Text fontWeight="350" color="#696969">
                  Concert End Date:
                </Text>
              </Box>
              <Box>
                <Text maxW="210px" sx={oneLine} fontWeight="440">
                  {concert.artist}
                </Text>
                <Text fontWeight="440">{convertDate(concert.allConcertStartDate, 'YMDHMS')}</Text>
                <Text fontWeight="440"> {convertDate(concert.allConcertEndDate, 'YMDHMS')}</Text>
              </Box>
            </HStack>

            <Box w="80%" py={4}>
              <Button
                w={'full'}
                bg={'purple.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(118 0 205 / 43%)'}
                _hover={{
                  bg: 'purple.500',
                }}
              >
                See the concert details
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default RankingCard;
