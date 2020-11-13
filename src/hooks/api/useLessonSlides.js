import { useQuery } from 'react-query';

export const URL = (id, viewMode, hasQuestion) => {
  return `${
    process.env.NEXT_PUBLIC_API_URL
  }/lessons/${id}/slides?viewMode=${viewMode}${
    hasQuestion && '&hasQuestion=true'
  }`;
};

const useLessonSlides = (id, viewMode, hasQuestion) => {
  const response = useQuery(URL(id, viewMode, hasQuestion));

  return { lessonSlides: response.data?.slides, ...response };
};

export default useLessonSlides;
