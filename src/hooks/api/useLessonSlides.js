import useSWR from 'swr';

export const URL = (id, viewMode, hasQuestion) => {
  return `${
    process.env.NEXT_PUBLIC_API_URL
  }/lessons/${id}/slides?viewMode=${viewMode}${
    hasQuestion && '&hasQuestion=true'
  }`;
};

const useLessonSlides = (id, viewMode, hasQuestion, initialData) => {
  const response = useSWR(URL(id, viewMode, hasQuestion), undefined, {
    initialData,
  });

  return { lessonSlides: response.data.slides, ...response };
};

export default useLessonSlides;
