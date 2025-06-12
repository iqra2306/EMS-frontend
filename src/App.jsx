import './App.css'
import EmployeeFooter from './Components/EmployeeFooter'
import EmployeeHeader from './Components/EmployeeHeader'
import EmployeeList from './Components/EmployeeList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewEmployee from './Components/NewEmployee'
function App() {

  return (
    <>
      <BrowserRouter>
        <EmployeeHeader />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element={<EmployeeList />}> </Route>
          {/* // http://localhost:3000/employees*/}
          <Route path='/employees' element={<EmployeeList />}></Route>
          {/* // http://localhost:3000/add-employee*/}
          <Route path='/add-employee' element={<NewEmployee />}> </Route>
          {/*   http://localhost:3000/update-employee/1 */}
          <Route path='/update-employee/:id' element={<NewEmployee />}></Route>
        </Routes>

        <EmployeeFooter />
      </BrowserRouter>
    </>
  )
}

export default App
