import { useAppSelector } from "../hooks/redux";
import React from "react";

const MainPage = () => {
  const { isAuthorized } = useAppSelector((state) => state.authReducer);

  return (
    <div>
      <h1>MAIN PAGE</h1>
      
    </div>
  );
};

export default MainPage;
