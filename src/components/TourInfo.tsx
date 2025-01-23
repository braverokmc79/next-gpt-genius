import { GenerateTourResponseData } from '@/actions/tours/toursActions'
import React from 'react'

const TourInfo:React.FC<{tour:GenerateTourResponseData}> = ({tour}) => {
  const  {title, description, stops} =tour.tour || {};

  return (
    <div className="max-w-2xl">
      <h2 className="text-4xl font-semibold mb-4">{title}</h2>
      <p className="leading-loose mb-6">
          {description}
      </p>
      <ul>
         {stops&& stops.map((stop)=>{
            return (<li key={stop} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p>{stop}</p>  
              </li>
            );
         })}
      </ul>
     
    </div>
  )
}

export default TourInfo