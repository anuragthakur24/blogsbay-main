import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Update } from './pages/Update'
import { AboutUs } from './pages/About'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { DeleteAccount } from './components/Delete'
import Home from './pages/Home'
import { Metrics } from './pages/Metrics'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/publish' element={<Publish />} />
        <Route path='/edit/:id' element={<Update />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/delete' element={<DeleteAccount />} />
        <Route path='/metrics' element={<Metrics />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App