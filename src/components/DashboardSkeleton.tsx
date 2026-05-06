import { Skeleton } from '@/components/ui/skeleton';

export const DashboardSkeleton = () => {
  return (
    <div className='space-y-8'>
      <div className='space-y-3'>
        <Skeleton className='h-9 w-64' />
        <Skeleton className='h-4 w-full max-w-lg' />
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className='rounded-lg border bg-background/80 p-3 shadow-sm'
          >
            <Skeleton className='mb-3 aspect-[4/3] w-full' />
            <Skeleton className='mb-2 h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
          </div>
        ))}
      </div>
    </div>
  );
};
