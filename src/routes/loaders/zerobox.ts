import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { account } from '@/lib/appwrite';
import { createFolder } from '@/routes/actions/zeroboxActions';

export const zeroboxLoader: LoaderFunction = async () => {
  try {
    const currentSession = await account.getSession({ sessionId: 'current' });
    const user = await account.get();

    const folderName = user.$id;
    await createFolder({ folderName, parentFolderPath: '/' });

    return { currentSession, user };
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.log(error);

      return redirect('/auth/login');
    }

    throw error;
  }
};
