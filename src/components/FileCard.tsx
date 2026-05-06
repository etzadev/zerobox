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
      <Card className='landing-fade-up group overflow-hidden border bg-background/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md'>
        <CardHeader className='flex px-4 pb-2'>
          <CardTitle className='flex w-full items-center justify-between gap-3 text-sm'>
            <span className='flex min-w-0 items-center gap-2'>
              {Icon && <Icon />}
              <span className='truncate'>
                {file.name.slice(0, 16)}
                {file.name.length > 18 ? '...' : ''}
              </span>
            </span>

            <FileMenu file={file} />
          </CardTitle>
        </CardHeader>

        <CardContent
          className='grow cursor-pointer px-4'
          onClick={() => setDetailsOpen(true)}
        >
          <div className='aspect-[4/3] overflow-hidden rounded-md bg-muted'>
            <Image
              urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
              src={thumbnail}
              width={500}
              height={500}
              alt={file.name}
              loading='lazy'
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]'
            />
          </div>
        </CardContent>

        <CardFooter className='px-4 pt-3 text-xs text-muted-foreground'>
          <p className='truncate'>
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
