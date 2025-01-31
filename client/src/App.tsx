import { Routes, Route, BrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/Dashboard"
import ProtectedRoutes from "./lib/ProtectedRoutes"
import { UserContextProvider } from "./components/context/UserContext"
function App() {


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
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
