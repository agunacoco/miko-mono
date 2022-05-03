import { Box, Button, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useIvsPlayer } from '@src/state/hooks/dynamicHooks';
import { isOnMiniPlayerState, m3u8State } from '@src/state/recoil';
import type * as ivs from 'amazon-ivs-player';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const jwt =
  'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJhd3M6Y2hhbm5lbC1hcm4iOiJhcm46YXdzOml2czp1cy1lYXN0LTE6MTIxMzIzNjg0MTI4OmNoYW5uZWwvQ2o1eW5rOTdzRUp2IiwiYXdzOmFjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbiI6IioiLCJleHAiOjE2NDY4MDg2MjQsImlhdCI6MTY0NDM4OTg2OX0.fmdaERbkxkNAThbJtFNv-JScxNl0dy1TSsS7gYWZmOWokUS-teTlZrMKwRvfaIXrUPRpBH7KQoI0n6wOOuOqwODM24mOpgv7OrUb6GBfTllKFes0XZ3sMCpey6bnkzya';

const Video = styled.video`
  background-color: #292929;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

const MiniPlayer: FC = () => {
  const IVSPlayer = useIvsPlayer();
  const player = useRef<ivs.MediaPlayer>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const m3u8 = useRecoilValue(m3u8State);
  const [isOneMiniPlayer, setIsOnMiniPlayer] = useRecoilState(isOnMiniPlayerState);
  const [loading, setLoading] = useState(true);
  const [selectableQuality, setSelectableQuality] = useState<ivs.Quality[]>([]);

  useEffect(() => {
    if (!IVSPlayer) return;

    const { ENDED, PLAYING, READY, BUFFERING, IDLE } = IVSPlayer.PlayerState;
    const { REBUFFERING, QUALITY_CHANGED, PLAYBACK_BLOCKED, ERROR, BUFFER_UPDATE, AUDIO_BLOCKED } = IVSPlayer.PlayerEventType;
    const { isPlayerSupported } = IVSPlayer;

    // @ts-ignore
    // const aPlayer = ; // web 버전이어서 wasm 넣어줄 필요는 없음.
    // @ts-ignore
    player.current = IVSPlayer.create();
    console.log('bbbbbb', player.current);
    player.current.setLiveLowLatencyEnabled(true);
    player.current.setRebufferToLive(true); // NOTE
    console.log('is low?', player.current.isLiveLowLatency());
    // @ts-ignore
    // player.current.load(m3u8 + "?token=" + jwt);
    player.current.load(m3u8);
    player.current.attachHTMLVideoElement(videoEl.current as HTMLVideoElement);

    player.current.setAutoplay(true);
    player.current.setVolume(0.2);
    player.current.play();
    return () => {};
  }, [IVSPlayer]);

  useEffect(() => {
    if (!player.current) return;
    const { ENDED, PLAYING, READY, BUFFERING, IDLE } = IVSPlayer.PlayerState;
    const onStateChange = () => {
      if (!player.current) return;

      const playerState = player.current.getState();
      console.log('change state', playerState);
      setLoading(playerState === READY || playerState === BUFFERING);

      switch (playerState) {
        case READY:
          const qualities = player.current.getQualities();
          setSelectableQuality(qualities);
          player.current.setQuality(qualities[0], true); // 왜 이거 안해주면 버퍼링 오래 걸리지
          break;
        case BUFFERING:
          console.log('NOW BUFFERING');
          break;
        case PLAYING:
          break;
        case IDLE: // 스스로 멈췄을때
          // toastLog("info", "idle");
          break;
        case ENDED: // TODO 끝났을떄 로직
          // if (dayjs(enterTicketData.concertEndDate).isAfter(Date.now())) {
          //   toastLog("info", "コンサートが終了しました。");
          // } else {
          //   toastLog("error", "動画ストリーミングに問題が発生しています。");
          // }
          break;
        default:
          break;
      }
    };

    player.current.addEventListener(IDLE, onStateChange);
    player.current.addEventListener(READY, onStateChange);
    player.current.addEventListener(PLAYING, onStateChange);
    player.current.addEventListener(BUFFERING, onStateChange);
    player.current.addEventListener(ENDED, onStateChange);

    return () => {
      player.current?.removeEventListener(IDLE, onStateChange);
      player.current?.removeEventListener(READY, onStateChange);
      player.current?.removeEventListener(PLAYING, onStateChange);
      player.current?.removeEventListener(PLAYING, onStateChange);
      player.current?.removeEventListener(BUFFERING, onStateChange);
    };
  }, [IVSPlayer]);

  useEffect(() => {
    console.log('aaaaa', m3u8, player.current);
    if (!player.current || !m3u8) return;
    player.current.load(m3u8);
    player.current.play();
    return () => {};
  }, [m3u8]);

  const handleStopVideo = () => {
    player.current?.pause();
  };

  const handelCloseVideo = () => {
    player.current?.pause();
    setIsOnMiniPlayer(false);
  };

  return (
    <Box color="white" position="fixed" zIndex="100" right="10" bottom="10" bgColor="red.100" w="300px" h="160px" visibility={isOneMiniPlayer ? 'visible' : 'hidden'}>
      <Video ref={videoEl} playsInline></Video>
      <Box position="absolute" w="full">
        <Button onClick={handleStopVideo}>stop</Button>
        <Button onClick={handelCloseVideo}>close</Button>
        <Text> {isOneMiniPlayer ? 'on' : 'off'} </Text>
        {/* m3u8 : {m3u8} */}
      </Box>
    </Box>
  );
};

export default MiniPlayer;
