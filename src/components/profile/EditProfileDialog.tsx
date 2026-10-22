import { useState, useEffect, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Upload,
  User,
  ShieldCheck,
  Check,
  X,
  Search,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import {
  profileService,
  type ProfileRow,
  type AccountType,
} from "@/services/profiles"
import { useAuth } from "@/hooks/use-auth"
import {
  SPORTS_CATALOG,
  BRAZILIAN_STATES,
  CLUB_CATEGORIES_OPTIONS,
  COACH_SPECIALTIES_OPTIONS,
  COACH_CERTIFICATIONS_OPTIONS,
} from "@/lib/sports-catalog"

interface EditProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: ProfileRow | null
  onSuccess?: (updatedProfile: ProfileRow) => void
}

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSuccess,
}: EditProfileDialogProps) {
  const { user, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  // Form states
  const [fullName, setFullName] = useState("")
  const [accountType, setAccountType] = useState<AccountType>("athlete")
  const [sport, setSport] = useState("")
  const [sportSearch, setSportSearch] = useState("")
  const [position, setPosition] = useState("")
  const [customPosition, setCustomPosition] = useState("")
  const [city, setCity] = useState("")
  const [cityInput, setCityInput] = useState("")
  const [state, setState] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [bio, setBio] = useState("")
  const [experience, setExperience] = useState("")
  const [previousClubs, setPreviousClubs] = useState("")
  const [sportsGoals, setSportsGoals] = useState("")
  const [clubName, setClubName] = useState("")
  const [institutionalDescription, setInstitutionalDescription] = useState("")
  const [categories, setCategories] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [specialties, setSpecialties] = useState("")
  const [certifications, setCertifications] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  // Sync state whenever profile prop or dialog open changes
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "")
      setAccountType(profile.account_type || "athlete")
      setSport(profile.sport || "")
      setPosition(profile.position || "")
      setCustomPosition("")
      setCity(profile.city || "")
      setCityInput(profile.city || "")
      setState(profile.state ? profile.state.toUpperCase() : "")
      setBirthDate(profile.birth_date || "")
      setBio(profile.bio || "")
      setExperience(profile.experience || "")
      setPreviousClubs(profile.previous_clubs || "")
      setSportsGoals(profile.sports_goals || "")
      setClubName(profile.club_name || "")
      setInstitutionalDescription(profile.institutional_description || "")
      setCategories(profile.categories || "")
      setContactInfo(profile.contact_info || "")
      setSpecialties(profile.specialties || "")
      setCertifications(profile.certifications || "")
      setAvatarUrl(profile.avatar_url || "")
    }
  }, [profile, open])

  // Filtered sports list based on search text
  const filteredSports = useMemo(() => {
    if (!sportSearch.trim()) return SPORTS_CATALOG
    const query = sportSearch.toLowerCase().trim()
    return SPORTS_CATALOG.filter(
      (s) =>
        s.label.toLowerCase().includes(query) ||
        s.positions.some((p) => p.toLowerCase().includes(query)),
    )
  }, [sportSearch])

  // Current sport details & available positions
  const currentSportOption = useMemo(() => {
    return SPORTS_CATALOG.find(
      (s) => s.id.toLowerCase() === sport.toLowerCase(),
    )
  }, [sport])

  const availablePositions = currentSportOption?.positions || []

  // Available cities based on selected UF
  const currentStateObj = useMemo(() => {
    return BRAZILIAN_STATES.find((s) => s.uf === state)
  }, [state])

  const suggestedCities = currentStateObj?.majorCities || []

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user?.id) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.")
      return
    }

    setUploadingAvatar(true)
    try {
      const { url, error } = await profileService.uploadAvatar(user.id, file)
      if (error) {
        toast.error("Erro ao enviar imagem: " + error.message)
      } else if (url) {
        setAvatarUrl(url)
        toast.success("Foto enviada com sucesso!")
      }
    } catch {
      toast.error("Erro ao processar imagem.")
    } finally {
      setUploadingAvatar(false)
    }
  }

  // Handle sport change: clear position if not compatible with new sport
  const handleSelectSport = (newSport: string) => {
    setSport(newSport)
    // Check if current position belongs to the newly selected sport
    const newSportObj = SPORTS_CATALOG.find((s) => s.id === newSport)
    if (newSportObj) {
      if (!newSportObj.positions.includes(position)) {
        setPosition("")
      }
    }
  }

  // Handle state change: if city doesn't match new state, clear it
  const handleSelectState = (newUf: string) => {
    setState(newUf)
    const stateObj = BRAZILIAN_STATES.find((s) => s.uf === newUf)
    if (stateObj && city && !stateObj.majorCities.includes(city)) {
      setCity("")
      setCityInput("")
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      toast.error("Você precisa estar autenticado para salvar.")
      return
    }

    if (saving) return

    setSaving(true)

    try {
      const finalPosition =
        customPosition.trim() !== "" ? customPosition.trim() : position.trim()
      const finalCity = cityInput.trim() !== "" ? cityInput.trim() : city.trim()

      const updates = {
        full_name: fullName.trim() || null,
        account_type: accountType,
        sport: sport.trim() || null,
        position: finalPosition || null,
        city: finalCity || null,
        state: state.trim() || null,
        birth_date: birthDate ? birthDate : null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        // Specific fields
        experience: experience.trim() || null,
        previous_clubs: previousClubs.trim() || null,
        sports_goals: sportsGoals.trim() || null,
        club_name: clubName.trim() || null,
        institutional_description: institutionalDescription.trim() || null,
        categories: categories.trim() || null,
        contact_info: contactInfo.trim() || null,
        specialties: specialties.trim() || null,
        certifications: certifications.trim() || null,
      }

      const { data, error } = await profileService.updateMyProfile(
        user.id,
        updates,
      )

      if (error) {
        toast.error("Não foi possível salvar o perfil: " + error.message)
        return
      }

      if (data) {
        await refreshProfile()
        toast.success("Perfil atualizado com sucesso no Supabase!")
        if (onSuccess) {
          onSuccess(data)
        }
        onOpenChange(false)
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro inesperado ao salvar perfil.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Editar Perfil Goplay
          </DialogTitle>
          <DialogDescription>
            Personalize suas informações oficiais com catálogos completos e
            opções dinâmicas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-5 pt-2">
          {/* Avatar Upload / URL */}
          <div className="space-y-2 p-3 bg-secondary/30 rounded-xl border border-border/50">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Foto de Perfil
            </Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-secondary overflow-hidden border-2 border-border flex items-center justify-center shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleAvatarFile}
                      disabled={uploadingAvatar || saving}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploadingAvatar || saving}
                      asChild
                    >
                      <span>
                        {uploadingAvatar ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Enviando ao Storage...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Carregar Foto
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                  {avatarUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => setAvatarUrl("")}
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Remover
                    </Button>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Até 5MB (JPG, PNG, WebP)
                  </span>
                </div>
                <Input
                  placeholder="Ou informe a URL direta da imagem..."
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="text-xs h-8 bg-background"
                />
              </div>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="account_type" className="font-semibold">
              Tipo de Conta <span className="text-destructive">*</span>
            </Label>
            <Select
              value={accountType}
              onValueChange={(val) => setAccountType(val as AccountType)}
            >
              <SelectTrigger id="account_type">
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athlete">
                  Atleta (Foco em Performance & Carreira)
                </SelectItem>
                <SelectItem value="club">Clube / Time Esportivo</SelectItem>
                <SelectItem value="coach">Treinador / Coach Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Common fields: Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name" className="font-semibold">
              {accountType === "club"
                ? "Nome do Clube / Entidade Esportiva"
                : "Nome Completo"}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Carlos Silva ou Grêmio Esportivo Brasil"
              required
            />
          </div>

          {/* Sport Selection (Searchable & Dynamic) */}
          <div className="space-y-3 p-3 bg-secondary/20 rounded-xl border border-border/40">
            <div className="flex items-center justify-between">
              <Label className="font-semibold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                Modalidade Esportiva
              </Label>
              {sport && (
                <Badge
                  variant="outline"
                  className="text-xs bg-primary/10 border-primary/30 text-primary"
                >
                  Selecionado: {sport}
                </Badge>
              )}
            </div>

            {/* Quick search input for sports */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Pesquisar esportes (Futebol, Basquete, Natação, Lutas, Tênis...)"
                className="pl-8 h-9 text-xs bg-background"
                value={sportSearch}
                onChange={(e) => setSportSearch(e.target.value)}
              />
              {sportSearch && (
                <button
                  type="button"
                  onClick={() => setSportSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sports chips / list */}
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-background/50 rounded-lg border border-border/40">
              {filteredSports.slice(0, 30).map((s) => {
                const isSelected = sport.toLowerCase() === s.id.toLowerCase()
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectSport(s.id)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-all flex items-center gap-1 border ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                        : "bg-secondary/60 hover:bg-secondary text-foreground border-border/50"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    {s.label}
                  </button>
                )
              })}
            </div>

            {/* Dependent Field: Position / Role tailored to selected sport */}
            <div className="pt-2">
              <Label
                htmlFor="position"
                className="text-xs font-semibold mb-1 block"
              >
                {accountType === "club"
                  ? "Divisão ou Categoria Principal"
                  : accountType === "coach"
                    ? "Especialidade / Função na Modalidade"
                    : `Posição ou Função em ${sport || "Esporte"}`}
              </Label>

              {availablePositions.length > 0 && accountType === "athlete" ? (
                <div className="space-y-2">
                  <Select
                    value={position}
                    onValueChange={(val) => {
                      setPosition(val)
                      setCustomPosition("")
                    }}
                  >
                    <SelectTrigger id="position" className="bg-background">
                      <SelectValue placeholder="Selecione sua posição oficial" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePositions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                      <SelectItem value="__custom__">
                        Outra posição personalizada...
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {position === "__custom__" && (
                    <Input
                      placeholder="Informe sua posição personalizada"
                      value={customPosition}
                      onChange={(e) => setCustomPosition(e.target.value)}
                      className="bg-background text-xs"
                    />
                  )}
                </div>
              ) : (
                <Input
                  id="position"
                  value={customPosition || position}
                  onChange={(e) => {
                    setPosition(e.target.value)
                    setCustomPosition(e.target.value)
                  }}
                  placeholder={
                    accountType === "club"
                      ? "Ex: Série A, Divisão de Acesso, Categoria Sub-20"
                      : accountType === "coach"
                        ? "Ex: Treinador Principal, Preparador Físico, Técnico de Base"
                        : "Ex: Atacante, Meio-Campo, Armador, Nadador Velocista"
                  }
                  className="bg-background"
                />
              )}
            </div>
          </div>

          {/* Assisted State and City Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-secondary/20 rounded-xl border border-border/40">
            {/* Estado (UF) */}
            <div className="space-y-1.5">
              <Label htmlFor="state_select" className="text-xs font-semibold">
                Estado (UF)
              </Label>
              <Select value={state} onValueChange={handleSelectState}>
                <SelectTrigger id="state_select" className="bg-background">
                  <SelectValue placeholder="Selecione o estado..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {BRAZILIAN_STATES.map((st) => (
                    <SelectItem key={st.uf} value={st.uf}>
                      {st.name} ({st.uf})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cidade assistida */}
            <div className="space-y-1.5">
              <Label htmlFor="city_input" className="text-xs font-semibold">
                Cidade {state ? `(${state})` : ""}
              </Label>
              {suggestedCities.length > 0 ? (
                <div className="space-y-1.5">
                  <Select
                    value={city}
                    onValueChange={(val) => {
                      setCity(val)
                      setCityInput(val)
                    }}
                  >
                    <SelectTrigger id="city_input" className="bg-background">
                      <SelectValue placeholder="Escolha uma cidade sugerida" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {suggestedCities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                      <SelectItem value="__custom_city__">
                        Outra cidade do estado...
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {city === "__custom_city__" && (
                    <Input
                      placeholder="Digite o nome da cidade"
                      value={cityInput === "__custom_city__" ? "" : cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      className="bg-background text-xs"
                    />
                  )}
                </div>
              ) : (
                <Input
                  id="city_input"
                  value={cityInput}
                  onChange={(e) => {
                    setCity(e.target.value)
                    setCityInput(e.target.value)
                  }}
                  placeholder="Ex: São Paulo, Rio de Janeiro..."
                  className="bg-background"
                />
              )}
            </div>
          </div>

          {/* Athlete Specific Fields */}
          {accountType === "athlete" && (
            <div className="space-y-3 border-t pt-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="birth_date" className="text-xs font-semibold">
                    Data de Nascimento
                  </Label>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    Protegido (não exposto publicamente)
                  </span>
                </div>
                <Input
                  id="birth_date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="previous_clubs"
                  className="text-xs font-semibold"
                >
                  Clubes e Equipes Anteriores
                </Label>
                <Input
                  id="previous_clubs"
                  value={previousClubs}
                  onChange={(e) => setPreviousClubs(e.target.value)}
                  placeholder="Ex: Santos FC (Base), Esporte Clube Taubaté"
                  className="bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sports_goals" className="text-xs font-semibold">
                  Objetivos Esportivos
                </Label>
                <Input
                  id="sports_goals"
                  value={sportsGoals}
                  onChange={(e) => setSportsGoals(e.target.value)}
                  placeholder="Ex: Disputar torneios nacionais, bolsa universitária, contrato profissional"
                  className="bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="experience" className="text-xs font-semibold">
                  Experiência Esportiva & Histórico de Competições
                </Label>
                <Textarea
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Descreva suas conquistas, anos de treino e histórico competitivo..."
                  rows={2}
                  className="bg-background"
                />
              </div>
            </div>
          )}

          {/* Club Specific Fields */}
          {accountType === "club" && (
            <div className="space-y-3 border-t pt-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="club_categories"
                  className="text-xs font-semibold"
                >
                  Categorias Esportivas do Clube
                </Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {CLUB_CATEGORIES_OPTIONS.map((cat) => {
                    const isIncluded = categories.includes(cat)
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          let nextCategories = categories
                            ? categories
                                .split(",")
                                .map((c) => c.trim())
                                .filter(Boolean)
                            : []
                          if (isIncluded) {
                            nextCategories = nextCategories.filter(
                              (c) => c !== cat,
                            )
                          } else {
                            nextCategories.push(cat)
                          }
                          setCategories(nextCategories.join(", "))
                        }}
                        className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                          isIncluded
                            ? "bg-primary text-primary-foreground border-primary font-semibold"
                            : "bg-secondary/60 hover:bg-secondary text-muted-foreground border-border/60"
                        }`}
                      >
                        {isIncluded ? "✓ " : "+ "}
                        {cat}
                      </button>
                    )
                  })}
                </div>
                <Input
                  id="club_categories"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  placeholder="Categorias separadas por vírgula (ou selecione acima)"
                  className="bg-background text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact_info" className="text-xs font-semibold">
                  Informações de Contato Oficial
                </Label>
                <Input
                  id="contact_info"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Ex: secretaria@clube.com.br / (11) 98765-4321"
                  className="bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="institutional_description"
                  className="text-xs font-semibold"
                >
                  Descrição Institucional do Clube
                </Label>
                <Textarea
                  id="institutional_description"
                  value={institutionalDescription}
                  onChange={(e) => setInstitutionalDescription(e.target.value)}
                  placeholder="Histórico do clube, instalações, filosofia de formação..."
                  rows={3}
                  className="bg-background"
                />
              </div>
            </div>
          )}

          {/* Coach Specific Fields */}
          {accountType === "coach" && (
            <div className="space-y-3 border-t pt-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="specialties_coach"
                  className="text-xs font-semibold"
                >
                  Especialidades do Treinador
                </Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COACH_SPECIALTIES_OPTIONS.map((spec) => {
                    const isIncluded = specialties.includes(spec)
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => {
                          let next = specialties
                            ? specialties
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            : []
                          if (isIncluded) {
                            next = next.filter((s) => s !== spec)
                          } else {
                            next.push(spec)
                          }
                          setSpecialties(next.join(", "))
                        }}
                        className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                          isIncluded
                            ? "bg-primary text-primary-foreground border-primary font-semibold"
                            : "bg-secondary/60 hover:bg-secondary text-muted-foreground border-border/60"
                        }`}
                      >
                        {isIncluded ? "✓ " : "+ "}
                        {spec}
                      </button>
                    )
                  })}
                </div>
                <Input
                  id="specialties_coach"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  placeholder="Especialidades separadas por vírgula"
                  className="bg-background text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="certifications_coach"
                  className="text-xs font-semibold"
                >
                  Certificações e Licenças
                </Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COACH_CERTIFICATIONS_OPTIONS.map((cert) => {
                    const isIncluded = certifications.includes(cert)
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => {
                          let next = certifications
                            ? certifications
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean)
                            : []
                          if (isIncluded) {
                            next = next.filter((s) => s !== cert)
                          } else {
                            next.push(cert)
                          }
                          setCertifications(next.join(", "))
                        }}
                        className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                          isIncluded
                            ? "bg-primary text-primary-foreground border-primary font-semibold"
                            : "bg-secondary/60 hover:bg-secondary text-muted-foreground border-border/60"
                        }`}
                      >
                        {isIncluded ? "✓ " : "+ "}
                        {cert}
                      </button>
                    )
                  })}
                </div>
                <Input
                  id="certifications_coach"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="Licenças e certificações (ex: CREF, Licença CBF...)"
                  className="bg-background text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="coach_experience"
                  className="text-xs font-semibold"
                >
                  Experiência Profissional & Passagens por Clubes
                </Label>
                <Textarea
                  id="coach_experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Relate sua trajetória técnica, comissões que liderou ou integrou..."
                  rows={2}
                  className="bg-background"
                />
              </div>
            </div>
          )}

          {/* Bio for everyone */}
          <div className="space-y-1.5 border-t pt-3">
            <Label htmlFor="bio" className="text-xs font-semibold">
              Biografia / Apresentação Geral
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Escreva um breve resumo da sua trajetória e aspirações..."
              rows={3}
              className="bg-background"
            />
          </div>

          <DialogFooter className="pt-3 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando no Supabase...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
