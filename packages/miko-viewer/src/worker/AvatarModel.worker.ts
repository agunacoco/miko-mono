/* eslint-disable no-case-declarations */
import { NEXT_URL, AVATAR_PENLIGHT_COLOR_THEME } from '@src/const';
import { setBone } from '@src/helper/dynamic/setBoneAvatar';
import { AvatarBones, AvatarOriginalBones } from '@src/types/avatar/ModelType';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

// 공유 객체 사용가능 할 것

type ImportAvatarArgs = [
  BABYLON.AbstractMesh[],
  BABYLON.IParticleSystem[],
  BABYLON.Skeleton[],
  BABYLON.AnimationGroup[],
  BABYLON.TransformNode[],
  BABYLON.Geometry[],
  BABYLON.Light[],
];
let scene: BABYLON.Scene;

const avatarSkin: ImportAvatarArgs[] = [];
const avatarSkinOriginalBones: BABYLON.Quaternion[][] = [];
const penlight: ImportAvatarArgs[] = [];
const pointLight: BABYLON.PointLight[] = [];

const penMat: BABYLON.StandardMaterial[] = [];
// penlight의 색상, rgbd는 16진법 2자릿수 d는 divide라는 뜻으로 d
let lightColor: number = 0;

const AVATAR_PATH = `${NEXT_URL}/resources/babylonjs/models/`;
const AVATAR_FILE_NAME = [
  'proseka/proseka_tmp.glb',
  'miku/MineCraftMiku2.8.glb',
  'steve/user2.8.glb',
  'steve/tanjiro2.8.glb',
  'light/penlight_glory.glb',
  'light/penlight_glory.glb',
];
const avatar_import = [false, false, false, false, false, false];

let currentAvatar = 0;
/**
 * proseka = leftShoulder 22, Elbow 21, Wrist 20
 *           rightShoulder 17, 16, 15
 *           head 12
 * miku = leftShoulder 56 or 55, Elbow 53, Wrist 52
 *        rightShoulder 36 or 35, 33, 32
 *        head 14 or 15
 * magician = leftShoulder 7 or 6, Elbow 5, Wrist 4
 *          rightShoulder 11 or 10, 9, 8
 *          head 2
 * tanjiro === magician // true
 */
const currentBones: AvatarBones = {} as AvatarBones;
const currentOriginalBones: AvatarOriginalBones = {} as AvatarOriginalBones;

let avatarStart: boolean = false;

const createLights = (functionBones: BABYLON.TransformNode[], index: number, r: number, g: number, b: number, d: number, functionScene: BABYLON.Scene, direction: number) => {
  const bone = functionBones[index]; // 15
  const { x, y, z } = bone.absolutePosition;
  const light = new BABYLON.PointLight(`${index}_point_light`, new BABYLON.Vector3(x + 0.65 * direction, y, z + 0.5), functionScene); // x를 0.몇씩 좌우로 이동해야 할 듯
  // const light = new BABYLON.PointLight(`${index}_point_light`, bone.absolutePosition, functionScene); // x를 0.몇씩 좌우로 이동해야 할 듯
  light.parent = bone;
  light.intensity = 0.3;
  light.range = 5;
  // light.shadowMinZ = 0.2;
  // light.shadowMaxZ = 5;
  light.diffuse = new BABYLON.Color3(r / d, g / d, b / d);
  light.specular = new BABYLON.Color3(r / d, g / d, b / d);
  pointLight.push(light);
};
// ['57, 197, 187', '255, 204, 17', '255, 238, 17', '255, 187, 204', '221, 68, 68', '51, 102, 204'];

const hexToRgb = (hex: string): number[] => {
  return hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));
};

const changePointLight = (index: number, r: number, g: number, b: number, d: number) => {
  pointLight[index].diffuse = new BABYLON.Color3(r / d, g / d, b / d);
  pointLight[index].specular = new BABYLON.Color3(r / d, g / d, b / d);
};

const changeLights = (index: number) => {
  const [r, g, b] = hexToRgb(AVATAR_PENLIGHT_COLOR_THEME[index]);
  const d = 255;
  const [mat] = penMat;
  mat.emissiveColor = new BABYLON.Color3(r / d, g / d, b / d);
  changePointLight(0, r, g, b, d);
  changePointLight(1, r, g, b, d);
};

const getJointNumber = (index: number): { [key in string]: number } => {
  let ls = 22;
  let le = 21;
  let lw = 20;
  let rs = 17;
  let re = 16;
  let rw = 15;
  let h = 12;

  switch (index) {
    case 1: // 미쿠
      ls = 55;
      le = 53;
      lw = 52;
      rs = 35;
      re = 33;
      rw = 32;
      h = 14;
      break;
    case 2: // magician
      ls = 6;
      le = 5;
      lw = 4;
      rs = 10;
      re = 9;
      rw = 8;
      h = 2;
      break;
    case 3: // tanjiro
      ls = 6;
      le = 5;
      lw = 4;
      rs = 10;
      re = 9;
      rw = 8;
      h = 2;
      break;
    default:
      break;
  }
  return { ls, le, lw, rs, re, rw, h };
};

