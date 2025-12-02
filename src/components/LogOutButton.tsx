import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { account } from '@/lib/appwrite';
import { Button } from '@/components/ui/button';

export const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await account.deleteSession({ sessionId: 'current' });

      toast.success('Sesión cerrada exitosamente');
      navigate('/', { viewTransition: true });
    } catch (error) {
      console.log(error);
      toast.error('Fallo al cerrar sesión, inténtalo de nuevo más tarde');
    }
  }, [navigate]);

  return (
    <Button
      variant='destructive'
      onClick={handleLogout}
    >
      Cerrar sesión
    </Button>
  );
};
