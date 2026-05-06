import type { ActionFunction } from 'react-router';
import { getCurrentUserFolder } from '@/lib/appwrite';
import { executeImageKitFunction } from '@/lib/imagekitFunction';

type ZeroboxActionData = {
  fileId?: string;
  filePath?: string;
  newName?: string;
  folderName?: string;
  parentFolderPath?: string;
  currentFolderName?: string | null;
};

export const createFolder = async (data: ZeroboxActionData) => {
  try {
    await executeImageKitFunction('CREATE_FOLDER', {
      folderName: data.folderName,
      parentFolderPath: `${data?.currentFolderName ?? ''}${data?.parentFolderPath ? `/${data.parentFolderPath}` : '/'}`,
    });

    return { ok: true, message: 'Carpeta creada correctamente' };
  } catch (error) {
    return { ok: false, error };
  }
};

export const renameFile = async (data: ZeroboxActionData) => {
  try {
    await executeImageKitFunction('RENAME_FILE', {
      filePath: data?.filePath,
      newFileName: data?.newName,
      purgeCache: true,
    });

    return { ok: true, message: 'Nombre cambiado correctamente' };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deleteFile = async (data: ZeroboxActionData) => {
  try {
    await executeImageKitFunction('DELETE_FILE', {
      fileId: data.fileId,
    });

    return { ok: true, message: 'Archivo eliminado correctamente' };
  } catch (error) {
    return { ok: false, error };
  }
};

export const zeroboxActions: ActionFunction = async ({ request }) => {
  const currentFolderName = await getCurrentUserFolder();
  const data = (await request.json()) as {
    filePath?: string;
    newName?: string;
    folderName?: string;
    parentFolderPath?: string;
  };

  if (request.method === 'POST')
    return await createFolder({ ...data, currentFolderName });

  if (request.method === 'PUT')
    return await renameFile({ ...data, currentFolderName });

  if (request.method === 'DELETE')
    return await deleteFile({ ...data, currentFolderName });
};
