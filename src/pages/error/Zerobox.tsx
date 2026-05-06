import { Link, useRouteError } from 'react-router';
import { AlertTriangleIcon, HomeIcon, RotateCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ZeroboxError = () => {
  const error = useRouteError();
  const message =
    error instanceof Error
      ? error.message
      : 'No se pudieron cargar los archivos de ZeroBox';

  return (
    <section className='flex min-h-[calc(100svh-57px)] items-center bg-background p-4'>
      <div className='mx-auto w-full max-w-xl rounded-lg border bg-card p-6 shadow-sm'>
        <div className='flex items-start gap-4'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive'>
            <AlertTriangleIcon className='size-5' />
          </div>

          <div className='space-y-2'>
            <h1 className='text-xl font-semibold'>
              No se pudieron cargar tus archivos
            </h1>
            <p className='text-sm text-muted-foreground'>{message}</p>
          </div>
        </div>

        <div className='mt-6 rounded-md border bg-muted/50 p-4 text-sm text-muted-foreground'>
          Verifica que la Appwrite Function configurada en{' '}
          <span className='font-medium text-foreground'>
            VITE_APPWRITE_FN_ID
          </span>{' '}
          tenga desplegado el código de ImageKit y devuelva{' '}
          <span className='font-medium text-foreground'>
            {'{ ok: true, data: [...] }'}
          </span>
          .
        </div>

        <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
          <Button
            onClick={() => window.location.reload()}
            className='sm:min-w-36'
          >
            <RotateCcwIcon />
            Reintentar
          </Button>

          <Button
            variant='outline'
            asChild
            className='sm:min-w-36'
          >
            <Link
              to='/'
              viewTransition
            >
              <HomeIcon />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
