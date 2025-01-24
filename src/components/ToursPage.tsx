"use client";
import { getAllTours, TourData } from '@/actions/tours/toursActions';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import ToursList from './ToursList';


const ToursPage:React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] =useState('');


  const { data, isPending } = useQuery({
    queryKey: ["tours" , query],
    queryFn: () =>getAllTours(searchValue),   
    enabled: !!query, // query가 비어있을 때 쿼리를 실행하지 않음
  }) ;


  const handleSearch = () => {
    setQuery(searchValue.trim());
  };

  return <>
    <form className='max-w-lg mb-12'>
      <div className='join w-full'>
        <input type="search"
            placeholder='여기에 국가나 도시명을 입력해 주세요.'
            className='input input-bordered join-item w-full' 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // 기본 Enter 동작(폼 제출 방지)
                handleSearch(); // Enter 키로 검색 실행
              }
            }}
          />
         <button className='btn btn-primary join-item' type="button"
          disabled={isPending}
          onClick={handleSearch}
         >{isPending ? '검색처리중...' :'검색'}</button>
      </div>
    </form>

    {isPending? <span className="loading loading-lg">loading</span> : <ToursList data={data as TourData[] } />}
  </>

}



export default ToursPage;
