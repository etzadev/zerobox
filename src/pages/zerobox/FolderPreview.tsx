import { useLoaderData, useParams, Link } from 'react-router';
import { FileCard } from '@/components/FileCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { File } from '@/types/all-types';

export const FolderPreview = () => {
  const { folderName } = useParams();
  const files = useLoaderData();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/zerobox/home'>Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className='font-medium'>{folderName}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {files.map((file: File, i: number) => (
          <FileCard
            file={file}
            key={i}
          />
        ))}
      </section>
    </>
  );
};
