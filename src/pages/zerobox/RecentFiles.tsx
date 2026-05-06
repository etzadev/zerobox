import { useLoaderData } from 'react-router';
import { ClockIcon } from 'lucide-react';
import { FileCard } from '@/components/FileCard';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
import type { File } from '@/types/all-types';

export const RecentFiles = () => {
  const { recentFiles } = useLoaderData();

  return (
    <>
      <PageHeader
        title='Actividad reciente'
        description='Consulta los últimos archivos subidos o modificados en tu espacio.'
      />

      {recentFiles.length > 0 ? (
        <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          {recentFiles.map((file: File, i: number) => (
            <FileCard
              file={file}
              key={i}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          icon={ClockIcon}
          title='Sin actividad reciente'
          description='Cuando subas o actualices archivos, aparecerán en esta sección.'
        />
      )}
    </>
  );
};
