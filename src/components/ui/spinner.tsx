
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  'animate-spin rounded-full border-solid border-t-transparent',
  {
    variants: {
      variant: {
        default: 'border-primary',
        secondary: 'border-secondary',
        destructive: 'border-destructive',
      },
      size: {
        default: 'h-6 w-6 border-2',
        sm: 'h-4 w-4 border-2',
        lg: 'h-8 w-8 border-4',
        xl: 'h-12 w-12 border-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ className, variant, size }: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ variant, size, className }))}
      aria-label="loading"
    />
  );
}
