import {useNavigate} from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
      <div className="flex items-center justify-center mt-64">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404 Error</h1>
          <p className="mt-4">페이지를 찾을 수 없습니다.</p>

          <button onClick={goBack} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            뒤로 가기
          </button>
        </div>
      </div>
  );
}
