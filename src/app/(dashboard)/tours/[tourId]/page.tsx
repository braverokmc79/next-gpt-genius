import {  getSingleTour, TourData } from '@/actions/tours/toursActions';
import { unsplashActionFetchImages } from '@/actions/tours/unsplashAction';
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

  const tourImage =await unsplashActionFetchImages(`${tour.country} ${tour.city}`)
  //const tourImage = await generateTourImage(tour.city, tour.country);
  console.log("넥스트 서버에서 받은  tourImage : ",tourImage);

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
          placeholder="blur" // 로딩 중 블러 표시
          blurDataURL="data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDggNSc+CiAgICAgIDxmaWx0ZXIgaWQ9J2InIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+CiAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScgLz4KICAgICAgPC9maWx0ZXI+CgogICAgICA8aW1hZ2UgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgZmlsdGVyPSd1cmwoI2IpJyB4PScwJyB5PScwJyBoZWlnaHQ9JzEwMCUnIHdpZHRoPScxMDAlJyAKICAgICAgaHJlZj0nZGF0YTppbWFnZS9hdmlmO2Jhc2U2NCwvOWovMndCREFBZ0dCZ2NHQlFnSEJ3Y0pDUWdLREJRTkRBc0xEQmtTRXc4VUhSb2ZIaDBhSEJ3Z0pDNG5JQ0lzSXh3Y0tEY3BMREF4TkRRMEh5YzVQVGd5UEM0ek5ETC8yd0JEQVFrSkNRd0xEQmdORFJneUlSd2hNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpML3dBQVJDQUFMQUJBREFTSUFBaEVCQXhFQi84UUFGZ0FCQVFFQUFBQUFBQUFBQUFBQUFBQUFCZ01ILzhRQUloQUFBZ0lDQWdFRkFRQUFBQUFBQUFBQUFRSURCQVVSQUNFU0JoTVVNVUhCLzhRQUZRRUJBUUFBQUFBQUFBQUFBQUFBQUFBQUFBTC94QUFaRVFBREFBTUFBQUFBQUFBQUFBQUFBQUFBQVJFQ0lUSC8yZ0FNQXdFQUFoRURFUUEvQU5KdFhNbEZqekxjaGZIMVl4dDVQa3B2ZjUzL0FEWGZJeGVzemtFclJZK3V0eVYxVVNsU3dDc1U4aHM2ME5nRTY0aEVVZCtrOWEzR2swRWkrTG82Z2dnOWNNNTJOYU9GdFdxbzltWlN6cXlIV2pvOWdmWDd3M3VsNHpoLy85az0nIC8+CiAgICA8L3N2Zz4KICA="
          priority
        />
      ) : null}

      

       <TourInfo  tour={ tour}   />
    </div>
  )

}

export default SingleTourPage;