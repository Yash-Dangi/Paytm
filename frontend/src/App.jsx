import {BrowserRouter , Route, Routes} from 'react-router-dom'
import {Signup} from './pages/Signup'
import {Dashboard} from './pages/Dashboard'
import {Signin} from './pages/Signin'
import {SendMoney} from './pages/SendMoney'
function App() {

  return (
    <div>
        <BrowserRouter>
         <Routes>
            <Route path = "/signup" element = {<Signup></Signup>}></Route>
            <Route path = "/signin" element = {<Signin></Signin>}></Route>
            <Route path = "/dashboard" element = {<Dashboard></Dashboard>}></Route>
            <Route path = "/send" element = {<SendMoney> </SendMoney>}></Route>
            <Route path = "/" element = {<div> Hi There</div>}></Route>
         </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
