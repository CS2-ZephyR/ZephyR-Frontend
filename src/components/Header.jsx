import {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Header() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  const number = useSelector((state) => state);
  console.log(number);

  return (
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-bold">
            Team ZephyR
          </Link>
        </div>

        <div className="mr-5 flex items-center space-x-4">
          {isLoggedIn ? (
              <>
                <Link to="/match" className="text-white">
                  대기실
                </Link>

                <div className="border-r mx-4 h-6 border-white"/>

                <Link to="/skin/pistol" className="text-white">
                  권총
                </Link>

                <Link to="/skin/smg" className="text-white">
                  짧은총
                </Link>

                <Link to="/skin/rifle" className="text-white">
                  긴총
                </Link>

                <Link to="/skin/other" className="text-white">
                  기타
                </Link>

                <div className="border-r mx-4 h-6 border-white"/>

                <div className="flex items-center space-x-2">
                  <div className="bg-gray-500 rounded-full h-8 w-8"/>
                  <span>TestUser</span>
                </div>

                <button onClick={() => {
                }} className="text-white">
                  로그아웃
                </button>
              </>
          ) : (
              <Link to="/login" className="text-white">
                로그인
              </Link>
          )}
        </div>
      </header>
  );
}
