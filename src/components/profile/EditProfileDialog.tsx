import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Upload, User, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import {
  profileService,
  type ProfileRow,
  type AccountType,
} from '@/services/profiles'
import { useAuth } from '@/hooks/use-auth'

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
  const [fullName, setFullName] = useState('')
  const [accountType, setAccountType] = useState<AccountType>('athlete')
  const [sport, setSport] = useState('')
  const [position, setPosition] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [bio, setBio] = useState('')
  const [experience, setExperience] = useState('')
  const [previousClubs, setPreviousClubs] = useState('')
  const [sportsGoals, setSportsGoals] = useState('')
  const [clubName, setClubName] = useState('')
  const [institutionalDescription, setInstitutionalDescription] = useState('')
  const [categories, setCategories] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [specialties, setSpecialties] = useState('')
  const [certifications, setCertifications] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setAccountType(profile.account_type || 'athlete')
      setSport(profile.sport || '')
      setPosition(profile.position || '')
      setCity(profile.city || '')
      setState(profile.state || '')
      setBirthDate(profile.birth_date || '')
      setBio(profile.bio || '')
      setExperience(profile.experience || '')
      setPreviousClubs(profile.previous_clubs || '')
      setSportsGoals(profile.sports_goals || '')
      setClubName(profile.club_name || '')
      setInstitutionalDescription(profile.institutional_description || '')
      setCategories(profile.categories || '')
      setContactInfo(profile.contact_info || '')
      setSpecialties(profile.specialties || '')
      setCertifications(profile.certifications || '')
      setAvatarUrl(profile.avatar_url || '')
    }
  }, [profile, open])

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user?.id) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB.')
      return
    }

    setUploadingAvatar(true)
    try {
      const { url, error } = await profileService.uploadAvatar(user.id, file)
      if (error) {
        toast.error('Erro ao enviar imagem: ' + error.message)
      } else if (url) {
        setAvatarUrl(url)
        toast.success('Foto enviada com sucesso!')
      }
    } catch (err: any) {
      toast.error('Erro ao processar imagem.')
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      toast.error('Você precisa estar autenticado para salvar.')
      return
    }

    if (saving) return

    setSaving(true)

    try {
      const updates = {
        full_name: fullName.trim() || null,
        account_type: accountType,
        sport: sport.trim() || null,
        position: position.trim() || null,
        city: city.trim() || null,
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
        toast.error('Não foi possível salvar o perfil: ' + error.message)
        return
      }

      if (data) {
        await refreshProfile()
        toast.success('Perfil atualizado com sucesso no Supabase!')
        if (onSuccess) {
          onSuccess(data)
        }
        onOpenChange(false)
      }
    } catch (err: any) {
      toast.error(err?.message || 'Erro inesperado ao salvar perfil.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Editar Perfil
          </DialogTitle>
          <DialogDescription>
            Atualize suas informações reais. As alterações serão salvas
            diretamente na sua conta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {/* Avatar Upload / URL */}
          <div className="space-y-2">
            <Label>Foto de Perfil</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-secondary overflow-hidden border border-border flex items-center justify-center shrink-0">
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
                            Enviando...
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
                  <span className="text-xs text-muted-foreground">
                    Até 5MB (JPG, PNG, WebP)
                  </span>
                </div>
                <Input
                  placeholder="Ou cole a URL direta da imagem"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="text-xs h-8"
                />
              </div>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="account_type">Tipo de Conta</Label>
            <Select
              value={accountType}
              onValueChange={(val) => setAccountType(val as AccountType)}
            >
              <SelectTrigger id="account_type">
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athlete">Atleta</SelectItem>
                <SelectItem value="club">Clube / Time</SelectItem>
                <SelectItem value="coach">Treinador / Coach</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Common fields */}
          <div className="space-y-2">
            <Label htmlFor="full_name">
              {accountType === 'club'
                ? 'Nome do Clube / Entidade'
                : 'Nome Completo'}
            </Label>
            <Input
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Ex: Carlos Silva ou Grêmio Esportivo"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="sport">Modalidade Esportiva</Label>
              <Input
                id="sport"
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                placeholder="Ex: Futebol, Basquete, Vôlei"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">
                {accountType === 'club'
                  ? 'Divisão / Série'
                  : accountType === 'coach'
                    ? 'Função Técnica'
                    : 'Posição'}
              </Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Ex: Atacante, Técnico Sub-20, Série A"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: São Paulo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado (UF)</Label>
              <Input
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Ex: SP"
                maxLength={2}
              />
            </div>
          </div>

          {/* Athlete specific */}
          {accountType === 'athlete' && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="birth_date">Data de Nascimento</Label>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    Protegido (não visível publicamente)
                  </span>
                </div>
                <Input
                  id="birth_date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previous_clubs">
                  Clubes ou Equipes Anteriores
                </Label>
                <Input
                  id="previous_clubs"
                  value={previousClubs}
                  onChange={(e) => setPreviousClubs(e.target.value)}
                  placeholder="Ex: Santos FC (Sub-17), Paulista FC"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sports_goals">Objetivos Esportivos</Label>
                <Input
                  id="sports_goals"
                  value={sportsGoals}
                  onChange={(e) => setSportsGoals(e.target.value)}
                  placeholder="Ex: Conquistar bolsa universitária, disputar torneio nacional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experiência Esportiva</Label>
                <Textarea
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Ex: 5 anos nas categorias de base, campeão estadual 2023..."
                  rows={2}
                />
              </div>
            </>
          )}

          {/* Club specific */}
          {accountType === 'club' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="institutional_description">
                  Descrição Institucional
                </Label>
                <Textarea
                  id="institutional_description"
                  value={institutionalDescription}
                  onChange={(e) => setInstitutionalDescription(e.target.value)}
                  placeholder="Fundado em 1995, formador de atletas com foco em excelência e cidadania."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categorias Esportivas</Label>
                <Input
                  id="categories"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  placeholder="Ex: Sub-13, Sub-15, Sub-17, Profissional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_info">Informações de Contato</Label>
                <Input
                  id="contact_info"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Ex: secretaria@clube.com.br / (11) 98765-4321"
                />
              </div>
            </>
          )}

          {/* Coach specific */}
          {accountType === 'coach' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="specialties">Especialidades e Funções</Label>
                <Input
                  id="specialties"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  placeholder="Ex: Preparação Física, Treinamento Tático, Alta Performance"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certificações e Licenças</Label>
                <Input
                  id="certifications"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  placeholder="Ex: Licença B CBF Academy, CREF 123456-G/SP"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_coach">
                  Experiência Profissional
                </Label>
                <Textarea
                  id="experience_coach"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Ex: 8 anos no futebol de base, passagens por comissões técnicas estaduais..."
                  rows={2}
                />
              </div>
            </>
          )}

          {/* Bio for everyone */}
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia / Apresentação</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Escreva um breve resumo sobre sua trajetória esportiva..."
              rows={3}
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
                'Salvar Alterações'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
