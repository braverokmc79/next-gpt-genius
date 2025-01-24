import { generateTourImage, getSingleTour, TourData } from '@/actions/tours/toursActions';
import TourInfo from '@/components/TourInfo';
import Image from 'next/image';
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

  const tourImage = await generateTourImage(tour.city, tour.country);


  return (
    <div>
      <Link href="/tours" className='btn btn-secondary mb-12'>
        여행 페이지로...
      </Link>

      {tourImage ? (
        <Image
          src={tourImage}
          width={300}
          height={300}
          alt={tour.title}
          className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
          priority
        />
      ) : null}

      

       <TourInfo  tour={ tour}   />
    </div>
  )

}

export default SingleTourPage;