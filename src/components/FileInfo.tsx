import { formatDate } from '@/lib/formatDate';
import type { File } from '@/types/all-types';

export const FileInfo = ({ file }: { file: File }) => {
  return (
    <div className='space-y-2 text-sm'>
      <p>
        <strong>Nombre:</strong> {file.name}
      </p>

      <p>
        <strong>Tipo:</strong> {file.mime}
      </p>

      <p>
        <strong>Tamaño:</strong>{' '}
        {file.size < 1024 * 1024
          ? (file.size / 1024).toFixed(2) + ' KB'
          : (file.size / (1024 * 1024)).toFixed(2) + ' MB'}
      </p>

      <p>
        <strong>Creado:</strong> {formatDate(file.createdAt)}
      </p>

      <p>
        <strong>Actualizado:</strong> {formatDate(file.updatedAt)}
      </p>
    </div>
  );
};
