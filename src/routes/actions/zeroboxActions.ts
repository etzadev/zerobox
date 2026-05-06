import axios, { type AxiosRequestConfig } from 'axios';
import type { ActionFunction } from 'react-router';
import { getCurrentUserFolder } from '@/lib/appwrite';

const API_KEY = btoa(`${import.meta.env.VITE_IMAGEKIT_API_KEY}:`);

type ZeroboxActionData = {
  fileId?: string;
  filePath?: string;
  newName?: string;
  folderName?: string;
  parentFolderPath?: string;
  currentFolderName?: string | null;
};

export const createFolder = async (data: ZeroboxActionData) => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://api.imagekit.io/v1/folder',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${API_KEY}`,
    },
    data: {
      folderName: data.folderName,
      parentFolderPath: `${data?.currentFolderName ?? ''}${data?.parentFolderPath ? `/${data.parentFolderPath}` : '/'}`,
    },
  };

  try {
    await axios.request(options);

    return { ok: true, message: 'Carpeta creada correctamente' };
  } catch (error) {
    return { ok: false, error };
  }
};

export const renameFile = async (data: ZeroboxActionData) => {
  const options: AxiosRequestConfig = {
    method: 'PUT',
    url: `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/rename`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Basic ${API_KEY}`,
    },
    data: {
      filePath: data?.filePath,
      newFileName: data?.newName,
      purgeCache: true,
    },
  };

  try {
    await axios.request(options);

    return { ok: true, message: 'Nombre cambiado correctamente' };
  } catch (error) {
    return { ok: false, error };
  }
};

export const deleteFile = async (data: ZeroboxActionData) => {
  const options: AxiosRequestConfig = {
    method: 'DELETE',
    url: `${import.meta.env.VITE_IMAGEKIT_API_ENDPOINT}/${data.fileId}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${API_KEY}`,
    },
  };

  try {
    await axios.request(options);

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
