import { AppwriteException } from 'appwrite';
import { redirect, type ActionFunction } from 'react-router';
import { account } from '@/lib/appwrite';

export const resetPasswordAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as {
    userId: string;
    secret: string;
    password: string;
  };

  try {
    await account.updateRecovery(data);

    return redirect('/auth/login');
  } catch (error) {
    if (error instanceof AppwriteException) return { ok: false, error };

    throw error;
  }
};
