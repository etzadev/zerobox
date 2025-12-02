import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, FolderX, HomeIcon, SearchIcon } from 'lucide-react';

export const RootError = () => {
  const navigate = useNavigate();

  return (
    <section className='flex min-h-screen items-center bg-background'>
      <div className='mx-auto max-w-container grow px-4 py-16 md:px-10'>
        <div className='mx-auto w-full max-w-2xl text-center'>
          <div className='mb-8 flex justify-center'>
            <div className='relative'>
              <div className='absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-2xl' />
              <div className='relative rounded-2xl bg-muted/50 p-8 backdrop-blur-sm'>
                <FolderX
                  className='h-24 w-24 text-muted-foreground/60 md:h-32 md:w-32'
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          <div className='space-y-4 md:space-y-6'>
            <div className='space-y-3'>
              <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5'>
                <span className='text-sm font-semibold text-primary'>
                  Error 404
                </span>
              </div>

              <h1 className='text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
                Archivo no encontrado
              </h1>
            </div>

            <p className='mx-auto max-w-md text-base text-muted-foreground md:text-lg'>
              Parece que este archivo o carpeta no existe en tu ZeroBox. Puede
              que haya sido eliminado o movido a otra ubicación.
            </p>
          </div>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-10'>
            <Button
              variant='outline'
              size='lg'
              onClick={() => navigate(-1)}
              className='sm:min-w-[140px]'
            >
              <ArrowLeftIcon className='h-4 w-4' />
              Volver
            </Button>

            <Button
              size='lg'
              asChild
              className='sm:min-w-[140px]'
            >
              <Link
                to='/zerobox/home'
                viewTransition
              >
                <HomeIcon className='h-4 w-4' />
                Ir al inicio
              </Link>
            </Button>
          </div>

          <div className='mt-12 rounded-lg border bg-muted/30 p-6 text-left md:mt-16'>
            <h2 className='mb-3 flex items-center gap-2 text-sm font-semibold text-foreground'>
              <SearchIcon className='h-4 w-4 text-primary' />
              ¿Qué puedes hacer?
            </h2>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex items-start gap-2'>
                <span className='mt-0.5 text-primary'>•</span>
                <span>Verifica que la URL sea correcta</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-0.5 text-primary'>•</span>
                <span>Busca el archivo usando la barra de búsqueda</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='mt-0.5 text-primary'>•</span>
                <span>
                  Revisa tu papelera si eliminaste el archivo recientemente
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
