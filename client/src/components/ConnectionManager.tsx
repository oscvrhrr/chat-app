import { socket } from '../socket';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button className='border bg-green-900 absolute left-64' onClick={ connect }>Connect</button>
      <button className='border bg-red-900 absolute' onClick={ disconnect }>Disconnect</button>
    </>
  );
}