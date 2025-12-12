import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import { Suspense, lazy } from 'react'
import { PageLoader } from './components/PageLoader'
import { BrandingProvider } from '@/stores/useBrandingStore'

// Lazy load pages for performance optimization
const Index = lazy(() => import('./pages/Index'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Onboarding = lazy(() => import('./pages/auth/Onboarding'))
const ProfileSelection = lazy(() => import('./pages/auth/ProfileSelection'))
const Home = lazy(() => import('./pages/home/Home'))
const Move = lazy(() => import('./pages/move/Move'))
const Explore = lazy(() => import('./pages/explore/Explore'))
const Profile = lazy(() => import('./pages/profile/Profile'))
const MessagesList = lazy(() => import('./pages/messages/MessagesList'))
const ChatRoom = lazy(() => import('./pages/messages/ChatRoom'))
const Marketplace = lazy(() => import('./pages/marketplace/Marketplace'))
const ProductDetails = lazy(() => import('./pages/marketplace/ProductDetails'))
const Cart = lazy(() => import('./pages/marketplace/Cart'))
const JobsList = lazy(() => import('./pages/jobs/JobsList'))
const JobDetails = lazy(() => import('./pages/jobs/JobDetails'))
const RecruiterDashboard = lazy(() => import('./pages/jobs/RecruiterDashboard'))
const Settings = lazy(() => import('./pages/settings/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const EventDetails = lazy(() => import('./pages/explore/EventDetails'))
const NewChat = lazy(() => import('./pages/messages/NewChat'))
const Ranking = lazy(() => import('./pages/gamification/Ranking'))
const Wallet = lazy(() => import('./pages/wallet/Wallet'))
const WithdrawPix = lazy(() => import('./pages/wallet/WithdrawPix'))
const PaymentMethods = lazy(() => import('./pages/wallet/PaymentMethods'))
const RideRequest = lazy(() => import('./pages/services/RideRequest'))

// New Detail Pages
const VenueDetails = lazy(() => import('./pages/venues/VenueDetails'))
const GymDetails = lazy(() => import('./pages/gyms/GymDetails'))
const NutritionPartnerDetails = lazy(
  () => import('./pages/nutrition/NutritionPartnerDetails'),
)
const ClinicDetails = lazy(() => import('./pages/clinics/ClinicDetails'))

// Driver Pages
const DriverDashboard = lazy(() => import('./pages/driver/DriverDashboard'))
const DriverRequests = lazy(() => import('./pages/driver/DriverRequests'))
const DriverHistory = lazy(() => import('./pages/driver/DriverHistory'))
const DriverSettings = lazy(() => import('./pages/driver/DriverSettings'))
const ActiveRide = lazy(() => import('./pages/driver/ActiveRide'))

// New Invitations and Matches Pages
const ReceivedInvitations = lazy(
  () => import('./pages/invitations/ReceivedInvitations'),
)
const MatchDetails = lazy(() => import('./pages/matches/MatchDetails'))
const MyPoints = lazy(() => import('./pages/gamification/MyPoints'))

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrandingProvider>
        <Suspense fallback={<PageLoader />}>
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

              {/* New Detail Routes */}
              <Route path="/venues/:id" element={<VenueDetails />} />
              <Route path="/gyms/:id" element={<GymDetails />} />
              <Route
                path="/nutrition/:id"
                element={<NutritionPartnerDetails />}
              />
              <Route path="/clinics/:id" element={<ClinicDetails />} />

              <Route path="/marketplace" element={<Marketplace />} />
              <Route
                path="/marketplace/product/:id"
                element={<ProductDetails />}
              />
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
              <Route path="/ride/request/:driverId" element={<RideRequest />} />

              {/* Driver Routes */}
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/requests" element={<DriverRequests />} />
              <Route path="/driver/history" element={<DriverHistory />} />
              <Route path="/driver/settings" element={<DriverSettings />} />
              <Route path="/driver/active/:id" element={<ActiveRide />} />

              {/* New Invitations and Matches Routes */}
              <Route path="/invitations" element={<ReceivedInvitations />} />
              <Route path="/matches/:id" element={<MatchDetails />} />
              <Route path="/my-points" element={<MyPoints />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrandingProvider>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
