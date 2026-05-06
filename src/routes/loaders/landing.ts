import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { account } from '@/lib/appwrite';

export const landingLoader: LoaderFunction = async () => {
  try {
    await account.get();

    return redirect('/zerobox/home');
  } catch (error) {
    if (error instanceof AppwriteException) return null;

    throw error;
  }
};
