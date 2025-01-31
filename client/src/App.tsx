import { Routes, Route, BrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/Dashboard"
import ProtectedRoutes from "./lib/ProtectedRoutes"
import { UserContextProvider } from "./components/context/UserContext"
import { socket } from "./socket"
import { useState, useEffect } from "react";
import { ConnectionState } from "./components/ConnectionState"
import { ConnectionManager } from "./components/ConnectionManager"


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    
    function onDisconnect() {
      setIsConnected(false);
    }


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, []);



  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route element={ <ProtectedRoutes/> }>
              <Route path="/dashboard" element={ <Dashboard/> }/>
            </Route>
            <Route path="/" element={ <Landing/> }/>
          </Routes>
          <ConnectionState isConnected={ isConnected }/>
          <ConnectionManager/>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
