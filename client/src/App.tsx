import { Routes, Route, BrowserRouter } from "react-router"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/Dashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Landing/> }/>
          <Route path="/dashboard" element={ <Dashboard/> }/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
