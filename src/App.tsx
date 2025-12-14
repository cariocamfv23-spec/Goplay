import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import { Suspense, lazy, useEffect } from 'react'
import { PageLoader } from './components/PageLoader'
import { BrandingProvider } from '@/stores/useBrandingStore'
import { ThemeProvider } from '@/components/ThemeProvider'
import Index from './pages/Index'
import { useThemeStore } from '@/stores/useThemeStore'

// Lazy load pages
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Onboarding = lazy(() => import('./pages/auth/Onboarding'))
const ProfileSelection = lazy(() => import('./pages/auth/ProfileSelection'))

const Home = lazy(() => import('./pages/home/Home'))
const Move = lazy(() => import('./pages/move/Move'))
const Explore = lazy(() => import('./pages/explore/Explore'))

// Explore Lists
const TalentsList = lazy(() => import('./pages/explore/TalentsList'))
const PhotographersList = lazy(
  () => import('./pages/explore/PhotographersList'),
)
const DriversList = lazy(() => import('./pages/explore/DriversList'))
const EventsList = lazy(() => import('./pages/explore/EventsList'))
const VenuesList = lazy(() => import('./pages/explore/VenuesList'))
const GymsList = lazy(() => import('./pages/explore/GymsList'))
const NutritionList = lazy(() => import('./pages/explore/NutritionList'))
const ClinicsList = lazy(() => import('./pages/explore/ClinicsList'))

// Details
const EventDetails = lazy(() => import('./pages/explore/EventDetails'))
const VenueDetails = lazy(() => import('./pages/venues/VenueDetails'))
const GymDetails = lazy(() => import('./pages/gyms/GymDetails'))
const NutritionPartnerDetails = lazy(
  () => import('./pages/nutrition/NutritionPartnerDetails'),
)
const ClinicDetails = lazy(() => import('./pages/clinics/ClinicDetails'))
const HortifrutiDetails = lazy(
  () => import('./pages/explore/HortifrutiDetails'),
)

// Profile & Stats
const Profile = lazy(() => import('./pages/profile/Profile'))
const StatsDetail = lazy(() => import('./pages/profile/StatsDetail'))
const FinancialStatement = lazy(
  () => import('./pages/profile/FinancialStatement'),
)
const Wallet = lazy(() => import('./pages/wallet/Wallet'))
const TransactionHistory = lazy(
  () => import('./pages/financials/TransactionHistory'),
)

// Messages
const MessagesList = lazy(() => import('./pages/messages/MessagesList'))
const ChatRoom = lazy(() => import('./pages/messages/ChatRoom'))
const NewChat = lazy(() => import('./pages/messages/NewChat'))

// Marketplace
const Marketplace = lazy(() => import('./pages/marketplace/Marketplace'))
const ProductDetails = lazy(() => import('./pages/marketplace/ProductDetails'))
const Cart = lazy(() => import('./pages/marketplace/Cart'))

// Jobs
const JobsList = lazy(() => import('./pages/jobs/JobsList'))
const JobDetails = lazy(() => import('./pages/jobs/JobDetails'))
const RecruiterDashboard = lazy(() => import('./pages/jobs/RecruiterDashboard'))

// Services & Driver
const RideRequest = lazy(() => import('./pages/services/RideRequest'))
const DriverDashboard = lazy(() => import('./pages/driver/DriverDashboard'))
const DriverRequests = lazy(() => import('./pages/driver/DriverRequests'))
const DriverRewards = lazy(() => import('./pages/driver/DriverRewards'))
const DriverHistory = lazy(() => import('./pages/driver/DriverHistory'))
const DriverSettings = lazy(() => import('./pages/driver/DriverSettings'))

const Settings = lazy(() => import('./pages/settings/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Ranking = lazy(() => import('./pages/gamification/Ranking'))
const Notifications = lazy(() => import('./pages/notifications/Notifications'))

const AiCoach = lazy(() => import('./pages/ai/AiCoach'))
const VarzeaEditor = lazy(() => import('./pages/ai/VarzeaEditor'))

const App = () => {
  const { color } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(
      'theme-blue',
      'theme-green',
      'theme-orange',
      'theme-red',
      'theme-rose',
    )
    if (color !== 'default') {
      root.classList.add(`theme-${color}`)
    }
  }, [color])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HashRouter
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
                <Route
                  path="/profile-selection"
                  element={<ProfileSelection />}
                />

                <Route element={<Layout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/move" element={<Move />} />
                  <Route path="/explore" element={<Explore />} />

                  {/* Explore Lists Routes */}
                  <Route path="/explore/talents" element={<TalentsList />} />
                  <Route
                    path="/explore/photographers"
                    element={<PhotographersList />}
                  />
                  <Route path="/explore/drivers" element={<DriversList />} />
                  <Route path="/explore/events" element={<EventsList />} />
                  <Route path="/explore/venues" element={<VenuesList />} />
                  <Route path="/explore/gyms" element={<GymsList />} />
                  <Route
                    path="/explore/nutrition"
                    element={<NutritionList />}
                  />
                  <Route path="/explore/clinics" element={<ClinicsList />} />
                  <Route path="/explore/jobs" element={<JobsList />} />

                  {/* Detail Routes */}
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/venues/:id" element={<VenueDetails />} />
                  <Route path="/gyms/:id" element={<GymDetails />} />
                  <Route
                    path="/nutrition/:id"
                    element={<NutritionPartnerDetails />}
                  />
                  <Route path="/clinics/:id" element={<ClinicDetails />} />
                  <Route
                    path="/hortifrutis/:id"
                    element={<HortifrutiDetails />}
                  />

                  {/* Profile & Stats */}
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/profile/stats" element={<StatsDetail />} />
                  <Route
                    path="/profile/financial-statement"
                    element={<FinancialStatement />}
                  />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route
                    path="/financials/transactions"
                    element={<TransactionHistory />}
                  />

                  {/* Messages */}
                  <Route path="/messages" element={<MessagesList />} />
                  <Route path="/messages/:id" element={<ChatRoom />} />
                  <Route path="/messages/new" element={<NewChat />} />

                  {/* Marketplace */}
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route
                    path="/marketplace/product/:id"
                    element={<ProductDetails />}
                  />
                  <Route path="/marketplace/cart" element={<Cart />} />

                  {/* Jobs */}
                  <Route path="/jobs" element={<JobsList />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route
                    path="/jobs/dashboard"
                    element={<RecruiterDashboard />}
                  />

                  {/* Gamification */}
                  <Route path="/ranking" element={<Ranking />} />

                  {/* Notifications */}
                  <Route path="/notifications" element={<Notifications />} />

                  {/* Settings */}
                  <Route path="/settings" element={<Settings />} />

                  {/* AI Tools */}
                  <Route path="/ai/coach" element={<AiCoach />} />
                  <Route path="/ai/editor" element={<VarzeaEditor />} />
                </Route>

                {/* Services & Driver Routes */}
                <Route
                  path="/ride/request/:driverId"
                  element={<RideRequest />}
                />
                <Route path="/driver/dashboard" element={<DriverDashboard />} />
                <Route path="/driver/requests" element={<DriverRequests />} />
                <Route path="/driver/rewards" element={<DriverRewards />} />
                <Route path="/driver/history" element={<DriverHistory />} />
                <Route path="/driver/settings" element={<DriverSettings />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrandingProvider>
        </TooltipProvider>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
