import React from 'react';

export default function AnalysisResultsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Statistik Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg" />
        ))}
      </div>

      {/* Pie Charts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-muted rounded-lg" />
        <div className="h-64 bg-muted rounded-lg" />
      </div>

      {/* Bar Charts Skeleton */}
      <div className="h-40 bg-muted rounded-lg" />
      <div className="h-40 bg-muted rounded-lg" />

      {/* Review Tabs Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-muted rounded-lg" />
        <div className="h-48 bg-muted rounded-lg" />
      </div>

      {/* Word Clouds Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-32 bg-muted rounded-lg" />
        <div className="h-32 bg-muted rounded-lg" />
      </div>

      {/* Spam Table Skeleton */}
      <div className="h-32 bg-muted rounded-lg" />

      {/* AI Summary Skeleton */}
      <div className="h-20 bg-muted rounded-lg w-2/3 mx-auto" />
    </div>
  );
}
