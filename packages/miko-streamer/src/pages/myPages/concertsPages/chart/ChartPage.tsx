import { Flex } from '@chakra-ui/react';

import DefaultChart from './DefaultChart';

const COLORS = ['#36C5F0', '#2EB67D', '#E01E5A', '#ECB22E', '#E51670', 'red'];

const ChartPage = () => {
  return (
    <Flex flexWrap="wrap" w="full" h="full" overflowY="scroll" rowGap="100px" px="2" py="4">
      <DefaultChart title="スコア増加値" type="caspt" colors={COLORS[0]} />
      <DefaultChart title="接続ユーザー" type="ctceun" colors={COLORS[1]} />
      <DefaultChart title="スーパーチャット" type="ctascpt" colors={COLORS[2]} />
      <DefaultChart title="一般チャット" type="ctacpt" colors={COLORS[3]} />
    </Flex>
  );
};

export default ChartPage;
