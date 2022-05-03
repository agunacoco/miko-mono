import { Box, Center, Heading, HStack } from '@chakra-ui/react';
import { ResponsiveLineCanvas } from '@nivo/line';
import { BiData } from '@react-icons/all-files/bi/BiData';
import { convertDateUTC } from '@src/helper/convertDate';
import { useData } from '@src/state/swr/useData';
import { ConcertAddedScorePerTime } from '@src/types/entity/ConcertAddedScorePerTime';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const LEFT_MARGIN = 60;

const NivoLineChart: FC<{ start: string; end: string; type: string; colors?: string | string[] }> = ({ end, start, type, colors }) => {
  const [left, setLeft] = useState(100);
  const { ticketId } = useParams();
  const { data } = useData<ConcertAddedScorePerTime>(`/data/${type}`, { start, end, filter: [['ticket_id', ticketId as string]] });

  const newData = useMemo(() => {
    if (data) {
      const newList: Pick<ConcertAddedScorePerTime, 'x' | 'y'>[] = [];
      data.data.forEach((value, idx) => {
        const { x, y } = value;

        //   길이가 1인 경우 대비.
        const supplementEndLeak = () => {
          if (idx === data.data.length - 1) {
            const diff = dayjs(end + 'Z').diff(value.x, 'm');
            if (diff > 0) {
              const dayLastData = dayjs(value.x);
              new Array(diff).fill(0).forEach((_, idx) => {
                newList.push({ x: convertDateUTC(dayLastData.add(idx + 1, 'm'), 'ISO8601NoZ') + '.000000Z', y: 0 });
              });
            }
          }
        };

        if (idx === 0) {
          // NOTE start에 z 붙여줘야함.
          const diff = dayjs(value.x).diff(start + 'Z', 'm');
          if (diff > 0) {
            const dayStart = dayjs(start + 'Z');
            new Array(diff).fill(0).forEach((_, idx) => {
              newList.push({ x: convertDateUTC(dayStart.add(idx + 1, 'm'), 'ISO8601NoZ') + '.000000Z', y: 0 });
            });
          }
          newList.push({ x, y });
          supplementEndLeak();
          return;
        }
        const a = data.data[idx - 1].x;
        const b = data.data[idx].x;
        const dayA = dayjs(a).set('s', 0); // 전꺼
        const dayB = dayjs(b).set('s', 0); // 현재
        const diff = dayB.diff(dayA, 'm') - 1;

        if (diff > 0) {
          new Array(diff).fill(0).forEach((_, idx) => {
            newList.push({ x: convertDateUTC(dayA.add(idx + 1, 'm'), 'ISO8601NoZ') + '.000000Z', y: 0 });
          });
        }
        newList.push({ x, y });

        supplementEndLeak();
      });
      // console.log("-----------");
      // console.log(data.data);
      // console.log(newList);
      // console.log("-----------");

      return newList;
    }
  }, [data, start, end]);

  if (!newData) return <Box>Error</Box>;
  if (!data) return <Box>Error</Box>;

  return (
    <>
      {data.data.length === 0 ? (
        <Center w="full" h="full">
          <HStack fontSize="4xl">
            <BiData fontSize="60px" color="#39c5bb" />
            <Heading>No Data</Heading>
          </HStack>
        </Center>
      ) : (
        <Box position="relative" w="full" h="full">
          {/* <Box position="absolute" left={left + "px"} w="1px" h="full" bgColor="black" pointerEvents="none"></Box> */}
          {/* @ts-ignore */}
          <ResponsiveLineCanvas
            // -- SVG --
            // animate={false}
            // motionConfig="wobbly"
            // enableSlices="x"
            enableSlices="x"
            isInteractive
            //
            onClick={(point, e) => {
              setLeft(point.x + LEFT_MARGIN);
            }}
            // onMouseMove={(point, e) => {
            //   setLeft(point.x + LEFT_MARGIN);
            // }}
            data={[{ data: newData, id: `score-${start}=${end}` }]}
            //  -- X axis --
            xScale={{
              type: 'time',
              //   format: "%Y-%m-%d",
              format: '%Y-%m-%dT%H:%M:%S.000000Z',
              //   format: "%Y-%m-%dT%t:18:00.000000Z",
              precision: 'minute',
            }}
            xFormat="time:%Y-%m-%dT%H:%M:%S"
            //  -- Y axis --
            yScale={{
              type: 'linear',
              stacked: false, // ?
              min: 'auto',
              max: 'auto',
            }}
            // yFormat=" >-.2f"
            curve="linear" // or Step
            margin={{ top: 5, right: 50, bottom: 50, left: LEFT_MARGIN }}
            axisTop={null}
            axisRight={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: '.2s',
              legend: '',
              legendOffset: 0,
            }}
            axisBottom={{
              //   tickValues: [0, 20, 40, 60, 80, 100, 120],
              tickValues: 'every 5 minutes',
              tickSize: 10,
              tickPadding: 20,
              tickRotation: 40,
              format: '%H:%M',

              //   legend: "price",
              //   legendOffset: 36,
              //   legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: '.2s',
              legend: 'score',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            // -- Color --
            // colors={{ scheme: "set1" }}
            // colors={{ datum: "color" }}
            colors={colors || ['hsl(54,78%,72%)']}
            // -- Line --
            lineWidth={2}
            // -- Area --
            enableArea={true}
            areaOpacity={0.3}
            // -- Point --
            pointSize={6}
            // pointColor={{ from: "color" }}
            pointColor={'white'}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            // useMesh={true}
            //  -- Grid --
            enableGridX={false}
            enableGridY={true}
            // gridXValues={[0, 20, 40, 60, 80, 100, 120]}
            // gridYValues={[0, 500, 1000, 1500, 2000, 2500]}

            // -- 레전드 --
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 2,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 12,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      )}
    </>
  );
};

export default NivoLineChart;
