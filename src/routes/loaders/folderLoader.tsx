import { redirect, type LoaderFunction } from 'react-router';
import { AppwriteException } from 'appwrite';
import { getCurrentUserFolder } from '@/lib/appwrite';
import { executeImageKitFunction } from '@/lib/imagekitFunction';

const toList = (value: unknown) => {
  if (Array.isArray(value)) return value;

  if (!value || typeof value !== 'object') {
    throw new Error('LIST_FILES no devolvió una lista de ImageKit');
  }

  const response = value as {
    data?: unknown;
    files?: unknown;
  };

  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.files)) return response.files;
  if ('motto' in response) return [];

  return [];
};

const getFilesByFolder = async (path: string) => {
  const folderName = await getCurrentUserFolder();

  try {
    const files = await executeImageKitFunction('LIST_FILES', {
      path: `/${folderName}/${path}`,
      type: 'file',
    });

    return toList(files);
  } catch (error) {
    console.log(error);

    console.log(error);

    return [];
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
