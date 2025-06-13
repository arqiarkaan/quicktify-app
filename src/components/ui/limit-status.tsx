import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface LimitStatusProps {
  currentCount: number;
  maxLimit: number;
  type: 'analisis' | 'estimasi';
  className?: string;
}

export const LimitStatus: React.FC<LimitStatusProps> = ({
  currentCount,
  maxLimit,
  type,
  className,
}) => {
  const remaining = Math.max(0, maxLimit - currentCount);
  const percentage = Math.min(100, (currentCount / maxLimit) * 100);
  const isNearLimit = percentage >= 80;
  const isAtLimit = currentCount >= maxLimit;

  // Determine status and styling
  let statusIcon;
  let statusColor;
  let progressColor;
  let badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';

  if (isAtLimit) {
    statusIcon = <AlertTriangle className="w-4 h-4" />;
    statusColor = 'text-red-600 dark:text-red-400';
    progressColor = 'bg-gradient-to-r from-red-500 to-red-600';
    badgeVariant = 'destructive';
  } else if (isNearLimit) {
    statusIcon = <Info className="w-4 h-4" />;
    statusColor = 'text-amber-600 dark:text-amber-400';
    progressColor = 'bg-gradient-to-r from-amber-500 to-orange-500';
    badgeVariant = 'outline';
  } else {
    statusIcon = <CheckCircle2 className="w-4 h-4" />;
    statusColor = 'text-emerald-600 dark:text-emerald-400';
    progressColor =
      'bg-gradient-to-r from-quicktify-primary to-quicktify-accent';
    badgeVariant = 'secondary';
  }

  return (
    <div
      className={cn(
        'p-4 rounded-lg border bg-gradient-to-r from-background/50 to-muted/30 backdrop-blur-sm',
        isAtLimit
          ? 'border-red-300 dark:border-red-600 bg-red-50/50 dark:bg-red-900/10'
          : isNearLimit
            ? 'border-amber-300 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-900/10'
            : 'border-quicktify-primary/30 bg-quicktify-primary/5',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={statusColor}>{statusIcon}</span>
          <span className="font-medium text-sm">
            {type.charAt(0).toUpperCase() + type.slice(1)} yang dilakukan
          </span>
        </div>
        <Badge variant={badgeVariant} className="text-xs">
          {currentCount}/{maxLimit}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            Anda telah melakukan{' '}
            <span className="font-semibold text-foreground">
              {currentCount}
            </span>{' '}
            dari{' '}
            <span className="font-semibold text-foreground">{maxLimit}</span>{' '}
            {type} bulan ini
          </span>
        </div>

        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn('h-full transition-all duration-500', progressColor)}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {isAtLimit ? (
              <span className="text-red-600 dark:text-red-400 font-medium">
                Limit tercapai
              </span>
            ) : (
              <span>
                Sisa:{' '}
                <span className="font-medium text-foreground">{remaining}</span>{' '}
                {type}
              </span>
            )}
          </span>
          <span>{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};
