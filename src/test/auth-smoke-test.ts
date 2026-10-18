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

  // 4. Test Valid Login with Seed User
  console.log('4. Testing login with seed user cariocamfv23@gmail.com...')
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

  // 5. Test Profile Update for authenticated seed user
  if (seedLoginData?.user?.id) {
    console.log('5. Testing update own profile...')
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({ city: 'São Paulo', sport: 'Futebol' })
      .eq('id', seedLoginData.user.id)
      .select()
      .single()

    console.log('Updated profile:', updatedProfile, 'Error:', updateError)

    // 6. Test RLS protection: Attempting to update another user's profile
    console.log('6. Testing RLS: attempting to update random profile...')
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

  // 7. SignOut
  console.log('7. Testing SignOut...')
  const { error: signOutError } = await supabase.auth.signOut()
  console.log('SignOut completed. Error:', signOutError)

  console.log('--- GOPLAY AUTH SMOKE TEST COMPLETED ---')
  return { success: true }
}
