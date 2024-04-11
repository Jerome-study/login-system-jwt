import './App.css'
import { Routes,Route } from 'react-router-dom'
import { SignInPage } from './pages/signin'
import { DashboardPage } from './pages/Dashboard'
import { HomePage } from './pages/Home'
import { Profile } from './pages/Profile';
import { Protected } from './pages/Protected'
import { Navbar } from './components/navbar';
import { SignUpPage } from './pages/signup'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/signin' element={<SignInPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route element={<Protected />}>
          <Route path='/dashboard' element={<DashboardPage />}/>
          <Route path='/profile' element={<Profile />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
