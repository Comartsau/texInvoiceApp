import React from "react";

const HomeOwner = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-xl text-center ">HomeOwner</h1>
      <h1
        className="text-xl text-center bg-red-200 cursor-pointer "
        onClick={handleLogout}
      >
        ออกจากระบบ
      </h1>
    </>
  );
};

export default HomeOwner;
