import { Link } from 'react-router';
import { ArrowRightIcon, FolderIcon } from 'lucide-react';
import type { FolderCardType } from '@/types/all-types';

export const FolderCard = ({ folder }: { folder: FolderCardType }) => {
  const path = folder.folderPath;
  const folderPath = path.substring(path.lastIndexOf('/') + 1);

  return (
    <Link
      className='landing-fade-up group flex items-center justify-between gap-3 rounded-lg border bg-background/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-background hover:shadow-md'
      to={`/zerobox/folders/${folderPath}`}
    >
      <span className='flex min-w-0 items-center gap-3'>
        <span className='flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-500'>
          <FolderIcon className='size-5' />
        </span>
        <span className='truncate capitalize font-medium'>{folder?.name}</span>
      </span>
      <ArrowRightIcon className='size-4 text-muted-foreground transition-transform group-hover:translate-x-1' />
    </Link>
  );
};
