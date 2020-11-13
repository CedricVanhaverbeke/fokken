import React from 'react';

import { Content, PageHeader } from '@ftrprf/tailwind-components';

export const HeaderSkeleton = ({
  lessonLoading,
  classGroupLessonStudentLoading,
  children,
}) =>
  lessonLoading && classGroupLessonStudentLoading ? (
    <PageHeader>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <div className="w-36 h-6 mb-2 bg-gray-300 animate-pulse rounded" />
          <div className="bg-gray-300 h-10 w-88 rounded animate-pulse -mb-1" />
        </div>
        <div className="w-36 h-6 mb-2 bg-gray-300 animate-pulse rounded" />
      </div>
    </PageHeader>
  ) : (
    children
  );

export const ContentSkeleton = ({ questionSlides, children }) =>
  !questionSlides ? (
    <Content>
      <div className="flex flex-col w-full" role="loading">
        {Array.from(Array(5), (_, i) => (
          <div className="flex w-full justify-center" key={i}>
            <div className="w-full flex flex-col sm:flex-row gap-x-4">
              <span className="flex-shrink-0 h-8 w-32 bg-gray-200 animate-pulse mb-2" />
              <div className="w-full flex flex-col items-center flex-grow">
                <div className="max-w-6xl w-full">
                  <div className="bg-gray-200 animate-pulse rounded mb-4 h-8" />
                  {i % 3 === 0 ? (
                    <div className="w-full h-32 bg-gray-200 rounded animate-pulse mb-4" />
                  ) : (
                    <div className="grid grid-cols-2 gap-2 w-full mb-4">
                      <div className="h-12 bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 bg-gray-200 rounded animate-pulse" />
                      <div className="h-12 bg-gray-200 rounded animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Content>
  ) : (
    children
  );
