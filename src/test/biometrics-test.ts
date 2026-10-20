import {
  biometricService,
  bufferToBase64Url,
  base64UrlToBuffer,
} from '@/services/biometrics'

/**
 * Testes unitários / smoke tests locais da lógica e helpers de biometria.
 * Valida:
 * 1. Conversão bidirecional de ArrayBuffer e Base64URL
 * 2. Manipulação e armazenamento seguro de BiometricCredentialData
 * 3. syncSessionIfEnrolled (por ID e por e-mail case-insensitive)
 * 4. updateSavedSession, markNeedsReauth e clearNeedsReauth
 * 5. disableBiometrics
 */
export function runBiometricsUnitTests(): {
  success: boolean
  passed: number
  failed: number
  errors: string[]
} {
  const errors: string[] = []
  let passed = 0
  let failed = 0

  const assert = (condition: boolean, desc: string) => {
    if (condition) {
      passed++
    } else {
      failed++
      errors.push(`Falha: ${desc}`)
    }
  }

  // Backup do localStorage original para restauração pós-teste
  const originalData = localStorage.getItem('goplay_biometric_credential_v1')

  try {
    // Teste 1: Conversão Base64URL
    const sampleBytes = new Uint8Array([1, 2, 3, 250, 255, 42, 100])
    const encoded = bufferToBase64Url(sampleBytes.buffer)
    assert(
      typeof encoded === 'string' && encoded.length > 0,
      'bufferToBase64Url gera string não vazia',
    )
    assert(
      !encoded.includes('+') &&
        !encoded.includes('/') &&
        !encoded.includes('='),
      'Base64Url não contém caracteres não seguros',
    )

    const decodedBuffer = base64UrlToBuffer(encoded)
    const decodedBytes = new Uint8Array(decodedBuffer)
    assert(
      sampleBytes.length === decodedBytes.length &&
        sampleBytes.every((val, idx) => val === decodedBytes[idx]),
      'base64UrlToBuffer reverte exatamente os bytes originais',
    )

    // Teste 2: Inicialmente limpo
    biometricService.disableBiometrics()
    assert(
      !biometricService.isEnrolled(),
      'isEnrolled é false quando não há credencial',
    )
    assert(
      biometricService.getEnrolledCredential() === null,
      'getEnrolledCredential retorna null',
    )

    // Teste 3: Simulação de credencial salva
    const fakeCred = {
      credentialId: 'test-cred-id-123',
      userId: 'user-uuid-1',
      userEmail: 'atleta@goplay.test',
      userName: 'Atleta Teste',
      enrolledAt: new Date().toISOString(),
      deviceName: 'Este Aparelho',
      sessionToken: {
        access_token: 'old_access_token',
        refresh_token: 'old_refresh_token',
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      },
    }
    localStorage.setItem(
      'goplay_biometric_credential_v1',
      JSON.stringify(fakeCred),
    )
    assert(
      biometricService.isEnrolled(),
      'isEnrolled é true após salvar credencial',
    )
    assert(
      biometricService.getEnrolledCredential()?.userId === 'user-uuid-1',
      'Recupera userId correto',
    )

    // Teste 4: updateSavedSession atualiza tokens e limpa erro
    biometricService.markNeedsReauth('session_revoked')
    assert(
      biometricService.getEnrolledCredential()?.needsReauth === true,
      'markNeedsReauth marca true',
    )

    biometricService.updateSavedSession({
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
      expires_at: Math.floor(Date.now() / 1000) + 7200,
    })
    const updated = biometricService.getEnrolledCredential()
    assert(
      updated?.sessionToken?.access_token === 'new_access_token',
      'updateSavedSession atualizou access_token',
    )
    assert(
      updated?.sessionToken?.refresh_token === 'new_refresh_token',
      'updateSavedSession atualizou refresh_token',
    )
    assert(
      updated?.needsReauth === false,
      'updateSavedSession limpa needsReauth',
    )
    assert(
      updated?.lastError === undefined,
      'updateSavedSession limpa lastError',
    )

    // Teste 5: syncSessionIfEnrolled com email case-insensitive e limpeza de needsReauth
    biometricService.markNeedsReauth('expired')
    const synced = biometricService.syncSessionIfEnrolled(
      {
        user: { id: 'user-uuid-1', email: 'ATLETA@GOPLAY.TEST' },
        access_token: 'synced_access',
        refresh_token: 'synced_refresh',
      },
      'atleta@goplay.test',
    )
    assert(
      synced === true,
      'syncSessionIfEnrolled retorna true para correspondência de email/id',
    )
    const postSync = biometricService.getEnrolledCredential()
    assert(
      postSync?.sessionToken?.access_token === 'synced_access',
      'Sessão sincronizada corretamente',
    )
    assert(
      postSync?.needsReauth === false,
      'syncSession limpa flag needsReauth',
    )

    // Teste 6: syncSessionIfEnrolled com usuário divergente não deve sobrescrever
    const syncOtherUser = biometricService.syncSessionIfEnrolled(
      {
        user: { id: 'other-user-uuid', email: 'outro@goplay.test' },
        access_token: 'other_access',
        refresh_token: 'other_refresh',
      },
      'outro@goplay.test',
    )
    assert(
      syncOtherUser === false,
      'syncSessionIfEnrolled recusa usuário divergente',
    )
    const unchangedCred = biometricService.getEnrolledCredential()
    assert(
      unchangedCred?.userId === 'user-uuid-1',
      'Credencial original não foi adulterada',
    )

    // Teste 7: lock e unlock biométrico
    biometricService.lock()
    assert(biometricService.isLocked(), 'lock marca isLocked como true')
    biometricService.unlock()
    assert(!biometricService.isLocked(), 'unlock reverte isLocked para false')

    // Teste 8: disableBiometrics remove a chave e o lock
    biometricService.lock()
    biometricService.disableBiometrics()
    assert(!biometricService.isEnrolled(), 'disableBiometrics limpou o storage')
    assert(!biometricService.isLocked(), 'disableBiometrics limpou o lock')
  } catch (err: any) {
    failed++
    errors.push(`Exceção durante teste: ${err?.message || String(err)}`)
  } finally {
    // Restaura o localStorage
    if (originalData !== null) {
      localStorage.setItem('goplay_biometric_credential_v1', originalData)
    } else {
      localStorage.removeItem('goplay_biometric_credential_v1')
    }
  }

  return {
    success: failed === 0,
    passed,
    failed,
    errors,
  }
}
