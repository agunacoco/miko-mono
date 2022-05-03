import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

const DragTest = () => {
  const handleDragEnter = (e: any) => {
    console.log('drag enter', e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: any) => {
    console.log('drag leave', e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: any) => {
    console.log('drag over', e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: any) => {
    console.log('drop', e);
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log('DragStart', e);
    // e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', 'aaaaa');
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <HStack>
      <Box
        width="100px"
        height="100px"
        bgColor="red"
        draggable
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragStart={(e) => handleDragStart(e)}
      ></Box>

      <Box width="100px" height="100px" bgColor="blue" onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)}></Box>
    </HStack>
  );
};

export default DragTest;
