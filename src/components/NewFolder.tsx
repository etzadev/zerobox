import { useCallback, useEffect, useState } from 'react';
import { useFetcher, useRevalidator } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const NewFolder = ({ open, onOpenChange, onSuccess }: Props) => {
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  const [folderName, setFolderName] = useState('Nueva Carpeta');
  const [parentFolderPath, setParentFolderPath] = useState('/');
  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Carpeta creada correctamente');

      onSuccess?.();
      onOpenChange(false);
      revalidator.revalidate();
    } else {
      toast.error(
        fetcher.data.error ?? 'Algo salió mal, inténtalo de nuevo más tarde',
      );

      console.log(fetcher.data.error);
    }
  }, [fetcher.data, onOpenChange, onSuccess, revalidator]);

  const handleSubmit = useCallback(() => {
    fetcher.submit(
      { folderName, parentFolderPath },
      {
        action: '/zerobox',
        method: 'post',
        encType: 'application/json',
      },
    );
  }, [folderName, parentFolderPath, fetcher]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear carpeta</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='folderName'>
              Nombre de la carpeta <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='folderName'
              value={folderName}
              onChange={(e) => setFolderName(e.currentTarget.value)}
              placeholder='Escriba el nombre de la nueva carpeta'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='parentFolderPath'>
              Ruta de la carpeta principal
            </Label>
            <Input
              id='parentFolderPath'
              value={parentFolderPath}
              onChange={(e) => setParentFolderPath(e.currentTarget.value)}
              placeholder='/ (opcional)'
            />
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Creando carpeta...' : 'Crear carpeta'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
