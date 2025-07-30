import Navbar from './Components/navbar'

import Homepage from './pages/Homepage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"

import {Routes, Route, Navigate} from "react-router-dom"
import {useAuthStore} from './store/useAuthStore'
import { useEffect } from 'react'


const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

console.log(authUser);

  return (
    <>
    {isCheckingAuth && !authUser && (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
      )}
      
      <Toaster />

      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/> } />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/> } />
      </Routes>

    </>
  )
}

export default App;