import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useFetcher } from 'react-router';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleLogo } from '@/assets/logo/google';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import type { SubmitHandler } from 'react-hook-form';
import { handleOAuthLogin } from '@/lib/auth';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Por favor, introduce tu nombre')
    .max(128, 'El nombre no puede superar los 128 caracteres'),
  email: z.string('Por favor, introduce un correo electrónico válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const SignupForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const fetcher = useFetcher();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    const error = fetcher.data?.error;

    if (error) toast.error(error.message);
  }, [fetcher.data]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    (values) => {
      fetcher.submit(values, {
        method: 'post',
        encType: 'application/json',
      });
    },
    [fetcher],
  );

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Crear una cuenta</CardTitle>
          <CardDescription>Registrarse con Google</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid gap-6'
            >
              <div className='flex flex-col gap-4'>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={handleOAuthLogin}
                >
                  <GoogleLogo colorful />
                  Continuar con Google
                </Button>
              </div>

              <div className='after:border-border after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t relative text-center text-sm '>
                <span className='bg-card text-muted-foreground relative z-10 px-2'>
                  O continúa con
                </span>
              </div>

              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='John Doe'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='john@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>

                      <FormControl>
                        <Input
                          type='password'
                          placeholder='********'
                          className='tracking-wider'
                          {...field}
                        />
                      </FormControl>

                      <FormDescription>
                        La contraseña debe contener al menos 8 caracteres
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className='animate-spin' />}
                  Crear cuenta
                </Button>
              </div>

              <div className='text-center text-sm'>
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to='/auth/login'
                  className='underline underline-offset-4'
                  viewTransition
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *[a]:underline-offset-4'>
        Al Continuar, aceptas nuestros <a href='#'>Términos de servicio</a> y{' '}
        <a href='#'>Política de privacidad</a>
      </div>
    </div>
  );
};
