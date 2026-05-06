import { Outlet, useLoaderData, useNavigation } from 'react-router';
import { FolderProvider } from '@/contexts/FolderContext';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

export const AppLayout = () => {
  const { user } = useLoaderData();
  const navigation = useNavigation();
  const folderName = user.$id;
  const isNavigating = navigation.state === 'loading';

  return (
    <FolderProvider folderName={folderName}>
      <SidebarProvider>
        <TooltipProvider
          delayDuration={500}
          disableHoverableContent
        >
          <AppSidebar
            collapsible='icon'
            variant='sidebar'
          />

          <SidebarInset className='relative overflow-hidden bg-muted'>
            <div className='landing-grid-background absolute inset-0 opacity-40' />

            <header className='sticky top-0 z-20 flex items-center border-b bg-background/80 p-3 shadow-sm backdrop-blur'>
              <SidebarTrigger className='mr-3' />
              <div>
                <h1 className='font-semibold leading-none'>ZeroBox</h1>
                <p className='mt-1 text-xs text-muted-foreground'>
                  Gestiona tus archivos y carpetas
                </p>
              </div>
            </header>

            <main className='relative z-10 flex-1 overflow-y-auto p-4 md:p-6'>
              <div className='mx-auto w-full max-w-7xl rounded-lg border bg-background/80 p-4 shadow-sm backdrop-blur md:p-6'>
                {isNavigating ? <DashboardSkeleton /> : <Outlet />}
              </div>
            </main>
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>
    </FolderProvider>
  );
};
