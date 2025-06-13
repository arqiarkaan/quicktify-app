import React from 'react';

export default function AnalysisHistorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {[...Array(8)].map((_, i) => (
                <th key={i} className="px-4 py-2">
                  <div className="h-4 w-20 bg-muted rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(1)].map((_, i) => (
              <tr key={i}>
                {[...Array(8)].map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 w-full bg-muted rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
