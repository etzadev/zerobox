import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className='landing-fade-up mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-semibold tracking-normal text-balance'>
          {title}
        </h1>
        <p className='max-w-2xl text-sm text-muted-foreground text-balance'>
          {description}
        </p>
      </div>

      {action}
    </div>
  );
};
