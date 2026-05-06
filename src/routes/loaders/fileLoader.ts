import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { getCurrentUserFolder } from '@/lib/appwrite';
import { executeImageKitFunction } from '@/lib/imagekitFunction';

const getFiles = async (folderName: string, isRecent?: boolean) => {
  try {
    return await executeImageKitFunction('LIST_FILES', {
      path: folderName || '',
      sort: isRecent ? 'DESC_CREATED' : 'ASC_CREATED',
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getFolders = async (folderName: string) => {
  try {
    return await executeImageKitFunction('LIST_FOLDERS', {
      path: folderName || '',
      type: 'folder',
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const zeroboxFileLoader: LoaderFunction = async () => {
  try {
    const folderName = await getCurrentUserFolder();

    const files = await getFiles(folderName!);
    const recentFiles = await getFiles(folderName!, true);
    const folders = await getFolders(folderName!);

    return { files, recentFiles, folders };
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect('/auth/login');
    }

    console.log(error);

    throw error;
  }
};
