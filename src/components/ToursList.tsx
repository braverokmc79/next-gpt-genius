import React from 'react'
import TourCard from './TourCard';
import { TourData } from '@/actions/tours/toursActions';


const ToursList:React.FC<{data:TourData[]}> = ({data}) => {

  if(data.length===0) return <h4 className='text-lg'>등록된 여행지가 없습니다.</h4>;


  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
      {data.map((tour)=>{
          return <TourCard key={tour.id} tour={tour as TourData} />
      })}
    </div>
  )


}


export default ToursList;
