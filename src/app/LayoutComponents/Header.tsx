import React from "react";
import { UserInHeader } from "./UserInHeader";

export const Header = () => {
  return (
    <div className="h-15 w-full bg-gray-950 text-amber-50 flex justify-between p-2.5 items-center">
      Headder
      <UserInHeader/>
    </div>
  );
};
