import { FileInfo } from '@/components/FileInfo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { File } from '@/types/all-types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File;
}

export const FileInformation = ({ open, onOpenChange, file }: Props) => {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Información del archivo</SheetTitle>
          <SheetDescription>
            Información de <strong>{file.name}</strong>
          </SheetDescription>
        </SheetHeader>

        <div className='px-5'>
          <FileInfo file={file} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
