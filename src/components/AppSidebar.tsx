import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { FolderPlusIcon, PlusIcon, UploadIcon } from 'lucide-react';
import { NavUser } from '@/components/NavUser';
import { UploadFile } from '@/components/UploadFile';
import { NewFolder } from '@/components/NewFolder';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SIDEBAR_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import { Logo } from '@/assets/logo';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();
  const location = useLocation();
  const [openUpload, setOpenUpload] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);

  return (
    <>
      <Sidebar
        className='border-r bg-background/95 backdrop-blur'
        {...props}
      >
        <SidebarHeader className='px-3 py-4'>
          <Link
            to='/zerobox/home'
            className='flex items-center gap-2 font-medium'
          >
            <Logo
              variant='icon'
              className={cn(state === 'collapsed' ? 'size-8' : 'size-10')}
            />
            {state === 'expanded' && <span>ZeroBox</span>}
          </Link>
        </SidebarHeader>

        <SidebarContent className='px-2 mt-3'>
          <SidebarMenu>
            <SidebarMenuItem className='pb-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={state === 'collapsed' ? 'icon' : 'default'}
                    className={`${cn(state === 'collapsed' && 'size-8')} w-full bg-blue-500 text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-blue-600`}
                  >
                    <PlusIcon /> {state === 'expanded' && 'Nuevo'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='start'
                  side='right'
                  className='w-50 bg-muted'
                >
                  <DropdownMenuItem onClick={() => setOpenCreateFolder(true)}>
                    <FolderPlusIcon className='mr-2 size-4' />
                    Nueva carpeta
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setOpenUpload(true)}>
                    <UploadIcon className='mr-2 size-4' />
                    Subir archivo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>

            {SIDEBAR_LINKS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.url}
                  asChild
                >
                  <Link
                    to={item.url}
                    className='flex items-center gap-2 rounded-md transition-colors'
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <NavUser />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <UploadFile
        open={openUpload}
        onOpenChange={setOpenUpload}
      />

      <NewFolder
        open={openCreateFolder}
        onOpenChange={setOpenCreateFolder}
      />
    </>
  );
};
