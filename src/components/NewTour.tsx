"use client";
import React, { FormEvent } from "react";
import TourInfo from "./TourInfo";
import { useMutation  } from "@tanstack/react-query";
import { generateTourResponse,  ToursParams , GenerateTourResponseData} from "@/actions/tours/toursActions";
import toast from "react-hot-toast";



const NewTour: React.FC = () => {

  const {mutate, isPending, data: tour  }   = useMutation({
      mutationFn: async(destination:ToursParams) => {
        const newTour = await generateTourResponse(destination) as GenerateTourResponseData | null;
        console.log (" newTour  : " , newTour);
        
        if(newTour){
          return newTour ;
        }

        toast.error("일치하는 도시를 찾을 수 없습니다.");
        return null;
      }
    })


    if(isPending){
      return <div className="w-full mx-auto flex justify-center items-center">
        <span className="loading loading-lg"></span>
        </div>
    }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("NewTour form submitted");

    // FormData를 객체로 변환
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries()) as unknown | ToursParams;
    if(destination){
      mutate(destination as ToursParams);
    }

    
    
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 border rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">사는 지역을 선택해 주세요.</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            className="input input-bordered flex-1"
            name="country"
            placeholder="국가"
            required
          />

          <input
            type="text"
            className="input input-bordered flex-1"
            name="city"
            placeholder="도시"
            required
          />

          <button type="submit" className="btn btn-primary">
            투어 생성
          </button>
        </div>
      </form>

      <div className="mt-16">
        { tour ?  <TourInfo tour ={tour as GenerateTourResponseData} />  : null}
      </div>
    </>
  );
};

export default NewTour;
