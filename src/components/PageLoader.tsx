export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background animate-fade-in">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center animate-pulse border border-primary/20">
          <img
            src="https://img.usecurling.com/i?q=play&shape=fill&color=violet"
            alt="Loading..."
            className="w-10 h-10"
          />
        </div>
        <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse delay-75" />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Carregando...
      </p>
    </div>
  )
}
