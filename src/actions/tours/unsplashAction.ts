import axios from "axios";

// 환경 변수에서 API 키 가져오기
const UNSPLASH_API_ACCESS_KEY = process.env.UNSPLASH_API_ACCESS_KEY;



// 이미지 검색 함수
export async function unsplashActionFetchImages(query :string) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        client_id: UNSPLASH_API_ACCESS_KEY,  // API 키
        per_page: 1,  // 한 페이지에 1개 이미지만 가져옵니다
      }
    });

    // 검색 결과에서 첫 번째 이미지 선택
    const images = response.data.results;
    if (images.length > 0) {
      return images[0].urls.full;  // 첫 번째 이미지의 URL을 반환
    } else {
      return null;  // 이미지가 없으면 null 반환
    }
  } catch (error) {
    console.error('이미지 검색 중 오류 발생:', error);
    return null;
  }
}


/**
 * // 사용 예시
unsplashActionFetchImages('New York').then((imageUrl) => {
  if (imageUrl) {
    console.log('이미지 URL:', imageUrl);
  } else {
    console.log('이미지를 찾을 수 없습니다.');
  }
});

*/
