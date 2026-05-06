import { Link } from 'react-router';
import {
  ArrowRightIcon,
  BoxIcon,
  ClockIcon,
  FolderIcon,
  ShieldCheckIcon,
  UploadIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/assets/logo';

const previewFiles = [
  {
    name: 'Brand assets',
    detail: '18 archivos',
    icon: FolderIcon,
  },
  {
    name: 'Presentación final.pdf',
    detail: 'Actualizado hoy',
    icon: BoxIcon,
  },
  {
    name: 'Fotos campaña',
    detail: '32 imágenes',
    icon: FolderIcon,
  },
] as const;

const features = [
  {
    title: 'Archivos organizados',
    description: 'Carpetas, vistas recientes y acceso rápido desde un solo lugar.',
    icon: FolderIcon,
  },
  {
    title: 'Subidas simples',
    description: 'Guarda tus documentos e imágenes con una experiencia directa.',
    icon: UploadIcon,
  },
  {
    title: 'Cuenta protegida',
    description: 'Autenticación con email o Google para entrar a tu espacio.',
    icon: ShieldCheckIcon,
  },
] as const;

export const Landing = () => {
  return (
    <main className='relative min-h-svh overflow-hidden bg-muted text-foreground'>
      <div className='landing-grid-background absolute inset-0' />
      <div className='landing-scanline absolute inset-0' />

      <div className='relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-6 md:px-10'>
        <header className='landing-fade-up flex items-center justify-between gap-4'>
          <Link
            to='/'
            className='flex items-center gap-2 font-medium transition-transform hover:scale-[1.02]'
            viewTransition
          >
            <Logo
              variant='icon'
              className='size-8 landing-logo-float'
            />
            ZeroBox
          </Link>

          <nav className='flex items-center gap-2'>
            <Button
              variant='ghost'
              asChild
            >
              <Link
                to='/auth/login'
                viewTransition
              >
                Login
              </Link>
            </Button>

            <Button asChild>
              <Link
                to='/auth/signup'
                viewTransition
              >
                Registrar
              </Link>
            </Button>
          </nav>
        </header>

        <section className='grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:py-16'>
          <div className='landing-fade-up max-w-xl space-y-8 [animation-delay:120ms]'>
            <div className='space-y-4'>
              <div className='inline-flex items-center gap-2 rounded-md border bg-background/90 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur'>
                <ClockIcon className='size-4' />
                Tu box siempre a mano
              </div>

              <h1 className='text-4xl font-semibold tracking-normal text-balance md:text-6xl'>
                ZeroBox
              </h1>

              <p className='text-lg text-muted-foreground text-balance'>
                Organiza, sube y consulta tus archivos desde un espacio limpio,
                rápido y pensado para el trabajo diario.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row'>
              <Button
                size='lg'
                className='bg-blue-500 text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-blue-600'
                asChild
              >
                <Link
                  to='/auth/signup'
                  viewTransition
                >
                  Crear cuenta
                  <ArrowRightIcon />
                </Link>
              </Button>

              <Button
                size='lg'
                variant='outline'
                className='bg-background/90 transition-transform hover:scale-[1.02]'
                asChild
              >
                <Link
                  to='/auth/login'
                  viewTransition
                >
                  Iniciar sesión
                </Link>
              </Button>
            </div>
          </div>

          <div className='landing-fade-up landing-panel-motion rounded-lg border bg-background/95 shadow-sm backdrop-blur [animation-delay:220ms]'>
            <div className='flex items-center justify-between border-b p-4'>
              <div className='flex items-center gap-3'>
                <Logo
                  variant='icon'
                  className='size-9'
                />
                <div>
                  <p className='font-medium'>Mi ZBox</p>
                  <p className='text-sm text-muted-foreground'>
                    Actividad reciente
                  </p>
                </div>
              </div>

              <Button
                size='sm'
                className='bg-blue-500 text-white hover:bg-blue-600'
              >
                <UploadIcon />
                Nuevo
              </Button>
            </div>

            <div className='grid gap-3 p-4'>
              {previewFiles.map((file, index) => (
                <div
                  key={file.name}
                  className='landing-file-row flex items-center justify-between rounded-md border bg-muted/50 p-3 transition-colors hover:bg-muted'
                  style={{ animationDelay: `${360 + index * 120}ms` }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex size-10 items-center justify-center rounded-md bg-background'>
                      <file.icon className='size-5 text-blue-500' />
                    </div>
                    <div>
                      <p className='font-medium'>{file.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {file.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='grid gap-4 pb-8 md:grid-cols-3'>
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className='landing-fade-up rounded-lg border bg-background/90 p-4 shadow-sm backdrop-blur transition-transform hover:-translate-y-1 hover:bg-background'
              style={{ animationDelay: `${420 + index * 100}ms` }}
            >
              <feature.icon className='mb-4 size-5 text-blue-500' />
              <h2 className='font-medium'>{feature.title}</h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                {feature.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};
