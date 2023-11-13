import { useEffect } from "react";

const HomeUser = () => {



  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-xl text-center ">HomeUser</h1>
      <h1
        className="text-xl text-center bg-red-200 cursor-pointer "
        onClick={handleLogout}
      >
        ออกจากระบบ
      </h1>
    </>
  );
};

export default HomeUser;
