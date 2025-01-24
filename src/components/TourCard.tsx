import { TourData } from '@/actions/tours/toursActions';
import Link from 'next/link';
import React from 'react'

const TourCard:React.FC<{tour:TourData}> = ({tour}) => {

 const {city, country ,id} = tour ;

  return (
   <>
    <Link href={`/tours/${id}`} className='card card-compact rounded-xl bg-base-100'>   
        <div className='card-body items-center text-center'>
            <h2 className='card-title text-center'>{country}, {city}</h2>
        </div>        
    </Link>   
   </>
  )
}

export default TourCard;