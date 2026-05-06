import { Image, Video } from '@imagekit/react';
import { AlertTriangleIcon, ImageIcon, SparklesIcon } from 'lucide-react';
import type { FilePreviewType } from '@/types/all-types';

export const FilePreview = ({
  file,
  isVideo,
  isImage,
  thumbnail,
  transformQuery,
  loading,
  imageError,
  setLoading,
  setImageError,
}: FilePreviewType) => {
  return (
    <div className='flex min-h-[520px] flex-1 items-center justify-center bg-muted rounded-lg relative overflow-hidden'>
      {loading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/85 backdrop-blur-md'>
          <div className='ai-processing-card'>
            <div className='ai-processing-frame'>
              <ImageIcon className='size-14 text-blue-500' />
              <SparklesIcon className='ai-processing-sparkle size-6 text-blue-500' />
            </div>
            <div className='mt-4 h-2 w-48 overflow-hidden rounded-full bg-muted'>
              <div className='ai-processing-bar h-full w-1/2 rounded-full bg-blue-500' />
            </div>
          </div>
        </div>
      )}

      {imageError && (
        <div className='absolute left-4 right-4 top-4 z-20 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive shadow-sm backdrop-blur'>
          <div className='flex items-start gap-3'>
            <AlertTriangleIcon className='mt-0.5 size-5 shrink-0' />
            <div>
              <p className='font-medium'>La imagen no se pudo generar</p>
              <p className='mt-1 text-sm text-destructive/80'>
                No se pudo cargar correctamente el resultado. Intenta otra
                transformación o vuelve a abrir el archivo.
              </p>
            </div>
          </div>
        </div>
      )}

      {isVideo ? (
        <Video
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          src={file.url}
          width={800}
          height={800}
          alt={file.name}
          controls
          loading='lazy'
          className='max-h-[90%] max-w-[95%] rounded-lg'
        />
      ) : (
        <Image
          key={transformQuery}
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
          src={`${thumbnail}${isImage ? `&${transformQuery}` : ''}`}
          alt={file.name}
          loading='lazy'
          className={`rounded-lg object-contain h-full w-full ${imageError ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => {
            setImageError(false);
            setLoading(false);
          }}
          onError={() => {
            setImageError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
};
