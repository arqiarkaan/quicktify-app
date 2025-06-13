import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface LimitOverlayProps {
  isVisible: boolean;
  message: string;
  className?: string;
}

interface LimitMessageProps {
  message: string;
  className?: string;
}

// Komponen overlay lama (untuk backward compatibility)
export const LimitOverlay: React.FC<LimitOverlayProps> = ({
  isVisible,
  message,
  className,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 z-30 flex items-center justify-center pt-8',
        'bg-background/80 backdrop-blur-md',
        'border border-destructive/20 rounded-lg',
        className
      )}
      style={{ pointerEvents: 'all' }} // Prevent any interaction
    >
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-destructive">
          Limit Tercapai
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

// Komponen replacement yang lebih compact
export const LimitMessage: React.FC<LimitMessageProps> = ({
  message,
  className,
}) => {
  return (
    <Card className={cn('w-full flex flex-col justify-center', className)}>
      <CardHeader className="text-center pb-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-destructive/10">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <CardTitle className="text-2xl text-destructive mb-4">
          Limit Tercapai
        </CardTitle>
        <CardDescription className="text-lg">
          Anda telah mencapai batas penggunaan
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pb-12 flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <p className="text-base text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
