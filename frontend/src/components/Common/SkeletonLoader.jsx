import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div key={i} className="animate-pulse">
      {type === 'card' && (
        <div className="card">
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      )}
      
      {type === 'list' && (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      )}
      
      {type === 'table' && (
        <div className="table-container">
          <div className="table-header">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="table-row">
                <div className="table-cell">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {type === 'avatar' && (
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-12 h-12"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      )}
    </div>
  ));

  return <div className={count > 1 ? 'space-y-4' : ''}>{skeletons}</div>;
};

export default SkeletonLoader;