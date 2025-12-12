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
import ProductDetails from './pages/marketplace/ProductDetails'
import Cart from './pages/marketplace/Cart'
import JobsList from './pages/jobs/JobsList'
import JobDetails from './pages/jobs/JobDetails'
import RecruiterDashboard from './pages/jobs/RecruiterDashboard'
import Settings from './pages/settings/Settings'
import NotFound from './pages/NotFound'
import EventDetails from './pages/explore/EventDetails'
import NewChat from './pages/messages/NewChat'
import Ranking from './pages/gamification/Ranking'
import Wallet from './pages/wallet/Wallet'
import WithdrawPix from './pages/wallet/WithdrawPix'
import PaymentMethods from './pages/wallet/PaymentMethods'

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
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/product/:id" element={<ProductDetails />} />
          <Route path="/marketplace/cart" element={<Cart />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/dashboard" element={<RecruiterDashboard />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/messages/:id" element={<ChatRoom />} />
          <Route path="/messages/new" element={<NewChat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/withdraw" element={<WithdrawPix />} />
          <Route path="/wallet/cards" element={<PaymentMethods />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
