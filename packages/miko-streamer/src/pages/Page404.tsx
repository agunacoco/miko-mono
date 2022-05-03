import { Box, Text } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';

const Page404 = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  return (
    <Box style={{ padding: '1rem 0' }}>
      <Text>Page404</Text>
    </Box>
  );
};

export default Page404;
