import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ToursPage from '@/components/ToursPage';
import { getAllTours } from '@/actions/tours/toursActions';

const AllToursPage:React.FC = async () => {
  const queryClient =new QueryClient();

  // prefetchQuery는 특정 쿼리 키(queryKey)를 기준으로 데이터를 가져와 React Query의 캐시에 저장합니다.
  // 이를 통해 해당 쿼리가 필요한 컴포넌트가 처음 렌더링될 때 데이터가 이미 로드되어 있어 로딩 상태를 생략할 수 있습니다.
  await queryClient.prefetchQuery({
    queryKey: ["tours" , ''],
    queryFn: () =>getAllTours(""),

  });


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>      
      <ToursPage />
    </HydrationBoundary>
  )

}

export default AllToursPage;