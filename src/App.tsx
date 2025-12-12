import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'

import Index from './pages/Index'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Onboarding from './pages/auth/Onboarding'
import ProfileSelection from './pages/auth/ProfileSelection'
import Home from './pages/home/Home'
import Move from './pages/move/Move'
import Explore from './pages/explore/Explore'
import Profile from './pages/profile/Profile'
import MessagesList from './pages/messages/MessagesList'
import ChatRoom from './pages/messages/ChatRoom'
import Marketplace from './pages/marketplace/Marketplace'
import JobsList from './pages/jobs/JobsList'
import Settings from './pages/settings/Settings'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile-selection" element={<ProfileSelection />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/move" element={<Move />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/messages/:id" element={<ChatRoom />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
