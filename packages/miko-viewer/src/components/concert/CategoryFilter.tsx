import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Text, HStack, Icon, VStack, Center } from '@chakra-ui/react';
import { categoryArray } from '@src/const';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo } from 'react';

const allConcertURL = '/concerts';

const CategoryFilter = memo(() => {
  const router = useRouter();
  const curCategoryId = parseInt(router.query.category_id as string);
  const setCategory = id => {
    if (id === curCategoryId) {
      const { category_id, ...rest } = router.query;
      router.query = rest;
    } else {
      router.query.category_id = id;
    }

    router.query.page = '1';
    router.push(router, undefined, { shallow: true });
  };

  return (
    <HStack pb={8}>
      <Button
        borderRadius="md"
        h="60px"
        w="full"
        border="none"
        key={0}
        onClick={() => router.push(allConcertURL)}
        m={1}
        bg={router.asPath === allConcertURL ? 'teal.300' : 'gray.100'}
        color={router.asPath === allConcertURL ? 'white' : 'teal.300'}
        _hover={{ bg: 'teal.300', color: 'white' }}
      >
        <Text fontWeight="bold">All</Text>
      </Button>
      {categoryArray.map((category, idx) => (
        <Button
          borderRadius="md"
          h="60px"
          w="full"
          border="none"
          key={idx + 1}
          onClick={() => setCategory(idx + 1)}
          m={1}
          bg={curCategoryId === idx + 1 ? 'teal.300' : 'gray.100'}
          color={curCategoryId === idx + 1 ? 'white' : 'teal.300'}
          _hover={{ bg: 'teal.300', color: 'white' }}
        >
          <Text fontWeight="bold">{category}</Text>
        </Button>
      ))}
    </HStack>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
