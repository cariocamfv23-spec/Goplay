/**
 * Serviço de Biometria do Goplay via Web Authentication API (WebAuthn / Platform Authenticator)
 * Suporta Face ID, Touch ID, leitor de digitais Android/Windows Hello.
 * Armazenamento local por dispositivo (client-side scoped).
 */

const STORAGE_KEY = 'goplay_biometric_credential_v1'

export interface BiometricCredentialData {
  credentialId: string // Base64url encoded credential ID
  userId: string
  userEmail: string
  userName?: string
  enrolledAt: string
  deviceName?: string
  sessionToken?: {
    access_token: string
    refresh_token: string
    expires_at?: number
  }
}

// Helpers para conversão de ArrayBuffer e Base64URL
export function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function base64UrlToBuffer(base64url: string): ArrayBuffer {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

export const biometricService = {
  /**
   * Verifica se o navegador suporta WebAuthn
   */
  isWebAuthnSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.PublicKeyCredential &&
      typeof window.PublicKeyCredential === 'function' &&
      !!navigator.credentials
    )
  },

  /**
   * Verifica se o dispositivo possui autenticador de plataforma (Face ID, Touch ID, Windows Hello, biometria Android)
   */
  async isPlatformAuthenticatorAvailable(): Promise<boolean> {
    if (!this.isWebAuthnSupported()) return false
    try {
      if (
        typeof window.PublicKeyCredential
          .isUserVerifyingPlatformAuthenticatorAvailable === 'function'
      ) {
        return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      }
      return false
    } catch {
      return false
    }
  },

  /**
   * Recupera os dados da credencial cadastrada neste aparelho (se houver)
   */
  getEnrolledCredential(): BiometricCredentialData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw) as BiometricCredentialData
    } catch {
      return null
    }
  },

  /**
   * Verifica se este dispositivo já possui biometria ativada para o Goplay
   */
  isEnrolled(): boolean {
    return !!this.getEnrolledCredential()
  },

  /**
   * Remove o cadastro biométrico deste aparelho
   */
  disableBiometrics(): void {
    localStorage.removeItem(STORAGE_KEY)
  },

  /**
   * Alistamento / Registro de biometria neste aparelho
   * Chama navigator.credentials.create() para acionar o prompt real de Face ID / Digital.
   */
  async enrollBiometrics(params: {
    userId: string
    userEmail: string
    userName?: string
    sessionTokens?: {
      access_token: string
      refresh_token: string
      expires_at?: number
    }
  }): Promise<{ success: boolean; error?: string }> {
    if (!this.isWebAuthnSupported()) {
      return {
        success: false,
        error: 'Este navegador não suporta a Web Authentication API.',
      }
    }

    try {
      // Gera um challenge aleatório seguro no cliente
      const challenge = new Uint8Array(32)
      window.crypto.getRandomValues(challenge)

      // Converte o userId em Uint8Array para o WebAuthn
      const enc = new TextEncoder()
      const userHandle = enc.encode(params.userId)

      const creationOptions: CredentialCreationOptions = {
        publicKey: {
          challenge,
          rp: {
            name: 'Goplay Sports App',
            id:
              window.location.hostname === 'localhost'
                ? 'localhost'
                : window.location.hostname,
          },
          user: {
            id: userHandle,
            name: params.userEmail,
            displayName: params.userName || params.userEmail,
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 }, // ES256 (standard WebAuthn)
            { type: 'public-key', alg: -257 }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform', // Exige Face ID, Touch ID, Android Biometrics, Windows Hello
            userVerification: 'required', // Exige validação biométrica real ou PIN do aparelho
            residentKey: 'preferred',
          },
          timeout: 60000,
          attestation: 'none',
        },
      }

      const credential = (await navigator.credentials.create(
        creationOptions,
      )) as PublicKeyCredential | null

      if (!credential || !credential.id) {
        return {
          success: false,
          error: 'Não foi possível registrar a biometria neste aparelho.',
        }
      }

      const credentialId = bufferToBase64Url(credential.rawId)

      const savedData: BiometricCredentialData = {
        credentialId,
        userId: params.userId,
        userEmail: params.userEmail,
        userName: params.userName,
        enrolledAt: new Date().toISOString(),
        deviceName: navigator.userAgent.includes('iPhone')
          ? 'iPhone (Face ID / Touch ID)'
          : navigator.userAgent.includes('Android')
            ? 'Android (Biometria)'
            : 'Este Aparelho',
        sessionToken: params.sessionTokens,
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData))

      return { success: true }
    } catch (err: any) {
      // Erros comuns de WebAuthn
      if (err.name === 'NotAllowedError') {
        return {
          success: false,
          error:
            'A solicitação de biometria foi cancelada ou não foi autorizada.',
        }
      }
      if (err.name === 'InvalidStateError') {
        return {
          success: false,
          error:
            'Esta biometria já foi registrada anteriormente neste aparelho.',
        }
      }
      if (err.name === 'NotSupportedError') {
        return {
          success: false,
          error:
            'Autenticador de biometria não encontrado ou não configurado no aparelho.',
        }
      }
      return {
        success: false,
        error:
          err.message ||
          'Falha ao acionar a verificação biométrica do sistema.',
      }
    }
  },

  /**
   * Autenticação via Biometria
   * Chama navigator.credentials.get() exigindo userVerification: "required".
   * O sensor de digital / Face ID do celular ou desktop DEVE disparar e validar.
   * Se for bem-sucedido, retorna a credencial e os tokens de sessão associados.
   */
  async authenticate(): Promise<{
    success: boolean
    data?: BiometricCredentialData
    error?: string
  }> {
    if (!this.isWebAuthnSupported()) {
      return {
        success: false,
        error: 'WebAuthn não é suportado neste navegador.',
      }
    }

    const enrolled = this.getEnrolledCredential()
    if (!enrolled || !enrolled.credentialId) {
      return {
        success: false,
        error:
          'Nenhuma biometria cadastrada neste aparelho. Faça login normalmente e ative a biometria em Configurações.',
      }
    }

    try {
      const challenge = new Uint8Array(32)
      window.crypto.getRandomValues(challenge)

      const rawIdBuffer = base64UrlToBuffer(enrolled.credentialId)

      const requestOptions: CredentialRequestOptions = {
        publicKey: {
          challenge,
          timeout: 60000,
          rpId:
            window.location.hostname === 'localhost'
              ? 'localhost'
              : window.location.hostname,
          userVerification: 'required', // Obriga o prompt de Face ID / Digital
          allowCredentials: [
            {
              id: rawIdBuffer,
              type: 'public-key',
              transports: ['internal'],
            },
          ],
        },
      }

      const assertion = (await navigator.credentials.get(
        requestOptions,
      )) as PublicKeyCredential | null

      if (!assertion) {
        return {
          success: false,
          error: 'Biometria não confirmada pelo aparelho.',
        }
      }

      return {
        success: true,
        data: enrolled,
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        return {
          success: false,
          error:
            'Leitura biométrica cancelada ou não reconhecida pelo aparelho.',
        }
      }
      if (err.name === 'SecurityError') {
        return {
          success: false,
          error: 'Erro de segurança na verificação de biometria.',
        }
      }
      return {
        success: false,
        error:
          err?.message ||
          'Falha na confirmação biométrica. Tente e-mail e senha.',
      }
    }
  },

  /**
   * Atualiza a sessão associada ao cadastro biométrico atual (ex.: após renovar login ou token)
   */
  updateSavedSession(tokens: {
    access_token: string
    refresh_token: string
    expires_at?: number
  }): void {
    const enrolled = this.getEnrolledCredential()
    if (enrolled) {
      enrolled.sessionToken = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: tokens.expires_at,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolled))
    }
  },

  /**
   * Sincroniza a sessão ativa caso este dispositivo tenha biometria cadastrada para o usuário
   */
  syncSessionIfEnrolled(
    session: {
      user?: { id?: string }
      access_token?: string
      refresh_token?: string
      expires_at?: number
    } | null,
  ): void {
    if (!session?.access_token || !session?.refresh_token) return
    const enrolled = this.getEnrolledCredential()
    if (!enrolled) return
    if (!session.user?.id || enrolled.userId === session.user.id) {
      enrolled.sessionToken = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolled))
    }
  },
}
