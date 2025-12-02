import { useCallback, useEffect, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName: string;
  filePath: string;
  onSuccess?: () => void;
}

export const RenameFile = ({
  open,
  onOpenChange,
  fileName,
  filePath,
  onSuccess,
}: Props) => {
  const fetcher = useFetcher();
  const [fileNewName, setFileNewName] = useState(fileName);
  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (open) setFileNewName(fileName);
  }, [open, fileName]);

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Archivo renombrado correctamente');

      onSuccess?.();
      onOpenChange(false);
    } else {
      toast.error(
        fetcher.data.error ?? 'Algo salió mal, inténtalo de nuevo más tarde',
      );
    }
  }, [fetcher.data, onOpenChange, onSuccess]);

  const handleSubmit = useCallback(() => {
    if (!fileNewName.trim()) {
      toast.error('El nombre no puede estar vacío');

      return;
    }

    fetcher.submit(
      {
        filePath,
        newName: fileNewName,
      },
      {
        method: 'put',
        encType: 'application/json',
        action: '/zerobox',
      },
    );
  }, [fetcher, fileNewName, filePath]);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renombrar archivo</DialogTitle>
          <DialogDescription>
            Cambiar el nombre de <strong>{fileName}</strong>.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={fileNewName}
          onChange={(e) => setFileNewName(e.currentTarget.value)}
          placeholder='Escribe el nuevo nombre del archivo'
          className='mt-4'
        />

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={fetcher.state === 'submitting'}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Renombrando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
