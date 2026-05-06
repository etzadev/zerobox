import { useLoaderData } from 'react-router';
import { ChevronDownIcon, FileIcon, FolderIcon } from 'lucide-react';
import { FolderCard } from '@/components/FolderCard';
import { FileCard } from '@/components/FileCard';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
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
      <PageHeader
        title='Bienvenido a ZeroBox'
        description='Accede rápido a tus carpetas y archivos recientes desde un espacio organizado.'
      />

      <div className='space-y-6 mt-4'>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex w-full items-center justify-between rounded-lg border bg-muted/50 px-4 py-3 font-medium cursor-pointer transition-colors hover:bg-muted'>
            <span>Carpetas sugeridas ({folders.length})</span>
            <ChevronDownIcon className='size-5' />
          </CollapsibleTrigger>
          <CollapsibleContent className='overflow-hidden transition-all duration-300'>
            {folders.length > 0 ? (
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                {folders.map((folder, i: number) => (
                  <FolderCard
                    key={i}
                    folder={folder}
                  />
                ))}
              </div>
            ) : (
              <div className='mt-4'>
                <EmptyState
                  icon={FolderIcon}
                  title='No hay carpetas todavía'
                  description='Crea una carpeta desde el botón Nuevo para empezar a organizar tus archivos.'
                />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className='flex w-full items-center justify-between rounded-lg border bg-muted/50 px-4 py-3 font-medium cursor-pointer transition-colors hover:bg-muted'>
            <span>Archivos sugeridos ({files.length})</span>
            <ChevronDownIcon className='size-5' />
          </CollapsibleTrigger>

          <CollapsibleContent className='overflow-hidden transition-all duration-300'>
            {files.length > 0 ? (
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                {files.map((file, i: number) => (
                  <FileCard
                    key={i}
                    file={file}
                  />
                ))}
              </div>
            ) : (
              <div className='mt-4'>
                <EmptyState
                  icon={FileIcon}
                  title='No hay archivos para mostrar'
                  description='Sube archivos para verlos aquí sin recargar la aplicación.'
                />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};
