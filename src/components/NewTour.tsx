"use client";
import React, { FormEvent } from "react";
import TourInfo from "./TourInfo";

const NewTour: React.FC = () => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("NewTour form submitted");

    // FormData를 객체로 변환
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());

    // 입력 값 확인
    if (!destination.city || !destination.country) {
      console.error("도시와 국가를 모두 입력해 주세요.");
      return;
    }

    console.log("FormData:", destination);
    //alert(`투어가 생성되었습니다: ${destination.city}, ${destination.country}`);
    
  };

  
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 border rounded-lg shadow">
        <h2 className="mb-4 text-lg font-semibold">사는 지역을 선택해 주세요.</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            className="input input-bordered flex-1"
            name="city"
            placeholder="도시"
            required
          />
          <input
            type="text"
            className="input input-bordered flex-1"
            name="country"
            placeholder="국가"
            required
          />
          <button type="submit" className="btn btn-primary">
            투어 생성
          </button>
        </div>
      </form>

      <div className="mt-16">
        <TourInfo />
      </div>
    </>
  );
};

export default NewTour;
