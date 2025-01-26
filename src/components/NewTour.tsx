"use client";
import React, { FormEvent } from "react";
import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  generateTourResponse,
  ToursParams,
  GenerateTourResponseData,
  getExistingTour,
  createNewTour,
  TourData,
} from "@/actions/tours/toursActions";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { fetchUserTokensByID, subtractTokens } from "@/actions/token/tokenActions";

const NewTour: React.FC = () => {
  const queryClient = useQueryClient();
  const {userId}  =useAuth();



  const { mutate, isPending, data } = useMutation({
    mutationFn: async (destination: ToursParams) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;


      if(userId){
        const currentTokes =await fetchUserTokensByID(userId);
        if(currentTokes && currentTokes<550){
          toast.error("현재 보유하고 있는 토큰값이 적습니다.");
          return;
        }

        
        const newTour = (await generateTourResponse(destination)) as GenerateTourResponseData;

        if (!newTour || !newTour.tour || !newTour.tokens) {
          toast.error("일치하는 도시를 찾을 수 없습니다.");
          return null;
        }

       
         await createNewTour(newTour.tour);
         queryClient.invalidateQueries({ queryKey: ["tours"] });
        
         const remainingTokens = await subtractTokens(userId, newTour.tokens);
         toast.success(`${remainingTokens} 토큰이 남았습니다.`);
         return newTour.tour;
        
        }        
    },


  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("NewTour form submitted");

    // FormData를 객체로 변환
    const formData = new FormData(e.currentTarget);
    const formEntryData = Object.fromEntries(formData.entries()) as ToursParams | unknown;

    if (formEntryData) {
      const destination = formEntryData as ToursParams;
      if (destination) {
        mutate(destination as ToursParams);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl p-4 border rounded-lg shadow">
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

        {/* 로딩 상태 표시 */}
        {isPending && (
          <div className="w-full sm:w-1/2 flex justify-center h-3/4    items-center ">
            <span className="loading loading-lg"></span>
          </div>
        )}

      <div className="mt-16">{data ? <TourInfo tour={data as TourData} /> : null}</div>
    </>
  );
};

export default NewTour;
