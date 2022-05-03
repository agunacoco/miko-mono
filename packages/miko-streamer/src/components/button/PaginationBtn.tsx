import { Button, Center, Flex, Heading } from '@chakra-ui/react';
import { Meta } from '@src/types/share/common';
import { ComponentProps, FC } from 'react';

type Props = {
  data: Meta;
  setPage: (page: number) => void;
};

const PageBtn: FC<{ text: number | string } & ComponentProps<typeof Button>> = ({ text, ...props }) => {
  return (
    <Button {...props} colorScheme="gray" flexGrow={1} maxW="120px">
      <Heading size="sm">{text}</Heading>
    </Button>
  );
};

const MAX_TOTAL_BTN = 11;
const MAX_SIDE_BTN = Math.floor(MAX_TOTAL_BTN / 2);

const PaginationBtn: FC<Props> = ({ data: { current_page, last_page }, setPage }) => {
  const [curPage, lastPage, startPage] = [current_page, last_page, 1];

  const onPageChangeHandler = (page: number) => {
    setPage(page);
  };

  const onBeforePageHandler = () => {
    setPage(curPage - 1);
  };

  const onNextPageHandler = () => {
    setPage(curPage + 1);
  };

  const leftBtnNum = Math.max(curPage - startPage, 0);
  const rightBtnNum = Math.max(lastPage - curPage, 0);

  return (
    <Flex justifyContent="center">
      <Flex justifyContent="center" columnGap="10px" width="container.lg">
        <Center width="30px">{curPage !== startPage && <PageBtn text="<" onClick={onBeforePageHandler} />}</Center>
        <Center flexGrow={1} gap="5px">
          {new Array(leftBtnNum)
            .fill(0)
            .slice(0, Math.max(MAX_SIDE_BTN, MAX_TOTAL_BTN - 1 - rightBtnNum))
            .map((_, idx) => <PageBtn key={curPage + idx} text={curPage - idx - 1} onClick={() => onPageChangeHandler(curPage - idx - 1)} />)
            .reverse()}
          <PageBtn key={curPage} text={curPage} color="green.400" />
          {new Array(rightBtnNum)
            .fill(0)
            .slice(0, Math.max(MAX_SIDE_BTN, MAX_TOTAL_BTN - 1 - leftBtnNum))
            .map((_, idx) => {
              return <PageBtn key={curPage + idx + 1} text={curPage + idx + 1} onClick={() => onPageChangeHandler(curPage + idx + 1)} />;
            })}
        </Center>
        <Center width="30px">{curPage !== lastPage && <PageBtn text=">" onClick={onNextPageHandler} />}</Center>
      </Flex>
    </Flex>
  );
};

export default PaginationBtn;
