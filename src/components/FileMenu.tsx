import { useState } from 'react';
import {
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EllipsisVerticalIcon,
  FolderOpenDotIcon,
  InfoIcon,
  ShareIcon,
  Trash2Icon,
} from 'lucide-react';
import { FileDetails } from '@/components/FileDetails';
import { RenameFile } from '@/components/RenameFile';
import { FileInformation } from '@/components/FileInformation';
import { DeleteFile } from '@/components/DeleteFile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { copyToClipboard, downloadFile } from '@/lib/utils';
import type { File } from '@/types/all-types';

export const FileMenu = ({ file }: { file: File }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon className='hover:cursor-pointer' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[180px]'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setDetailsOpen(true)}
          >
            <FolderOpenDotIcon />
            Abrir archivo
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => downloadFile(file.url, file.name)}
          >
            <DownloadIcon />
            Descargar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setRenameOpen(true)}
          >
            <EditIcon />
            Cambiar nombre
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShareIcon />
              Compartir
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={async () => await copyToClipboard(file.url)}
                >
                  <CopyIcon /> Copiar enlace
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setInfoOpen(true)}
          >
            <InfoIcon />
            Información del archivo
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant='destructive'
            className='cursor-pointer'
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Eliminar archivo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FileDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        file={file}
      />

      <RenameFile
        open={renameOpen}
        onOpenChange={setRenameOpen}
        fileName={file.name}
        filePath={file.filePath}
      />

      <FileInformation
        open={infoOpen}
        onOpenChange={setInfoOpen}
        file={file}
      />

      <DeleteFile
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        fileId={file.fileId}
        fileUrl={file.url}
      />
    </>
  );
};
