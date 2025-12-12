import useBrandingStore from '@/stores/useBrandingStore'

export const PageLoader = () => {
  const { logoUrl } = useBrandingStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-fade-in relative overflow-hidden">
      {/* Background blobs for premium feel using brand colors */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-background/50 flex items-center justify-center animate-pulse border border-border/50 shadow-xl backdrop-blur-sm mb-6">
          <img
            src={logoUrl}
            alt="Goplay Loading"
            className="w-16 h-16 object-contain"
          />
        </div>
        <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse delay-75 pointer-events-none" />

        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Carregando Goplay...
        </p>
      </div>
    </div>
  )
}
