// Re-enabling dynamic manifest and favicon generation to support seasonal branding
import { updateDynamicPWA } from '@/lib/dynamic-pwa'
import { getSeasonalTheme } from '@/lib/seasonal-utils'

if (typeof document !== 'undefined') {
  // Safe space for future document-level logic
  const currentTheme = getSeasonalTheme()
  updateDynamicPWA(currentTheme)
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import { Suspense, lazy, useEffect } from 'react'
import { PageLoader } from './components/PageLoader'
import { BrandingProvider } from '@/stores/useBrandingStore'
import { CartProvider } from '@/stores/useCartStore'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useThemeStore } from '@/stores/useThemeStore'
import useSoundStore from '@/stores/useSoundStore'
import { ProtectedRoute } from './components/ProtectedRoute'
import { FlashbackModal } from '@/components/FlashbackModal'
import { SplashScreen } from '@/components/SplashScreen'
import Index from './pages/Index'

// Lazy load pages
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Onboarding = lazy(() => import('./pages/auth/Onboarding'))
const ProfileSelection = lazy(() => import('./pages/auth/ProfileSelection'))

// Retrospective & Memory Pages
const Retrospective = lazy(() => import('./pages/retrospective/Retrospective'))
const MemoryViewer = lazy(() => import('./pages/memory/MemoryViewer'))

// App Map
const AppMap = lazy(() => import('./pages/AppMap'))

const Home = lazy(() => import('./pages/home/Home'))
const Feed = lazy(() => import('./pages/feed/Feed'))
const Move = lazy(() => import('./pages/move/Move'))
const Explore = lazy(() => import('./pages/explore/Explore'))
const CheckIn = lazy(() => import('./pages/checkin/CheckIn'))

// Nexus
const NexusHub = lazy(() => import('./pages/nexus/NexusHub'))
const TribeProfile = lazy(() => import('./pages/nexus/TribeProfile'))

// Arena Go
const ArenaGo = lazy(() => import('./pages/arena/ArenaGo'))

// Food Sport
const FoodSport = lazy(() => import('./pages/food-sport/FoodSport'))

// Contracts & Organizer Pages
const LiveContractsDashboard = lazy(
  () => import('./pages/contracts/LiveContractsDashboard'),
)
const CreateContract = lazy(() => import('./pages/contracts/CreateContract'))
const ContractDetails = lazy(() => import('./pages/contracts/ContractDetails'))
const ChampionshipsList = lazy(
  () => import('./pages/organizer/ChampionshipsList'),
)
const CreateChampionship = lazy(
  () => import('./pages/organizer/CreateChampionship'),
)
const ChampionshipDashboard = lazy(
  () => import('./pages/organizer/ChampionshipDashboard'),
)

