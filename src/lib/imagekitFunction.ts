import { functions } from '@/lib/appwrite';

type ImageKitFunctionMethod =
  | 'CREATE_FOLDER'
  | 'RENAME_FILE'
  | 'DELETE_FILE'
  | 'LIST_FILES'
  | 'LIST_FOLDERS';

type ImageKitFunctionResponse<T> = {
  ok?: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export const executeImageKitFunction = async <T = unknown>(
  method: ImageKitFunctionMethod,
  data: Record<string, unknown>,
) => {
  const execution = await functions.createExecution({
    functionId: import.meta.env.VITE_APPWRITE_FN_ID,
    body: JSON.stringify({ method, data }),
  });

  if (execution.responseStatusCode >= 400) {
    throw new Error(
      execution.responseBody || execution.errors || 'Error en ImageKit',
    );
  }

  const response = JSON.parse(
    execution.responseBody || '{}',
  ) as ImageKitFunctionResponse<T>;

  if (response.ok === false) {
    throw new Error(response.error || response.message || 'Error en ImageKit');
  }

  return response.data ?? (response as T);
};
