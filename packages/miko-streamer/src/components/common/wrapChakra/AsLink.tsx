import { Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link as ReachLink } from 'react-router-dom';

const AsLink: FC<React.ComponentProps<typeof Link>> = ({ children, ...props }) => {
  return (
    <Link as={ReachLink} {...props}>
      {children}
    </Link>
  );
};

export default AsLink;
