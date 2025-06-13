import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
  isLimitEnabled,
  getAnalysisLimit,
  getEstimationLimit,
} from '@/lib/config';

export type LimitType = 'analysis' | 'estimation';

export interface LimitCheckResult {
  isLimitReached: boolean;
  currentCount: number;
  maxLimit: number;
  limitMessage: string;
  shouldShowLimit: boolean;
}

export const useLimitCheck = (type: LimitType): LimitCheckResult => {
  const shouldShowLimit = isLimitEnabled();
  const limit = type === 'analysis' ? getAnalysisLimit() : getEstimationLimit();

  // Get limit check data from Convex
  const analysisLimitData = useQuery(
    api.users.checkAnalysisLimit,
    shouldShowLimit && type === 'analysis' ? { limit } : 'skip'
  );

  const estimationLimitData = useQuery(
    api.users.checkEstimationLimit,
    shouldShowLimit && type === 'estimation' ? { limit } : 'skip'
  );

  // Determine which data to use based on type
  const limitData =
    type === 'analysis' ? analysisLimitData : estimationLimitData;

  // Default values when limit is not enabled or data is loading
  if (!shouldShowLimit) {
    return {
      isLimitReached: false,
      currentCount: 0,
      maxLimit: 0,
      limitMessage: '',
      shouldShowLimit: false,
    };
  }

  // Loading state
  if (limitData === undefined) {
    return {
      isLimitReached: false,
      currentCount: 0,
      maxLimit: limit,
      limitMessage: '',
      shouldShowLimit: true,
    };
  }

  const { hasReachedLimit, currentCount } = limitData;
  const actionText = type === 'analysis' ? 'analisis' : 'estimasi';

  let limitMessage = '';
  if (hasReachedLimit) {
    limitMessage = `Anda sudah mencapai limit ${limit} ${actionText} dalam bulan ini. Silakan coba lagi bulan depan.`;
  } else {
    const remaining = limit - currentCount;
    limitMessage = `Anda telah melakukan ${currentCount} dari ${limit} ${actionText} bulan ini. Sisa: ${remaining} ${actionText}.`;
  }

  return {
    isLimitReached: hasReachedLimit,
    currentCount,
    maxLimit: limit,
    limitMessage,
    shouldShowLimit: true,
  };
};
