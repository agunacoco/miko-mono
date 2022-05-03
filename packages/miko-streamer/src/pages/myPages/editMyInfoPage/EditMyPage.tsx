import { Box, Text } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';

const EditMyPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  return (
    <Box style={{ padding: '1rem 0' }}>
      <Text>EditMyPage</Text>
    </Box>
  );
};

export default EditMyPage;
