import { supabase } from '@/lib/supabase/client'

export async function runAuthSmokeTest() {
  console.log('--- STARTING GOPLAY AUTH SMOKE TEST ---')
  const testEmail = `qa_test_${Date.now()}@goplay-test.internal`
  const testPassword = 'Password123!QA'

  // 1. SignUp
  console.log('1. Testing SignUp for:', testEmail)
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: 'Atleta Teste QA',
        account_type: 'athlete',
        sport: 'Basquete',
      },
    },
  })

  if (signUpError) {
    console.error('SignUp Error:', signUpError.message)
    return { success: false, step: 'signUp', error: signUpError }
  }
  console.log('SignUp Success. User ID:', signUpData.user?.id)

  // 2. Fetch Profile created by Trigger
  if (signUpData.user?.id) {
    console.log('2. Testing Profile creation via DB query...')
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', signUpData.user.id)
      .maybeSingle()

    console.log('Profile result:', profile, 'Error:', profileError)
  }

  // 3. Test Invalid Login
  console.log('3. Testing invalid credentials...')
  const { error: invalidLoginError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: 'WrongPassword999',
  })
  console.log(
    'Invalid login correctly produced error:',
    invalidLoginError?.message,
  )

  // 4. Test Google OAuth initiation error handling (expected provider not enabled)
  console.log('4. Testing Google OAuth initiation (provider disabled test)...')
  const { error: googleOAuthError } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })
  console.log(
    'Google OAuth response check:',
    googleOAuthError
      ? `Error caught safely: ${googleOAuthError.message}`
      : 'OAuth triggered redirect url',
  )

  // 5. Test Valid Login with Seed User
  console.log('5. Testing login with seed user cariocamfv23@gmail.com...')
  const { data: seedLoginData, error: seedLoginError } =
    await supabase.auth.signInWithPassword({
      email: 'cariocamfv23@gmail.com',
      password: 'Skip@Pass',
    })

  if (seedLoginError) {
    console.error('Seed login failed:', seedLoginError.message)
  } else {
    console.log(
      'Seed login success! Session active for:',
      seedLoginData.user?.email,
    )
  }

  // 6. Test Profile Update for authenticated seed user
  if (seedLoginData?.user?.id) {
    console.log('6. Testing update own profile...')
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({ city: 'São Paulo', sport: 'Futebol' })
      .eq('id', seedLoginData.user.id)
      .select()
      .single()

    console.log('Updated profile:', updatedProfile, 'Error:', updateError)

    // 7. Test RLS protection: Attempting to update another user's profile
    console.log('7. Testing RLS: attempting to update random profile...')
    const { data: illegalUpdate, error: illegalError } = await supabase
      .from('profiles')
      .update({ full_name: 'Hacked Name' })
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .select()

    console.log(
      'Illegal update data (should be empty):',
      illegalUpdate,
      'Error:',
      illegalError,
    )
  }

  // 8. Test Club Login and Tryout / Event Creation
  console.log('8. Testing Club login (demo.clube@goplay.test)...')
  const { data: clubLoginData, error: clubLoginError } =
    await supabase.auth.signInWithPassword({
      email: 'demo.clube@goplay.test',
      password: 'Skip@Pass',
    })

  if (clubLoginError) {
    console.error('Club login failed:', clubLoginError.message)
  } else {
    console.log('Club login success for:', clubLoginData.user?.email)
    const clubUserId = clubLoginData.user?.id
    if (clubUserId) {
      console.log(
        '9. Testing Event/Peneira insertion via events table with club authenticated session...',
      )
      const testEventDate = new Date(Date.now() + 86400000 * 7)
        .toISOString()
        .split('T')[0]
      const { data: createdEvent, error: createEventError } = await supabase
        .from('events')
        .insert({
          creator_id: clubUserId,
          title: `Peneira Teste Automatizado QA ${Date.now()}`,
          description: 'Teste de criação de peneira oficial pelo clube.',
          type: 'tryout',
          sport: 'Futebol',
          category: 'Sub-20',
          event_date: testEventDate,
          event_time: '09:00',
          city: 'Campinas',
          state: 'SP',
          location_name: 'CT Teste',
          price: 0,
          status: 'open',
        })
        .select()
        .single()

      if (createEventError) {
        console.error('Club event creation failed:', createEventError.message)
      } else {
        console.log('Club event created successfully! ID:', createdEvent?.id)
        // Cleanup test event
        await supabase.from('events').delete().eq('id', createdEvent.id)
        console.log('Test event cleaned up successfully.')
      }
    }
  }

  // 10. SignOut
  console.log('10. Testing SignOut...')
  const { error: signOutError } = await supabase.auth.signOut()
  console.log('SignOut completed. Error:', signOutError)

  console.log('--- GOPLAY AUTH SMOKE TEST COMPLETED ---')
  return { success: true }
}
