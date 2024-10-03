import { initFirebaseAdmin } from './firebaseAdmin'

export const decodedFirebaseToken = async (token: string) => {
  const firebaseAdmin = await initFirebaseAdmin()

  try {
    return await firebaseAdmin.auth().verifyIdToken(token)
  } catch (error) {
    throw new Error('invalidToken')
  }
}
