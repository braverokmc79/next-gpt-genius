import { getSingleTour, TourData } from '@/actions/tours/toursActions';
import TourInfo from '@/components/TourInfo';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

interface SingleTourPageProps {
  params:Promise<{tourId:string}>
}

const SingleTourPage:React.FC<SingleTourPageProps> = async ({ params} ) => {
  const {tourId} =await params;
  const tour =await getSingleTour(tourId) as TourData;

  if(!tour){
    redirect(`/tours`);
  }


  return (
    <div>
      <Link href="/tours" className='btn btn-secondary mb-12'>
        여행 페이지로...
      </Link>
      
       {tour  && <TourInfo  tour={ tour}   /> }
    </div>
  )

}

export default SingleTourPage;