import React from "react";

type Props = {
  message: string;
};

const Alert = ({ message }: Props) => {
  return (
    <div className="bg-red-500 p-4 rounded-sm text-white">
      <p>{message}</p>
    </div>
  );
};

export default Alert;
