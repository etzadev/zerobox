import { AppwriteException } from 'appwrite';
import { redirect, type ActionFunction } from 'react-router';
import { account } from '@/lib/appwrite';

export const loginAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as LoginForm;

  try {
    await account.createEmailPasswordSession({ ...data });

    return redirect('/zerobox/home');
  } catch (error) {
    if (error instanceof AppwriteException) return { ok: false, error };

    throw error;
  }
};