// Explore Lists
const TalentsList = lazy(() => import('./pages/explore/TalentsList'))
const InvisibleTalentMap = lazy(
  () => import('./pages/explore/InvisibleTalentMap'),
)
const PhotographersList = lazy(
  () => import('./pages/explore/PhotographersList'),
)
const DriversList = lazy(() => import('./pages/explore/DriversList'))
const EventsList = lazy(() => import('./pages/explore/EventsList'))
const VenuesList = lazy(() => import('./pages/explore/VenuesList'))
const GymsList = lazy(() => import('./pages/explore/GymsList'))
const NutritionList = lazy(() => import('./pages/explore/NutritionList'))
const ClinicsList = lazy(() => import('./pages/explore/ClinicsList'))
const Scholarships = lazy(() => import('./pages/explore/Scholarships'))
const AgenciesList = lazy(() => import('./pages/explore/AgenciesList'))
const MapEvents = lazy(() => import('./pages/explore/MapEvents'))
const InternationalMatch = lazy(
  () => import('./pages/explore/InternationalMatch'),
)
const LiveEvents = lazy(() => import('./pages/explore/LiveEvents'))
const LiveStream = lazy(() => import('./pages/explore/LiveStream'))
const ReplayStream = lazy(() => import('./pages/explore/ReplayStream'))
const FuelCredits = lazy(() => import('./pages/explore/FuelCredits'))
const PartnerGasStations = lazy(
  () => import('./pages/explore/PartnerGasStations'),
)
const KidsFriendlyList = lazy(() => import('./pages/explore/KidsFriendlyList'))
const FlyerCreator = lazy(() => import('./pages/explore/FlyerCreator'))
const SponsorshipMatch = lazy(() => import('./pages/sponsors/SponsorshipMatch'))

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
const ScholarshipDetails = lazy(
  () => import('./pages/explore/ScholarshipDetails'),
)
const AgencyDetails = lazy(() => import('./pages/explore/AgencyDetails'))
const ScholarshipApplication = lazy(
  () => import('./pages/explore/ScholarshipApplication'),
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
const ProfileViews = lazy(() => import('./pages/profile/ProfileViews'))
const EvolutionTimeline = lazy(
  () => import('./pages/profile/EvolutionTimeline'),
)
const EvolutionMode = lazy(() => import('./pages/profile/EvolutionMode'))
const SportsPassport = lazy(() => import('./pages/profile/SportsPassport'))
const ReferralProgram = lazy(() => import('./pages/profile/ReferralProgram'))

// Messages & Marketplace
const MessagesList = lazy(() => import('./pages/messages/MessagesList'))
const ChatRoom = lazy(() => import('./pages/messages/ChatRoom'))
const NewChat = lazy(() => import('./pages/messages/NewChat'))
const Marketplace = lazy(() => import('./pages/marketplace/Marketplace'))
const ProductDetails = lazy(() => import('./pages/marketplace/ProductDetails'))
const Cart = lazy(() => import('./pages/marketplace/Cart'))
const OrderHistory = lazy(() => import('./pages/marketplace/OrderHistory'))
const OrderDetails = lazy(() => import('./pages/marketplace/OrderDetails'))

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
const PrivacySettings = lazy(() => import('./pages/settings/Privacy'))
const PWASettings = lazy(() => import('./pages/settings/PWASettings'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Ranking = lazy(() => import('./pages/gamification/Ranking'))
const Notifications = lazy(() => import('./pages/notifications/Notifications'))

// AI
const AiCoach = lazy(() => import('./pages/ai/AiCoach'))
const MotionAnalysis = lazy(() => import('./pages/ai/MotionAnalysis'))
const InjuryScanner = lazy(() => import('./pages/ai/InjuryScanner'))
const ExerciseLibrary = lazy(() => import('./pages/ai/ExerciseLibrary'))
const VarzeaEditor = lazy(() => import('./pages/ai/VarzeaEditor'))
const GhostPlay = lazy(() => import('./pages/ai/GhostPlay'))
const ArenaMode = lazy(() => import('./pages/ai/ArenaMode'))
const AiCoachSettings = lazy(() => import('./pages/ai/AiCoachSettings'))
const PerformanceReports = lazy(() => import('./pages/ai/PerformanceReports'))
const GoalsDashboard = lazy(() => import('./pages/goals/GoalsDashboard'))
const AiAvatar = lazy(() => import('./pages/ai/AiAvatar'))
const Oracle = lazy(() => import('./pages/ai/Oracle'))
const NftCreator = lazy(() => import('./pages/ai/NftCreator'))
const BotDaVerdade = lazy(() => import('./pages/ai/BotDaVerdade'))

// Time Shift & Move Map
const TimeShift = lazy(() => import('./pages/timeshift/TimeShift'))
const KidsZoneMap = lazy(() => import('./pages/move/KidsZoneMap'))

// Live Broadcast
const CreateLiveBroadcast = lazy(
  () => import('./pages/live/CreateLiveBroadcast'),
)

// Time Capsule
const TimeCapsuleDashboard = lazy(
  () => import('./pages/timecapsule/TimeCapsuleDashboard'),
)
const CreateCapsule = lazy(() => import('./pages/timecapsule/CreateCapsule'))
const CapsuleDetail = lazy(() => import('./pages/timecapsule/CapsuleDetail'))

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

  useEffect(() => {
    const handleInteraction = () => {
      useSoundStore.getState().initAudio()
    }
    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('touchstart', handleInteraction, { once: true })
    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SplashScreen />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <FlashbackModal />
          <BrandingProvider>
            <CartProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Authentication and Setup Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route
                    path="/profile-selection"
                    element={<ProfileSelection />}
                  />

                  {/* Protected Full-Screen Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/live/broadcast"
                      element={<CreateLiveBroadcast />}
                    />
                    <Route path="/retrospective" element={<Retrospective />} />
                    <Route path="/memory/:id" element={<MemoryViewer />} />
                    <Route path="/timeshift" element={<TimeShift />} />
                  </Route>

                  {/* Layout Routes */}
                  <Route element={<Layout />}>
                    {/* All Inner Layout Pages are Protected */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/home" element={<Home />} />
                      <Route path="/feed" element={<Feed />} />
                      <Route path="/move" element={<Move />} />
                      <Route path="/move/kids-map" element={<KidsZoneMap />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/check-in" element={<CheckIn />} />
                      <Route path="/app-map" element={<AppMap />} />

                      {/* Nexus Routes */}
                      <Route path="/nexus" element={<NexusHub />} />
                      <Route path="/nexus/:id" element={<TribeProfile />} />

                      <Route path="/arena" element={<ArenaGo />} />
                      <Route path="/food-sport" element={<FoodSport />} />

                      <Route
                        path="/contracts"
                        element={<LiveContractsDashboard />}
                      />
                      <Route
                        path="/contracts/create"
                        element={<CreateContract />}
                      />
                      <Route
                        path="/contracts/:id"
                        element={<ContractDetails />}
                      />

                      <Route
                        path="/organizer"
                        element={<ChampionshipsList />}
                      />
                      <Route
                        path="/organizer/create"
                        element={<CreateChampionship />}
                      />
                      <Route
                        path="/organizer/:id"
                        element={<ChampionshipDashboard />}
                      />

                      <Route
                        path="/explore/sponsorship"
                        element={<SponsorshipMatch />}
                      />
                      <Route
                        path="/explore/talents"
                        element={<TalentsList />}
                      />
                      <Route
                        path="/explore/talent-map"
                        element={<InvisibleTalentMap />}
                      />
                      <Route
                        path="/explore/photographers"
                        element={<PhotographersList />}
                      />
                      <Route
                        path="/explore/drivers"
                        element={<DriversList />}
                      />
                      <Route path="/explore/events" element={<EventsList />} />
                      <Route path="/explore/venues" element={<VenuesList />} />
                      <Route path="/explore/gyms" element={<GymsList />} />
                      <Route
                        path="/explore/nutrition"
                        element={<NutritionList />}
                      />
                      <Route
                        path="/explore/clinics"
                        element={<ClinicsList />}
                      />
                      <Route
                        path="/explore/scholarships"
                        element={<Scholarships />}
                      />
                      <Route
                        path="/explore/agencies"
                        element={<AgenciesList />}
                      />
                      <Route path="/explore/jobs" element={<JobsList />} />
                      <Route
                        path="/explore/map-events"
                        element={<MapEvents />}
                      />
                      <Route
                        path="/explore/international"
                        element={<InternationalMatch />}
                      />
                      <Route path="/explore/live" element={<LiveEvents />} />
                      <Route
                        path="/explore/live/:id"
                        element={<LiveStream />}
                      />
                      <Route
                        path="/explore/replay/:id"
                        element={<ReplayStream />}
                      />
                      <Route path="/explore/fuel" element={<FuelCredits />} />
                      <Route
                        path="/explore/fuel/stations"
                        element={<PartnerGasStations />}
                      />
                      <Route
                        path="/explore/kids"
                        element={<KidsFriendlyList />}
                      />
                      <Route
                        path="/explore/flyer-creator"
                        element={<FlyerCreator />}
                      />

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
                      <Route
                        path="/explore/scholarships/:id"
                        element={<ScholarshipDetails />}
                      />
                      <Route
                        path="/explore/agencies/:id"
                        element={<AgencyDetails />}
                      />
                      <Route
                        path="/explore/scholarships/:id/apply"
                        element={<ScholarshipApplication />}
                      />

                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/profile/stats" element={<StatsDetail />} />
                      <Route
                        path="/profile/financial-statement"
                        element={<FinancialStatement />}
                      />
                      <Route path="/profile/views" element={<ProfileViews />} />
                      <Route
                        path="/profile/timeline"
                        element={<EvolutionTimeline />}
                      />
                      <Route
                        path="/profile/evolution"
                        element={<EvolutionMode />}
                      />
                      <Route
                        path="/profile/passport"
                        element={<SportsPassport />}
                      />
                      <Route
                        path="/profile/referral"
                        element={<ReferralProgram />}
                      />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route
                        path="/financials/transactions"
                        element={<TransactionHistory />}
                      />

                      <Route path="/goals" element={<GoalsDashboard />} />

                      <Route path="/messages" element={<MessagesList />} />
                      <Route path="/messages/:id" element={<ChatRoom />} />
                      <Route path="/messages/new" element={<NewChat />} />

                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route
                        path="/marketplace/product/:id"
                        element={<ProductDetails />}
                      />
                      <Route path="/marketplace/cart" element={<Cart />} />
                      <Route
                        path="/marketplace/orders"
                        element={<OrderHistory />}
                      />
                      <Route
                        path="/marketplace/orders/:id"
                        element={<OrderDetails />}
                      />

                      <Route path="/jobs" element={<JobsList />} />
                      <Route path="/jobs/:id" element={<JobDetails />} />
                      <Route
                        path="/jobs/dashboard"
                        element={<RecruiterDashboard />}
                      />

                      <Route path="/ranking" element={<Ranking />} />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/settings" element={<Settings />} />
                      <Route
                        path="/settings/privacy"
                        element={<PrivacySettings />}
                      />
                      <Route path="/settings/pwa" element={<PWASettings />} />

                      <Route path="/ai/coach" element={<AiCoach />} />
                      <Route
                        path="/ai/settings"
                        element={<AiCoachSettings />}
                      />
                      <Route
                        path="/ai/reports"
                        element={<PerformanceReports />}
                      />
                      <Route path="/ai/library" element={<ExerciseLibrary />} />
                      <Route
                        path="/ai/motion-analysis"
                        element={<MotionAnalysis />}
                      />
                      <Route
                        path="/ai/injury-scanner"
                        element={<InjuryScanner />}
                      />
                      <Route path="/ai/editor" element={<VarzeaEditor />} />
                      <Route path="/ai/ghost-play" element={<GhostPlay />} />
                      <Route path="/ai/arena-mode" element={<ArenaMode />} />
                      <Route path="/ai/avatar" element={<AiAvatar />} />
                      <Route path="/ai/oracle" element={<Oracle />} />
                      <Route path="/ai/nft-creator" element={<NftCreator />} />
                      <Route
                        path="/ai/bot-da-verdade"
                        element={<BotDaVerdade />}
                      />

                      {/* Time Capsule Routes */}
                      <Route
                        path="/timecapsule"
                        element={<TimeCapsuleDashboard />}
                      />
                      <Route
                        path="/timecapsule/create"
                        element={<CreateCapsule />}
                      />
                      <Route
                        path="/timecapsule/:id"
                        element={<CapsuleDetail />}
                      />
                    </Route>
                  </Route>

                  {/* Protected Driver Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/ride/request/:driverId"
                      element={<RideRequest />}
                    />
                    <Route
                      path="/driver/dashboard"
                      element={<DriverDashboard />}
                    />
                    <Route
                      path="/driver/requests"
                      element={<DriverRequests />}
                    />
                    <Route path="/driver/rewards" element={<DriverRewards />} />
                    <Route path="/driver/history" element={<DriverHistory />} />
                    <Route
                      path="/driver/settings"
                      element={<DriverSettings />}
                    />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </CartProvider>
          </BrandingProvider>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
