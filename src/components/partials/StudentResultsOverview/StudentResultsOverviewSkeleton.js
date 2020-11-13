import React from 'react';

import { Content, PageHeader } from '@ftrprf/tailwind-components';

export const StudentResultsOverviewHeaderSkeleton = ({
  classGroupLoading,
  lessonDetailsLoading,
  children,
}) =>
  classGroupLoading && lessonDetailsLoading ? (
    <PageHeader>
      <div role="loading">
        <div className="w-36 h-6 mb-2 bg-gray-300 animate-pulse rounded" />
        <div className="bg-gray-300 h-10 w-88 rounded animate-pulse -mb-1" />
      </div>
    </PageHeader>
  ) : (
    children
  );

export const StudentResultsOverviewContentSkeleton = ({
  classGroupLessonStudentsLoading,
  children,
}) =>
  classGroupLessonStudentsLoading ? (
    <Content>
      <div role="loading" className="w-full flex-flex-col">
        <div className="h-8 bg-gray-200 animate-pulse w-full" />
        <div className="border-l border-r border-gray-200">
          {Array(5)
            .fill({})
            .map((_, i) => (
              <div
                className="flex gap-x-4 p-4 border-b border-gray-200"
                key={`row${i}`}
              >
                <div className="flex gap-x-4 items-center flex-grow">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-10 flex-grow rounded bg-gray-200 text-gray-200 animate-pulse" />
                </div>
                <div className="bg-gray-200 w-3/12 flex-shrink-0 animate-pulse h-10 rounded items-center" />
                <div className="bg-gray-200 w-3/12 flex-shrink-0 animate-pulse h-10 rounded items-center" />
              </div>
            ))}
        </div>
      </div>
    </Content>
  ) : (
    children
  );
