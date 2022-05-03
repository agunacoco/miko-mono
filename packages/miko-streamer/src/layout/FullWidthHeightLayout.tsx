import { Box } from '@chakra-ui/react';
import ErrorBoundary from '@src/components/common/ErrorBoundary';
import LoginStatus from '@src/components/display/LoginStatus';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const FullWidthHeightLayout = () => {
  return (
    <Box width="100vw" height="100vh">
      {/* @ts-ignore */}
      <ErrorBoundary>
        <Suspense fallback={<Box>loading</Box>}>
          <Outlet />
          <LoginStatus />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

export default FullWidthHeightLayout;
