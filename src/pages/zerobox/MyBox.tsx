import { useLoaderData } from 'react-router';
import { BoxIcon } from 'lucide-react';
import { FileCard } from '@/components/FileCard';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
import type { File } from '@/types/all-types';

export const MyBox = () => {
  const { files } = useLoaderData();

  return (
    <>
      <PageHeader
        title='Mi ZBox'
        description='Todos tus archivos reunidos en una vista limpia para revisar, abrir y gestionar.'
      />

      {files.length > 0 ? (
        <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          {files.map((file: File, i: number) => (
            <FileCard
              file={file}
              key={i}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon={BoxIcon}
          title='Tu ZBox está vacío'
          description='Sube archivos desde Nuevo para que aparezcan automáticamente aquí.'
        />
      )}
    </>
  );
};
