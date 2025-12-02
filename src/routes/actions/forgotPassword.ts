import { AppwriteException } from 'appwrite';
import { account } from '@/lib/appwrite';
import type { ActionFunction } from 'react-router';

export const forgotPasswordAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as { email: string };

  try {
    await account.createRecovery({
      email: data.email,
      url: `${new URL(request.url).origin}/auth/reset-password`,
    });

    return {
      ok: true,
      message: 'Correo de restablecimiento enviado correctamente',
    };
  } catch (error) {
    if (error instanceof AppwriteException) return { ok: false, error };

    throw error;
  }
};
