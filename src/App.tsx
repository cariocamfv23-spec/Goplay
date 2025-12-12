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
const PhotographersList = lazy(
  () => import('./pages/explore/PhotographersList'),
)
const EventsList = lazy(() => import('./pages/explore/EventsList'))
const VenuesList = lazy(() => import('./pages/explore/VenuesList'))
const GymsList = lazy(() => import('./pages/explore/GymsList'))

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
const ScheduledRides = lazy(() => import('./pages/services/ScheduledRides'))

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
const DriverPerformance = lazy(() => import('./pages/driver/DriverPerformance'))
const DriverRewards = lazy(() => import('./pages/driver/DriverRewards'))

// New Invitations and Matches Pages
const ReceivedInvitations = lazy(
  () => import('./pages/invitations/ReceivedInvitations'),
)
const MatchDetails = lazy(() => import('./pages/matches/MatchDetails'))
const MyPoints = lazy(() => import('./pages/gamification/MyPoints'))

// New Stats Detail Page
const StatsDetail = lazy(() => import('./pages/profile/StatsDetail'))

// New Notification and Financial Pages
const Notifications = lazy(() => import('./pages/notifications/Notifications'))
const TransactionHistory = lazy(
  () => import('./pages/financials/TransactionHistory'),
)

// NEW AI FEATURES
const GhostPlay = lazy(() => import('./pages/ai/GhostPlay'))
const ArenaMode = lazy(() => import('./pages/ai/ArenaMode'))
const AiCoach = lazy(() => import('./pages/ai/AiCoach'))
const EvolutionMode = lazy(() => import('./pages/profile/EvolutionMode'))
const ShadowChallenge = lazy(
  () => import('./pages/gamification/ShadowChallenge'),
)
const InjuryScanner = lazy(() => import('./pages/ai/InjuryScanner'))
const InternationalMatch = lazy(
  () => import('./pages/explore/InternationalMatch'),
)
const SportsPassport = lazy(() => import('./pages/profile/SportsPassport'))
const Oracle = lazy(() => import('./pages/ai/Oracle'))
const VarzeaEditor = lazy(() => import('./pages/ai/VarzeaEditor'))
const DeviceManager = lazy(() => import('./pages/devices/DeviceManager'))

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
              <Route
                path="/explore/photographers"
                element={<PhotographersList />}
              />
              <Route path="/explore/events" element={<EventsList />} />
              <Route path="/explore/venues" element={<VenuesList />} />
              <Route path="/explore/gyms" element={<GymsList />} />

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
              <Route path="/profile/stats" element={<StatsDetail />} />
              <Route path="/messages" element={<MessagesList />} />
              <Route path="/messages/:id" element={<ChatRoom />} />
              <Route path="/messages/new" element={<NewChat />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/devices" element={<DeviceManager />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/withdraw" element={<WithdrawPix />} />
              <Route path="/wallet/cards" element={<PaymentMethods />} />
              <Route path="/ride/request/:driverId" element={<RideRequest />} />
              <Route
                path="/services/scheduled-rides"
                element={<ScheduledRides />}
              />

              {/* Driver Routes */}
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/requests" element={<DriverRequests />} />
              <Route path="/driver/history" element={<DriverHistory />} />
              <Route path="/driver/settings" element={<DriverSettings />} />
              <Route path="/driver/active/:id" element={<ActiveRide />} />
              <Route
                path="/driver/performance"
                element={<DriverPerformance />}
              />
              <Route path="/driver/rewards" element={<DriverRewards />} />

              {/* New Invitations and Matches Routes */}
              <Route path="/invitations" element={<ReceivedInvitations />} />
              <Route path="/matches/:id" element={<MatchDetails />} />
              <Route path="/my-points" element={<MyPoints />} />

              {/* Notifications and Financials */}
              <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/financials/transactions"
                element={<TransactionHistory />}
              />

              {/* AI Features Routes */}
              <Route path="/ai/ghost-play" element={<GhostPlay />} />
              <Route path="/ai/arena" element={<ArenaMode />} />
              <Route path="/ai/coach" element={<AiCoach />} />
              <Route path="/ai/scanner" element={<InjuryScanner />} />
              <Route path="/ai/oracle" element={<Oracle />} />
              <Route path="/ai/editor" element={<VarzeaEditor />} />
              <Route path="/profile/passport" element={<SportsPassport />} />
              <Route path="/profile/evolution" element={<EvolutionMode />} />
              <Route path="/play/shadow" element={<ShadowChallenge />} />
              <Route
                path="/play/international"
                element={<InternationalMatch />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrandingProvider>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
