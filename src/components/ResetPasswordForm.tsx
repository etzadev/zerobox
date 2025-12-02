import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useFetcher, useSearchParams } from 'react-router';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import type { SubmitHandler } from 'react-hook-form';

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const ResetPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Correo enviado. Revisa tu bandeja de entrada');

      form.reset();
    } else {
      toast.error(
        fetcher.data.error ?? 'Algo salió mal, inténtalo de nuevo más tarde',
      );
    }
  }, [fetcher.data, form]);

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(
    (values) => {
      fetcher.submit(
        {
          ...values,
          userId,
          secret,
        },
        {
          method: 'post',
          encType: 'application/json',
        },
      );
    },
    [userId, secret, fetcher],
  );

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Establecer nueva contraseña</CardTitle>
          <CardDescription>
            Tu nueva contraseña debe ser distinta a las que has usado
            anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid gap-6'
            >
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Crear contraseña'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Confirmar la nueva contraseña'
                          {...field}
                        />
                      </FormControl>
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
                  Establecer nueva contraseña
                </Button>
              </div>

              <div className='text-center text-sm'>
                <Button
                  variant='link'
                  asChild
                >
                  <Link
                    to='/auth/login'
                    className='underline underline-offset-4'
                    viewTransition
                  >
                    <ArrowLeftIcon />
                    Volver al inicio de sesión
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
