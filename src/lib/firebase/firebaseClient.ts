import {
  FacebookAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithPopup,
  type User,
} from 'firebase/auth'

import { firebaseAuth } from './config'

/**
 * Listens for changes in the user's authentication state.
 * Use for reference
 * @param callback
 */
export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback)
}

/**
 * Initiates Google sign-in using a popup window.
 */
// export async function signInWithGoogle() {
//   const provider = new GoogleAuthProvider()
//
//   try {
//     const result = await signInWithPopup(firebaseAuth, provider)
//     // const credential = GoogleAuthProvider.credentialFromResult(result)
//
//     return await result.user.getIdToken(true)
//   } catch (e) {
//     throw new Error('Google sign in failed', e || '')
//   }
// }

export async function signInWithFacebook() {
  const provider = new FacebookAuthProvider()

  try {
    const result = await signInWithPopup(firebaseAuth, provider)

    return result.user.getIdTokenResult(true).then((value) => {
      return value.token
    })
  } catch (e) {
    throw new Error('Google sign in failed', e || '')
  }
}

/**
 * Signs out the current user from Firebase.
 */
export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut()
  } catch (e) {
    throw new Error('Google sign in failed', e || '')
  }
}
