import { Box, Select } from '@chakra-ui/react';
import { cameraStreamState } from '@src/state/recoil';
import produce from 'immer';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

const getUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) as typeof navigator.mediaDevices.getUserMedia;

// @ts-ignore
// eslint-disable-next-line no-undef
async function getConnectedDevices(type: MediaDeviceKind) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(device => device.kind === type);
}

const CameraSwitch: FC = () => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [audios, setCAudios] = useState<MediaDeviceInfo[]>([]);
  const [curCameraId, setCurCameraId] = useState<string>();
  const [curAudioId, setCurAudioId] = useState<string>();

  const [myStream, setMyStream] = useRecoilState(cameraStreamState);

  console.log(myStream?.getAudioTracks());
  console.log(myStream?.getVideoTracks()[0].label);
  console.log(myStream?.getTracks());

  useEffect(() => {
    const deviceChangeHandler = async () => {
      const initCameras = await getConnectedDevices('videoinput');
      const initAudios = await getConnectedDevices('audioinput');
      setCameras(initCameras);
      setCAudios(initAudios);
    };

    deviceChangeHandler(); // 초기 set 실행
    navigator.mediaDevices.addEventListener('devicechange', deviceChangeHandler); // 이후 기기 변경시에 실행

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', deviceChangeHandler);
    };
  }, []);

  const handelCameraChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const deviceId = e.target.value;
    getUserMedia({ video: { deviceId }, audio: curAudioId ? { deviceId: curAudioId } : true })
      .then(stream => {
        setMyStream(stream);
        setCurCameraId(deviceId);
        const videoDom = document.getElementById('camera-video') as HTMLVideoElement;
        videoDom.srcObject = myStream;
        videoDom.play();
      })
      .catch(err => {
        // toastLog('error', 'get stream fail', '', err);
      });
  };

  return (
    <Box>
      <label htmlFor="cameraSelect">
        카메라 선택
        <Select id="cameraSelect" aria-label="카메라 선택" placeholder="Select option" onChange={handelCameraChange}>
          {cameras.map(camera => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </Select>
      </label>
    </Box>
  );
};

export default CameraSwitch;
