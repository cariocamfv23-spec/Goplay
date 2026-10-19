import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertTriangle,
  Users,
  Trophy,
  Scale,
  Mail,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-base sm:text-lg font-bold leading-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Termos de Uso
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Goplay App • Atualizado em Outubro de 2026
              </p>
            </div>
          </div>
          <Link to="/privacy">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-primary" />
              Política de Privacidade
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Intro Banner */}
        <Card className="border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
          <CardContent className="p-5 sm:p-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              <Scale className="w-3 h-3" />
              Contrato de Adesão do Usuário
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Bem-vindo ao Goplay App
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Estes Termos de Uso regem a utilização da plataforma Goplay
              (aplicativo web e mobile), seus serviços de matchmaking esportivo,
              Passaporte Esportivo digital, feed social e divulgação de
              eventos/peneiras. Ao criar sua conta ou utilizar o aplicativo,
              você declara ter lido, compreendido e concordado com as condições
              aqui estabelecidas.
            </p>
          </CardContent>
        </Card>

        {/* Section 1 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              1
            </span>
            Natureza do Serviço e Matchmaking Esportivo
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            O Goplay é uma plataforma de tecnologia destinada a conectar
            atletas, treinadores, olheiros, clubes e organizadores esportivos. A
            plataforma fornece ferramentas para criação de perfil oficial,
            Passaporte Esportivo com histórico de carreira, compartilhamento de
            vídeos e destaques em feed social, bem como divulgação e inscrição
            em eventos esportivos.
          </p>
        </section>

        {/* Section 2 - Minors highlight */}
        <section className="space-y-3 bg-card rounded-2xl border-2 border-amber-500/30 p-5 shadow-xs bg-amber-500/[0.02]">
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              2. Elegibilidade e Proteção Especial a Menores de 18 Anos
            </h3>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2.5 leading-relaxed pl-7">
            <p>
              Reconhecemos a relevância do esporte na formação de crianças e
              adolescentes, bem como a legislação brasileira de proteção à
              infância (ECA — Estatuto da Criança e do Adolescente) e a LGPD.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-foreground/90 pl-1 text-xs">
              <li>
                <strong>Idade mínima:</strong> O cadastro de atletas com menos
                de 18 anos deve ser realizado com a ciência, anuência e
                supervisão direta de ao menos um dos pais ou responsável legal.
              </li>
              <li>
                <strong>Inscrição em Peneiras e Seletivas:</strong> A
                participação de menores de idade em testes, seletivas ou
                campeonatos requer expressa autorização do responsável legal
                perante os organizadores do evento, cabendo aos responsáveis
                acompanhar o atleta no dia da avaliação.
              </li>
              <li>
                <strong>Tolerância Zero para Abordagens Indevidas:</strong> É
                estritamente proibida qualquer abordagem inapropriada,
                solicitação de material íntimo ou aliciamento de atletas menores
                de idade. Violações resultarão em banimento imediato e
                comunicação imediata às autoridades competentes (Conselho
                Tutelar e Ministério Público).
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              3
            </span>
            Conta de Usuário, Segurança e Veracidade dos Dados
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed pl-8">
            <p>
              Para acessar os recursos do Goplay, o usuário deve criar uma conta
              fornecendo informações reais, precisas e atualizadas.
            </p>
            <p>
              O usuário é o único responsável pela guarda e confidencialidade de
              suas credenciais de acesso, bem como por quaisquer atividades
              realizadas por meio de sua conta. Informações esportivas falsas
              (idade adulterada, histórico fictício de clubes) configuram
              infração e ensejam desativação do perfil.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              4
            </span>
            Código de Conduta e Diretrizes da Comunidade
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-1.5 leading-relaxed pl-8">
            <p>O usuário concorda em NÃO praticar:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 pl-1 text-xs">
              <li>
                Assédio moral, perseguição (cyberstalking), bullying ou
                discriminação de qualquer natureza (racial, de gênero,
                orientação sexual, crença ou origem).
              </li>
              <li>
                Publicação de pornografia, violência gráfica ou apologia ao
                crime.
              </li>
              <li>
                Spam, correntes, propaganda não autorizada ou fraudes
                financeiras.
              </li>
              <li>
                Uso indevido de direitos autorais de terceiros (músicas sem
                autorização para fins comerciais ou imagens alheias).
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 - Events / Peneiras disclaimers */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              5
            </span>
            Eventos, Peneiras, Seletivas e Isenção de Responsabilidade
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed pl-8">
            <p>
              O Goplay atua exclusivamente como plataforma de divulgação e
              intermediação tecnológica.{' '}
              <strong>
                A realização física, organização técnica, estrutura de
                segurança, atendimento médico, alvarás públicos e integridade do
                local das peneiras são de exclusiva responsabilidade do clube ou
                organizador cadastrado.
              </strong>
            </p>
            <p>
              O Goplay não garante contratação, aprovação em seletivas nem
              vínculos profissionais. Recomendamos aos atletas e responsáveis
              verificar a idoneidade dos eventos e comparecer sempre
              acompanhados.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              6
            </span>
            Mecanismos de Denúncia, Bloqueio e Moderação
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            A plataforma disponibiliza ferramentas nativas para denúncia de
            publicações, comentários, perfis e eventos suspeitos, além de
            bloqueio mútuo entre usuários. A equipe de moderação do Goplay se
            reserva o direito de suspender ou banir preventivamente contas que
            infrinjam estes termos, sem necessidade de aviso prévio em casos de
            risco a menores ou fraude evidente.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              7
            </span>
            Propriedade Intelectual e Licença de Conteúdo
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            A marca, identidade visual, código-fonte e algoritmos do Goplay são
            de propriedade exclusiva de seus idealizadores. Ao publicar fotos,
            vídeos e dados esportivos em sua conta pública, o usuário concede ao
            Goplay uma licença gratuita e não exclusiva para exibição do
            conteúdo dentro do app e para conexão com outros usuários (clubes,
            olheiros e treinadores).
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              8
            </span>
            Encerramento de Conta e Rescisão
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            O usuário pode solicitar a exclusão de sua conta a qualquer momento
            pelo aplicativo ou enviando uma solicitação para o canal de suporte.
            O Goplay poderá suspender ou encerrar contas inativas por período
            prolongado ou que violem estes Termos.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              9
            </span>
            Legislação Aplicável e Foro
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            Estes Termos são regidos pelas leis da República Federativa do
            Brasil, incluindo o Marco Civil da Internet (Lei nº 12.965/2014) e a
            Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Fica eleito o
            foro da comarca de domicílio do consumidor ou a comarca da capital
            do Rio de Janeiro para dirimir quaisquer controvérsias oriundas
            deste documento.
          </p>
        </section>

        {/* Contact box */}
        <Card className="border border-border/70 bg-secondary/30">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-primary" />
                Dúvidas sobre os Termos?
              </h4>
              <p className="text-xs text-muted-foreground">
                Entre em contato com nossa equipe jurídica e de suporte:
              </p>
              <a
                href="mailto:cariocamfv23@gmail.com"
                className="text-xs font-semibold text-primary hover:underline block"
              >
                cariocamfv23@gmail.com
              </a>
            </div>
            <Link to="/privacy">
              <Button size="sm" className="font-semibold text-xs">
                Ver Política de Privacidade
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
