import { useCallback, useEffect } from 'react';
import { useFetcher } from 'react-router';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { DeleteFileType } from '@/types/all-types';

export const DeleteFile = ({
  open,
  onOpenChange,
  fileId,
  fileUrl,
}: DeleteFileType) => {
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Archivo eliminado correctamente');

      onOpenChange(false);
    } else {
      toast.error('Algo salió mal, inténtalo de nuevo más tarde');
    }
  }, [fetcher.data, onOpenChange]);

  const handleSubmit = useCallback(() => {
    if (!fileId.trim()) {
      toast.error('El id no puede estar vacío');

      return;
    }

    fetcher.submit(
      { fileId, fileUrl },
      {
        method: 'delete',
        encType: 'application/json',
        action: '/zerobox',
      },
    );
  }, [fetcher, fileId, fileUrl]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar archivo</DialogTitle>
          <DialogDescription>
            ¿Seguro que quieres eliminar este archivo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={fetcher.state === 'submitting'}
          >
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
