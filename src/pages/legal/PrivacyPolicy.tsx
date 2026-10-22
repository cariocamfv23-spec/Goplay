import { useNavigate, Link } from "react-router-dom"
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  UserCheck,
  Eye,
  FileCheck,
  Mail,
  AlertCircle,
  Database,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
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
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Política de Privacidade
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Goplay App • Em conformidade com a LGPD (Lei nº 13.709/2018)
              </p>
            </div>
          </div>
          <Link to="/terms">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5 text-primary" />
              Termos de Uso
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Intro Banner */}
        <Card className="border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-background to-secondary/30">
          <CardContent className="p-5 sm:p-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Lock className="w-3 h-3" />
              Compromisso com a Proteção de Dados
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Sua Privacidade e a Segurança dos Seus Dados Esportivos
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              O Goplay tem o compromisso de resguardar a privacidade e proteger
              os dados pessoais de todos os atletas, responsáveis, clubes e
              profissionais do esporte que utilizam nossa plataforma. Esta
              política detalha como coletamos, tratamos, armazenamos e
              protegemos suas informações, com atenção prioritária aos dados de
              atletas menores de idade.
            </p>
          </CardContent>
        </Card>

        {/* Section 1 - Collected Data */}
        <section className="space-y-3 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              1
            </span>
            Quais Dados Coletamos
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed pl-8">
            <p>
              Para prestar os serviços esportivos do Goplay, coletamos as
              seguintes categorias de dados:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-foreground/90 pl-1 text-xs">
              <li>
                <strong>Dados Cadastrais e de Identificação:</strong> Nome
                completo, e-mail, data de nascimento, cidade/estado, foto de
                perfil e biografia.
              </li>
              <li>
                <strong>Dados Esportivos (Passaporte Esportivo):</strong>{" "}
                Modalidade esportiva, posição de jogo, pé/mão dominante, altura,
                peso, histórico de clubes anteriores, títulos, certificações e
                metas de carreira.
              </li>
              <li>
                <strong>Conteúdo de Mídia:</strong> Vídeos de lances, fotos de
                jogos, áudios e postagens compartilhadas no feed social.
              </li>
              <li>
                <strong>Métricas de Uso e Telemetria:</strong> Registros em
                nossa tabela analítica (
                <code className="text-[11px] bg-secondary px-1 py-0.5 rounded">
                  analytics_events
                </code>
                ), incluindo visualizações de perfis, interações com posts,
                inscrições em eventos e cliques de compartilhamento, utilizados
                para aprimoramento da plataforma.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 - Minors Special Protection */}
        <section className="space-y-3 bg-card rounded-2xl border-2 border-emerald-500/40 p-5 shadow-xs bg-emerald-500/[0.02]">
          <div className="flex items-center gap-2 text-emerald-500">
            <UserCheck className="w-5 h-5 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              2. Proteção Especial de Dados de Crianças e Adolescentes (Art. 14
              da LGPD)
            </h3>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed pl-7">
            <p>
              Em conformidade estrita com o Artigo 14 da Lei Geral de Proteção
              de Dados Pessoais (LGPD), o tratamento de dados pessoais de
              crianças e adolescentes é realizado no{" "}
              <strong>melhor interesse do menor</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-foreground/90 pl-1 text-xs">
              <li>
                <strong>Consentimento de Responsáveis:</strong> O cadastro de
                atletas menores de 18 anos requer anuência de ao menos um dos
                pais ou responsável legal.
              </li>
              <li>
                <strong>Finalidade Exclusivamente Esportiva:</strong> Os dados
                coletados destinam-se unicamente ao desenvolvimento esportivo,
                avaliação técnica por olheiros/clubes credenciados e
                participação em peneiras oficiais.
              </li>
              <li>
                <strong>Não Comercialização de Dados:</strong> O Goplay{" "}
                <strong>JAMAIS</strong> vende, aluga ou cede dados de atletas
                menores de idade para fins de publicidade direcionada ou
                empresas de crédito.
              </li>
              <li>
                <strong>Canal Exclusivo para Responsáveis:</strong> Os pais
                podem, a qualquer tempo, solicitar acesso, correção ou exclusão
                total dos dados do menor pelo e-mail do Encarregado de Proteção
                de Dados:{" "}
                <a
                  href="mailto:cariocamfv23@gmail.com"
                  className="font-bold text-primary hover:underline"
                >
                  cariocamfv23@gmail.com
                </a>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 - Purpose */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              3
            </span>
            Finalidades do Tratamento
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-1.5 leading-relaxed pl-8">
            <p>Utilizamos os dados pessoais para:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 pl-1 text-xs">
              <li>
                Gerar o Passaporte Esportivo e o currículo do atleta para
                visualização de scouts e treinadores;
              </li>
              <li>
                Operar o matchmaking esportivo entre clubes, atletas e
                profissionais;
              </li>
              <li>
                Processar inscrições em peneiras, campeonatos e seletivas;
              </li>
              <li>
                Garantir a segurança da comunidade por meio do canal de
                denúncias e bloqueios;
              </li>
              <li>
                Cumprir obrigações legais e regulatórias vigentes no Brasil.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 - Sharing */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              4
            </span>
            Compartilhamento de Dados com Terceiros
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed pl-8">
            <p>
              Os dados de atletas são compartilhados nas seguintes hipóteses
              específicas:
            </p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 pl-1 text-xs">
              <li>
                <strong>Com Organizadores de Eventos e Peneiras:</strong> Quando
                o atleta (ou seu responsável) se inscreve voluntariamente em uma
                seletiva, os dados de contato e ficha esportiva são
                disponibilizados ao organizador para gerenciamento da chamada.
              </li>
              <li>
                <strong>Passaporte Público:</strong> Caso o atleta opte por
                compartilhar seu link público (
                <code className="text-[11px] bg-secondary px-1 py-0.5 rounded">
                  /passport/[id]
                </code>
                ), as informações esportivas públicas ficam visíveis para quem
                possuir o link.
              </li>
              <li>
                <strong>Provedores de Infraestrutura:</strong> Serviços de
                hospedagem em nuvem e banco de dados (Supabase) com criptografia
                de tráfego e repouso.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 - Rights under LGPD */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              5
            </span>
            Direitos do Titular de Dados (Art. 18 da LGPD)
          </h3>
          <div className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed pl-8">
            <p>O titular dos dados (ou seu responsável legal) tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 pl-1 text-xs">
              <li>
                Confirmação da existência de tratamento e acesso aos dados;
              </li>
              <li>
                Correção de dados incompletos, inexatos ou desatualizados;
              </li>
              <li>Eliminação dos dados tratados com seu consentimento;</li>
              <li>Portabilidade dos dados para outro fornecedor de serviço;</li>
              <li>Revogação do consentimento a qualquer momento.</li>
            </ul>
          </div>
        </section>

        {/* Section 6 - Retention */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              6
            </span>
            Retenção e Exclusão de Informações
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            Os dados são mantidos enquanto a conta do usuário permanecer ativa.
            Ao solicitar exclusão, todos os dados de perfil, postagens e
            métricas são eliminados de nossos bancos de dados ativos no prazo de
            até 15 dias corridos, salvo dados necessários para cumprimento de
            dever legal (Marco Civil da Internet, registros de conexão por 6
            meses).
          </p>
        </section>

        {/* Section 7 - Cookies & LocalStorage */}
        <section className="space-y-2 bg-card rounded-2xl border border-border/50 p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold">
              7
            </span>
            Cookies e Armazenamento Local
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8">
            Utilizamos armazenamento local do navegador (
            <code className="text-[11px] bg-secondary px-1 py-0.5 rounded">
              localStorage
            </code>{" "}
            e cookies de sessão) estritamente para manter você conectado (tokens
            de autenticação Supabase) e guardar suas preferências visuais (tema
            claro/escuro). Não empregamos cookies de rastreamento invasivo de
            terceiros.
          </p>
        </section>

        {/* DPO / Encarregado */}
        <Card className="border border-emerald-500/40 bg-secondary/30">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-500">
                Encarregado de Proteção de Dados (DPO)
              </div>
              <h4 className="text-sm font-bold text-foreground">
                Canal Oficial de Atendimento ao Titular
              </h4>
              <p className="text-xs text-muted-foreground">
                Para exercer seus direitos de acesso, retificação ou exclusão de
                dados de atletas (inclusive menores):
              </p>
              <a
                href="mailto:cariocamfv23@gmail.com"
                className="text-xs font-bold text-primary hover:underline block pt-0.5"
              >
                cariocamfv23@gmail.com
              </a>
            </div>
            <Link to="/terms">
              <Button
                size="sm"
                variant="outline"
                className="font-semibold text-xs"
              >
                Ler Termos de Uso
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
