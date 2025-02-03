import { Routes, Route, BrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/Dashboard"
import { UserContextProvider } from "./components/context/UserContext" 
import ProtectedRoutes from "./lib/ProtectedRoutes"
import { ProfileContextProvider } from "./components/context/ProfileContext"

function App() {


  



  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <ProfileContextProvider>
            <Routes>
              <Route element={ <ProtectedRoutes/> }>
                <Route path="/dashboard" element={ <Dashboard/> }/>
              </Route>
              <Route path="/" element={ <Landing/> }/>
            </Routes>
          </ProfileContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
