import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { getCurrentUserFolder } from '@/lib/appwrite';
import { executeImageKitFunction } from '@/lib/imagekitFunction';

const toList = (
  value: unknown,
  method: 'LIST_ALL_FILES' | 'LIST_FILES' | 'LIST_FOLDERS',
) => {
  if (Array.isArray(value)) return value;

  if (!value || typeof value !== 'object') {
    throw new Error(`${method} no devolvió una lista de ImageKit`);
  }

  const response = value as {
    data?: unknown;
    files?: unknown;
    folders?: unknown;
  };

  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.files)) return response.files;
  if (Array.isArray(response.folders)) return response.folders;
  if ('motto' in response) return [];

  return [];
};

const getFiles = async (folderName: string, isRecent?: boolean) => {
  try {
    const files = await executeImageKitFunction('LIST_ALL_FILES', {
      path: `/${folderName}`,
      sort: isRecent ? 'DESC_CREATED' : 'ASC_CREATED',
      type: 'file',
    });

    return toList(files, 'LIST_ALL_FILES');
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const getFolders = async (folderName: string) => {
  try {
    const folders = await executeImageKitFunction('LIST_FOLDERS', {
      path: `/${folderName}`,
      type: 'folder',
    });

    return toList(folders, 'LIST_FOLDERS');
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const zeroboxFileLoader: LoaderFunction = async () => {
  try {
    const folderName = await getCurrentUserFolder();

    if (!folderName) return redirect('/auth/login');

    const files = await getFiles(folderName!);
    const recentFiles = await getFiles(folderName!, true);
    const folders = await getFolders(folderName!);

    return { files, recentFiles, folders };
  } catch (error) {
    if (error instanceof AppwriteException) {
      return redirect('/auth/login');
    }

    console.log(error);

    return { files: [], recentFiles: [], folders: [] };
  }
};
