import { useCallback, useMemo, useState } from 'react';
import { Image } from '@imagekit/react';
import { formatCustomDate } from '@/lib/utils';
import { FileMenu } from '@/components/FileMenu';
import { FileDetails } from '@/components/FileDetails';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fileIcons } from '@/assets/icons/file';
import type { File } from '@/types/all-types';

export const FileCard = ({ file }: { file: File }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const thumbnail = useMemo(
    () => (file?.mime.startsWith('image/') ? file.url : file.thumbnail),
    [file],
  );

  const getFileIcon = useCallback((mime: string) => {
    if (!mime) return fileIcons.default;

    if (mime.startsWith('image/')) return fileIcons.image;
    if (mime.startsWith('video/')) return fileIcons.video;

    return fileIcons[mime] || fileIcons.default;
  }, []);

  const Icon = getFileIcon(file.mime);

  return (
    <>
      <Card>
        <CardHeader className='flex pl-4 pr-4'>
          <CardTitle className='flex justify-between w-full'>
            <span className='flex gap-2 items-center'>
              {Icon && <Icon />}
              <span>
                {file.name.slice(0, 16)}
                {file.name.length > 18 ? '...' : ''}
              </span>
            </span>

            <FileMenu file={file} />
          </CardTitle>
        </CardHeader>

        <CardContent
          className='grow cursor-pointer'
          onClick={() => setDetailsOpen(true)}
        >
          <Image
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            src={thumbnail}
            width={500}
            height={500}
            alt={file.name}
            loading='lazy'
            className='w-full h-full object-cover rounded-lg'
          />
        </CardContent>

        <CardFooter>
          <p>
            Última actualización:{' '}
            {file.updatedAt ? formatCustomDate(file.updatedAt) : 'Unknown'}
          </p>
        </CardFooter>
      </Card>

      <FileDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        file={file}
      />
    </>
  );
};
