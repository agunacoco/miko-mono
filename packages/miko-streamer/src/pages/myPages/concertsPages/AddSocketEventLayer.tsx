import useSocket from '@src/state/hooks/useSocket';
import { useSingleLaravel } from '@src/state/swr/useLaravel';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddSocketEventLayer: FC = ({ children }) => {
  const socket = useSocket();
  const { ticketId } = useParams();

  const { data: ticketData } = useSingleLaravel('/tickets', parseInt(ticketId as string), {});

  useEffect(() => {
    if (!socket || !ticketData) return;

    socket.emit('fe-st-join-concert-room', ticketData.data.id);

    return () => {};
  }, [socket, ticketData]);

  return <>{children}</>;
};

export default AddSocketEventLayer;
