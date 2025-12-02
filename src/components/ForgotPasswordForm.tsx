import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useFetcher, useNavigate } from 'react-router';
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

const formSchema = z.object({
  email: z.string('Por favor, introduce un correo electrónico válido'),
});

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const isLoading = fetcher.state !== 'idle';

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.ok) {
      toast.success('Correo enviado. Revisa tu bandeja de entrada');

      form.reset();

      navigate('/auth/login');
    } else {
      toast.error(
        fetcher.data.error ?? 'Algo salió mal, inténtalo de nuevo más tarde',
      );
    }
  }, [fetcher.data, form, navigate]);

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
          <CardTitle className='text-xl'>¿Olvidaste tu contraseña?</CardTitle>
          <CardDescription>
            No te preocupes, te enviaremos instrucciones para restablecer tu
            contraseña
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Ingresa tu email'
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
                  Recuperar contraseña
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
