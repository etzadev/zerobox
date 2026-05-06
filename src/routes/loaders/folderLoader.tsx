import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { getCurrentUserFolder } from '@/lib/appwrite';
import { executeImageKitFunction } from '@/lib/imagekitFunction';

const getFilesByFolder = async (path: string) => {
  const folderName = await getCurrentUserFolder();

  try {
    return await executeImageKitFunction('LIST_FILES', {
      path: `/${folderName}/${path}`,
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const zeroboxFolderLoader: LoaderFunction = async ({ params }) => {
  try {
    const folderName = params.folderName;

    if (!folderName) throw new Error('Se requiere el nombre de la carpeta');

    const files = await getFilesByFolder(folderName);

    return files;
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect('/auth/login');
    }

    throw error;
  }
};
