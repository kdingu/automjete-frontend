import React from "react";

const Spinner = (props) => {
  const {fullScreen} = props;

  return (
    <div className="fixed w-screen h-screen bg-white bg-opacity-90 z-50">
      <div className="flex justify-center items-center w-full h-full">LOADING</div>
    </div>
  );
};

export default Spinner;
