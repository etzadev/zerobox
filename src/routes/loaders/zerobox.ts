import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { account } from '@/lib/appwrite';

export const zeroboxLoader: LoaderFunction = async () => {
  try {
    const currentSession = await account.getSession({ sessionId: 'current' });
    const user = await account.get();

    return { currentSession, user };
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.log(error);

      return redirect('/auth/login');
    }

    throw error;
  }
};
