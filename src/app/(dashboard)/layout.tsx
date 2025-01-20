import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from '../../components/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer">
         {/* Drawer 토글 input */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col items-center justify-center"> 
           {/* 작은 화면에서 Sidebar를 열기 위한 버튼 */}      
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden fixed top-6 right-6">
            <FaBarsStaggered className="w-8 h-8 text-primary" />
        </label>


        {/* 페이지별 콘텐츠 렌더링 */}
        <div className="w-full  bg-base-200 px-8 py-12 min-h-screen">              
         <label htmlFor="my-drawer-2" 
            className="btn btn-primary hidden w-52 h-12 text-16 lg:flex 
                drawer-button items-center justify-center">열기</label>
              {children}
        </div>

      </div>


      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>        
          <Sidebar />
      </div>

    </div>   
  );
};

export default layout;