// 아바타의 움직여야 하는 관절 설정
const avatarResetPosition = (index: number) => {
  penlight[0][0][0].setParent(null);
  penlight[0][4][0].setAbsolutePosition(new BABYLON.Vector3(0, 0, 0));
  penlight[1][0][0].setParent(null);
  penlight[1][4][0].setAbsolutePosition(new BABYLON.Vector3(0, 0, 0));

  avatarSkin[currentAvatar][0][0].setAbsolutePosition(new BABYLON.Vector3(100, 0, 0));
  scene.render();
  avatarSkin[index][0][0].setAbsolutePosition(new BABYLON.Vector3(0, 0, 0));
  currentAvatar = index;
  scene.render(); // 이거 안하면 악세사리가 움직이질 않음...
  const { ls, le, lw, rs, re, rw, h } = getJointNumber(index);

  currentBones.leftShoulder = avatarSkin[index][4][ls];
  currentBones.leftElbow = avatarSkin[index][4][le];
  currentBones.leftWrist = avatarSkin[index][4][lw];
  currentBones.rightShoulder = avatarSkin[index][4][rs];
  currentBones.rightElbow = avatarSkin[index][4][re];
  currentBones.rightWrist = avatarSkin[index][4][rw];
  currentBones.head = avatarSkin[index][4][h];

  currentBones.leftShoulder.rotationQuaternion = avatarSkinOriginalBones[index][ls].clone();
  currentBones.rightShoulder.rotationQuaternion = avatarSkinOriginalBones[index][rs].clone();

  currentOriginalBones.leftShoulder = avatarSkinOriginalBones[index][ls];
  currentOriginalBones.leftElbow = avatarSkinOriginalBones[index][le];
  currentOriginalBones.leftWrist = avatarSkinOriginalBones[index][lw];
  currentOriginalBones.rightShoulder = avatarSkinOriginalBones[index][rs];
  currentOriginalBones.rightElbow = avatarSkinOriginalBones[index][re];
  currentOriginalBones.rightWrist = avatarSkinOriginalBones[index][rw];
  currentOriginalBones.head = avatarSkinOriginalBones[index][h];

  const la = currentBones.leftWrist.absolutePosition.clone();
  const ra = currentBones.rightWrist.absolutePosition.clone();

  penlight[0][0][0].setParent(currentBones.leftWrist);
  penlight[0][4][0].setAbsolutePosition(new BABYLON.Vector3(la.x - 0.05, la.y - 0.05, la.z));
  penlight[1][0][0].setParent(currentBones.rightWrist);
  penlight[1][4][0].setAbsolutePosition(new BABYLON.Vector3(ra.x + 0.05, ra.y - 0.05, ra.z));
};

const initSettingImportMesh = () => {
  if (avatar_import.includes(false)) {
    return;
  }
  console.log('avatar setting import 들어옴');
  createLights(penlight[0][4], 2, 1, 1, 1, 1, scene, 1);
  createLights(penlight[1][4], 2, 1, 1, 1, 1, scene, -1);
  // 27, 30 라이트, 26, 29 손잡이
  scene.render();
  const [mat] = penMat;
  // eslint-disable-next-line
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      penlight[i][0][j].material = mat;
    }
  }
  // functionScene.meshes[27].material = mat; // eslint-disable-line
  // functionScene.meshes[25].material = mat; // eslint-disable-line
  // functionScene.meshes[30].material = mat; // eslint-disable-line
  // functionScene.meshes[28].material = mat; // eslint-disable-line // 이거 임포트한 메쉬의 매터리얼을 바꾸지 penlight[0][0][0]...이런식으로
  scene.render();

  avatarResetPosition(currentAvatar);
  scene.render();
  avatarStart = true;
  return;
};

