"use server";
import OpenAI from "openai";
import prisma from "@/utils/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 OpenAI API 키를 가져옴
});



export interface ToursParams {
    city: string;
    country: string;
}



interface OpenAIResponse {
    usage: {
      total_tokens: number;
    };
    choices: {
      message: {
        content: string;
      };
    }[];
  }
  

export interface TourData {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  city: string;
  country: string;
  title: string;
  description: string;
  image: string | null;
  stops: string[];
}

export interface TourAiResponseData {
  tour: TourData;
}

export interface GenerateTourResponseData{
  tour: TourData | null;
  tokens: number | string;
}


 
export const generateTourResponse = async ({ city, country }: ToursParams) : Promise<GenerateTourResponseData | null> => {
    const query = `
      1. 정확히 이 ${city}가 ${country} 안에 있는지 확인하세요.
      2. 만약 ${city}와 ${country}가 존재한다면,  ${city}, ${country}에서 할 수 있는 활동의 목록을 만드세요.
      3. 목록이 준비되면 하루 동안의 여행 가이드를 만드세요. 응답은 다음 JSON 형식이어야 합니다:
      {
        "tour": {
          "city": "${city}",
          "country": "${country}",
          "title": "투어의 제목",
          "description": "도시와 투어에 대한 짧은 설명 : 300글자로 작성로 작성할것",
          "stops": ["정류장 이름 내용을  50글자로 작성", "정류장 이름 내용을  50글자로 작성", "정류장 이름 내용을  50글자로 작성"]
        }
      }
      4. "stops" 속성은 정류장 이름 세 개만 포함해야 합니다.
      5. 만약 정확한 ${city}에 대한 정보를 찾을 수 없거나, ${city}가 존재하지 않거나,
         해당 ${city}의 인구가 1명 미만이거나, 또는 해당 ${city}가 ${country}에 위치하지 않은 경우,
         아래와 같이 응답하세요:
         { "tour": null }
      6. 답변은 한국어로 합니다.
      7. 이외의 추가적인 문자는 포함하지 마세요.
    `;
  
    try {
      // OpenAI API 호출
      const response = (await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'you are a tour guide' },
          { role: 'user', content: query },
        ],
        model: 'gpt-3.5-turbo', // 사용할 모델 이름 지정 (gpt-4, gpt-3.5-turbo 등)
        temperature: 0,
        max_tokens:500,
      })) as OpenAIResponse;
  
      // 응답 데이터 검증
      const content = response.choices[0].message.content;
  
      console.log(" AI 응답 :",content);

      
      // JSON 형식 확인 및 파싱
      if (!content) {
        console.error("OpenAI 응답이 비어 있습니다.");
        return null;
      }
  
      let tourData;
      try {
        tourData = JSON.parse(content) as TourAiResponseData;
      } catch (parseError) {
        console.error("JSON 파싱 오류:", parseError);
        console.error("응답 내용:", content);
        return null;
      }
  
      // 결과 값이 null인지 확인
      if (!tourData.tour) {
        console.warn("투어 정보를 찾을 수 없습니다.");
        return null;
      }
  
      return { tour: tourData.tour, tokens: response.usage.total_tokens };
    } catch (error) {
      console.error("OpenAI API 호출 중 오류 발생:", error);
      return null;
    }
  };
  
  


  //등록된 여행이 있는지 확인
  export const getExistingTour = async ({city,country} :ToursParams )=>{
    console.log("* getExistingTour  :",city,country);

    return prisma.tour.findUnique({
      where: {
        city_country: {
          city: city,
          country: country
        }
      }
    })
}


//여행 등록
export const createNewTour =async(tour:TourData) =>{
    console.log(" * createNewTour : ",tour);
  return prisma.tour.create({data: tour});    
}



//여행 리스트 가져오기
export const getAllTours =async(searchTerm:string) =>{
  if(!searchTerm){
    const tours =await prisma.tour.findMany({
      orderBy:{
        city:'asc'
      }
    });

    return tours;
  }

  const tours = await prisma.tour.findMany({
    where:{
      OR:[
        { city:{contains:searchTerm} },
        { country:{contains:searchTerm} },
      ]
    },
    orderBy:{
      city:'asc'
    }
  });

  return tours;
}



export const getSingleTour =async (tourId:string) =>{
    return prisma.tour.findUnique({where:{id:tourId}});

}



export const generateTourImage = async (city:string, country:string ) => {
  try {
    const response = await openai.images.generate({
      prompt: `Panoramic view of ${city}, ${country}`,
      n: 1,
      size: "512x512",
    });
    return response?.data[0]?.url || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};









