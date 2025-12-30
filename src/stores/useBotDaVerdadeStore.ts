import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ChatMessage, EvaluationData } from '@/types/chat'
import { mockCurrentUser } from '@/lib/data'

interface BotState {
  messages: ChatMessage[]
  isTyping: boolean
  sendMessage: (text: string) => void
  clearHistory: () => void
  generateEvaluation: () => void
}

export const useBotDaVerdadeStore = create<BotState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 'welcome',
          sender: 'bot',
          text: 'Sou o Bot da Verdade. Não estou aqui para te elogiar, estou aqui para te evoluir. Quer saber a realidade sobre o seu desempenho?',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          type: 'text',
          isMe: false,
        },
      ],
      isTyping: false,

      sendMessage: (text) => {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          sender: 'me',
          text,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          type: 'text',
          isMe: true,
        }

        set((state) => ({ messages: [...state.messages, newMessage] }))

        // Bot Response Logic
        set({ isTyping: true })
        setTimeout(() => {
          const lowerText = text.toLowerCase()
          let responseText = ''
          let responseType: ChatMessage['type'] = 'text'
          let evaluationData: EvaluationData | undefined

          if (
            lowerText.includes('avaliar') ||
            lowerText.includes('avaliação') ||
            lowerText.includes('verdade') ||
            lowerText.includes('desempenho') ||
            lowerText.includes('stats')
          ) {
            responseText =
              'Analisando seus dados brutos... Esqueça os elogios dos amigos. Aqui estão os fatos.'
            responseType = 'evaluation'

            // Mock Evaluation Logic based on mockCurrentUser
            const stats = mockCurrentUser.stats
            const winRate =
              stats.matches > 0
                ? Math.round((stats.wins / stats.matches) * 100)
                : 0
            const score = Math.min(
              100,
              Math.round((winRate + stats.mvp * 5) / 1.5),
            )

            let verdict = 'Mediano'
            let realityCheck =
              'Você joga bem, mas não é decisivo. Seus números mostram consistência, mas falta brilho.'

            if (score > 80) {
              verdict = 'Promessa Real'
              realityCheck =
                'Seus números são de elite, mas cuidado com a soberba. O nível profissional exige mais do que vitórias na várzea.'
            } else if (score < 50) {
              verdict = 'Amador Iniciante'
              realityCheck =
                'Sendo brutalmente honesto: seus fundamentos precisam de muito trabalho. Você está perdendo mais do que ganhando.'
            }

            evaluationData = {
              score,
              verdict,
              strengths: [
                `Taxa de Vitória: ${winRate}%`,
                `${stats.mvp} MVPs conquistados`,
                'Consistência física (baseado no histórico)',
              ],
              weaknesses: [
                'Pouca participação defensiva (estimado)',
                'Média de gols abaixo do esperado para a posição',
                'Falta experiência em jogos de alta pressão',
              ],
              realityCheck,
            }
          } else if (
            lowerText.includes('melhorar') ||
            lowerText.includes('dica')
          ) {
            responseText =
              'Para melhorar, pare de treinar o que você já sabe. Seus dados indicam falhas na resistência. Foque em treinos intervalados de alta intensidade (HIIT) por 3 semanas e volte aqui.'
          } else {
            responseText =
              'Não entendi. Seja direto. Quer uma "avaliação" ou saber como "melhorar"?'
          }

          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: responseText,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            type: responseType,
            isMe: false,
            evaluationData,
          }

          set((state) => ({
            messages: [...state.messages, botMessage],
            isTyping: false,
          }))
        }, 1500)
      },

      clearHistory: () =>
        set({
          messages: [
            {
              id: 'welcome',
              sender: 'bot',
              text: 'Memória apagada. Mas seus stats continuam os mesmos. O que deseja?',
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              type: 'text',
              isMe: false,
            },
          ],
        }),

      generateEvaluation: () => {
        get().sendMessage('Quero uma avaliação completa da minha performance.')
      },
    }),
    {
      name: 'goplay-bot-verdade-storage',
    },
  ),
)
