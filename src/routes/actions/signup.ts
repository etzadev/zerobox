import { redirect, type ActionFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { account, ID } from '@/lib/appwrite';

export const signupAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as SignupForm;

  try {
    await account.create({
      userId: ID.unique(),
      ...data,
    });

    return redirect('/auth/login');
  } catch (error) {
    if (error instanceof AppwriteException) return { ok: false, error };

    throw error;
  }
};
