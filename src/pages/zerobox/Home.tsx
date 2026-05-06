import { useLoaderData } from 'react-router';
import { ChevronDownIcon } from 'lucide-react';
import { FolderCard } from '@/components/FolderCard';
import { FileCard } from '@/components/FileCard';
import type { File, FolderCardType } from '@/types/all-types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

type HomeLoaderData = {
  files: File[];
  folders: FolderCardType[];
};

export const Home = () => {
  const { files, folders } = useLoaderData() as HomeLoaderData;

  return (
    <>
      <h1 className='text-2xl font-medium'>Bienvenido a ZeroBox</h1>

      <div className='space-y-6 mt-4'>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer'>
            Carpetas sugeridas <ChevronDownIcon />
          </CollapsibleTrigger>
          <CollapsibleContent className='overflow-hidden transition-all duration-300'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
              {folders.map((folder, i: number) => (
                <FolderCard
                  key={i}
                  folder={folder}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex justify-between items-center font-medium text-lg py-2 rounded-lg cursor-pointer'>
            Archivos sugeridas ({files.length}) <ChevronDownIcon />
          </CollapsibleTrigger>

          <CollapsibleContent className='overflow-hidden transition-all duration-300'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
              {files.map((file, i: number) => (
                <FileCard
                  key={i}
                  file={file}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};