// 아바타 init시 avatar로드
const addMesh = (functionScene: BABYLON.Scene, index: number) => {
  BABYLON.SceneLoader.ImportMesh('', AVATAR_PATH + AVATAR_FILE_NAME[index], '', functionScene, (...args) => {
    const { rs, ls } = getJointNumber(index);
    console.log('avatar init this is import', index);
    if (index < AVATAR_FILE_NAME.length - 2) {
      console.log('avatar init this is import2', index);
      args[4][rs].rotate(new BABYLON.Vector3(0, 0, 1), (Math.PI * 7) / 36, 2);
      args[4][ls].rotate(new BABYLON.Vector3(0, 0, 1), -(Math.PI * 7) / 36, 2);
      if (index > 1) {
        args[4][rs].rotate(new BABYLON.Vector3(0, 0, 1), (Math.PI * 7) / 36, 2);
        args[4][ls].rotate(new BABYLON.Vector3(0, 0, 1), -(Math.PI * 7) / 36, 2);
      }
      avatarSkin[index] = args;
      console.log('avatar init args insert', index);
      avatarSkinOriginalBones[index] = [];
      // eslint-disable-next-line
      for (let i = 0; i < args[4].length; i++) {
        const copyBone = args[4][i].rotationQuaternion?.clone();
        if (copyBone) avatarSkinOriginalBones[index].push(copyBone);
      }
      args[0][0].setAbsolutePosition(new BABYLON.Vector3(100, 0, 0));
    } else {
      // -2 왼손, -1 오른손
      const value = (AVATAR_FILE_NAME.length - index - 2) * -1;
      console.log('avatar init penlight insert', index);
      penlight[value] = args;
      const mat = new BABYLON.StandardMaterial(`${index}_hand_light`, functionScene);
      mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
      console.log('avatar init mat insert', index);
      penMat[value] = mat;
      // eslint-disable-next-line
      // args[0][0].material = mat;
      // args[4][0].translate(new BABYLON.Vector3(0, 0, 1), 2);
      // args[4][0].rotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
    }
    avatar_import[index] = true;
    // addMesh(functionScene, index + 1);
    initSettingImportMesh();
  });
};

// 아바타 리랜더링
const onSceneReady = async (resultScene: BABYLON.Scene) => {
  if (BABYLON && BABYLON.SceneLoader) {
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), resultScene);
    camera.minZ = 0;
    // camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    // camera.setPosition(new BABYLON.Vector3(0, 4, 6));
    camera.setTarget(new BABYLON.Vector3(0, 2.5, 0));
    camera.setPosition(new BABYLON.Vector3(0, 1.8, 5));

    // 카메라 컨트롤러, 모델뜨는 canvas 드래그로 조절 가능
    // camera.attachControl(true);

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), resultScene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.6;

    BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 6 }, resultScene);
    console.log('avatar init render before');
    for (let i = 0; i < AVATAR_FILE_NAME.length; i++) {
      addMesh(resultScene, i);
    }
  }
};

// eslint-disable-next-line no-restricted-globals
addEventListener('message', async ({ data }) => {
  switch (data.type) {
    case 'init':
      console.log('avatar init');
      const { canvas, width, height } = data;

      const engine = new BABYLON.Engine(canvas);

      scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

      onSceneReady(scene);

      scene.getEngine().setSize(width, height);

      scene.render();

      // let count = 0;
      // const firstRenderIntervalId = setInterval(() => {
      //   if (count <= 20) {
      //     scene.render();
      //     count += 1;
      //   } else {
      //     clearInterval(firstRenderIntervalId);
      //   }
      // }, 16);

      break;
    case 'motionChange':
      const { thisUserMotion } = data;
      if (!avatarStart) break;
      setBone({ bones: currentBones, originalBones: currentOriginalBones, scene }, thisUserMotion.pose, thisUserMotion.face);
      scene.render();
      break;
    // 현재 안먹힘 babylon이랑 blender랑 다른 부분을 찾아야 함...
    // case 'avatarTextureInit':
    //   const res = await fetch(`${AVATAR_PATH}steve/tanjiro.png`);
    //   const resBlob = await res.blob();
    //   const imageBitmap = await createImageBitmap(resBlob);
    //   const mat = new BABYLON.StandardMaterial('mat', scene);

    //   const myDynamicTexture = new BABYLON.DynamicTexture('fire', 64, scene, false);
    //   mat.diffuseTexture = myDynamicTexture;

    //   // Add image to dynamic texture
    //   const ctx = myDynamicTexture.getContext();
    //   ctx.drawImage(imageBitmap, 0, 0, 64, 64);
    //   myDynamicTexture.update();
    //   avatarSkin[2][0][1].material = mat;
    //   break;
    case 'avatarChange':
      const { avatarType } = data;
      let avatarIndex = avatarType;
      if (typeof avatarType === 'string') avatarIndex = parseInt(avatarType, 10);
      if (avatarIndex < 0 || avatarIndex > AVATAR_FILE_NAME.length - 2 || avatarIndex === currentAvatar) break;
      avatarResetPosition(avatarIndex);
      break;
    case 'penlightChange':
      const { colorType } = data;
      let lightIndex = colorType;
      if (typeof colorType === 'string') lightIndex = parseInt(colorType, 10);
      if (lightIndex < 0 || lightIndex > 5 || lightIndex === lightColor) break;
      lightColor = lightIndex;
      changeLights(lightIndex);
      break;
    default:
      break;
  }
});
