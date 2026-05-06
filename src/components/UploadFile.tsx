import { useCallback, useRef, useState } from 'react';
import { useLocation, useRevalidator } from 'react-router';
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/react';
import { UploadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { functions } from '@/lib/appwrite';
import { useFolder } from '@/contexts/FolderContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadFile = ({ open, onOpenChange }: Props) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();
  const location = useLocation();
  const revalidator = useRevalidator();
  const currentFolderName = useFolder();

  const getAuthData = useCallback(async () => {
    try {
      const response = await functions.createExecution({
        functionId: import.meta.env.VITE_APPWRITE_FN_ID,
        xpath: '/auth',
      });

      if (response.responseStatusCode !== 200) {
        throw new Error(
          `La solicitud de autenticación falló status ${response.status}: ${response.errors}`,
        );
      }

      const data = JSON.parse(response.responseBody);

      return data;
    } catch (error) {
      console.log(error);

      throw new Error('La solicitud de autenticación falló');
    }
  }, []);

  const handleUpload = useCallback(async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) return toast.error('Selecciona el archivo a subir');

    const pathname = location.pathname;
    const folderPath = location.pathname.startsWith('/zerobox/folders/')
      ? pathname.split('/folders/')[1]
      : null;

    try {
      setIsUploading(true);
      const { signature, expire, token, publicKey } = await getAuthData();

      await upload({
        file,
        fileName: file.name,
        folder: folderPath
          ? `/${currentFolderName}/${folderPath}`
          : `/${currentFolderName}`,
        expire,
        token,
        signature,
        publicKey,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
        abortSignal: abortController.signal,
      });

      toast.success('Archivo subido correctamente');

      if (fileInputRef.current) fileInputRef.current.value = '';

      setProgress(0);
      onOpenChange(false);
      revalidator.revalidate();
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        toast.warning(`Carga interrumpida: ${error?.message}`);
      } else if (error instanceof ImageKitInvalidRequestError) {
        toast.error(`Petición inválida: ${error?.message}`);
      } else if (error instanceof ImageKitUploadNetworkError) {
        toast.error(`Error de red al subir el archivo: ${error?.message}`);
      } else if (error instanceof ImageKitServerError) {
        toast.error(`Error interno del servidor: ${error?.message}`);
      } else {
        toast.error('Error desconocido');
      }
    } finally {
      setIsUploading(false);
    }
  }, [
    location.pathname,
    abortController.signal,
    currentFolderName,
    getAuthData,
    onOpenChange,
    revalidator,
  ]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-w-none rounded-none sm:rounded-lg sm:max-w-md'>
        <DialogHeader className='border-b pb-2'>
          <DialogTitle className='flex items-center gap-2 text-lg font-semibold'>
            <UploadIcon /> Subir Archivo
          </DialogTitle>
          <DialogDescription>
            Selecciona un archivo para subir a{' '}
            <span className='font-semibold'>ZeroBox</span>
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <Input
            type='file'
            ref={fileInputRef}
            className='cursor-pointer'
            disabled={isUploading}
          />
          {progress > 0 && (
            <div className='space-y-1'>
              <div className='flex justify-between text-sm text-muted-foreground'>
                Subiendo...
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress
                value={progress}
                className='h-2 rounded-full transition-all duration-300'
              />
            </div>
          )}
        </div>
        <DialogFooter className='flex flex-col gap-2'>
          {!isUploading ? (
            <Button
              onClick={handleUpload}
              className='w-full flex items-center justify-center gap-2'
            >
              Subir archivo
            </Button>
          ) : (
            <Button
              variant='secondary'
              size='sm'
              className='w-full flex items-center justify-center gap-2'
              onClick={() => {}}
            >
              Cancelar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
