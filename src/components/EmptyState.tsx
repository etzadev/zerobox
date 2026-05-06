import type { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const EmptyState = ({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className='landing-fade-up flex min-h-64 items-center justify-center rounded-lg border border-dashed bg-background/70 p-8 text-center shadow-sm backdrop-blur'>
      <div className='flex max-w-sm flex-col items-center gap-3'>
        <div className='flex size-12 items-center justify-center rounded-md border bg-muted'>
          <Icon className='size-6 text-blue-500' />
        </div>
        <div className='space-y-1'>
          <h2 className='font-medium'>{title}</h2>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
    </div>
  );
};
