import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { body: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif' };

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

//  NOTE  defaultProps 는 colorScheme, variant, and size
//  NOTE app components는 html class가 붙는 경우만 적용됨 ex chakra-text
const theme = extendTheme({
  config,
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
        },
      },
    },
  },
});

export default theme;
