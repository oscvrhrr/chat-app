import { Routes, Route, BrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/Dashboard"
import { UserContextProvider } from "./components/context/UserContext" 
import ProtectedRoutes from "./lib/ProtectedRoutes"

function App() {


  



  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
            <Routes>
              <Route element={ 
                <UserContextProvider>
                  <ProtectedRoutes/>
                </UserContextProvider>
                 }>
                  <Route path="/dashboard" element={ <Dashboard/> }/>
              </Route>
              <Route path="/" element={ <Landing/> }/>
            </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
