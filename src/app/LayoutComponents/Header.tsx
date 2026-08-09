import { UserInHeader } from "./UserInHeader";
import { ThemeToggle } from "../UIKit/components/ThemeToggle/ThemeToggle";
import { Wrapper } from "../UIKit/components/Wrapper/Wrapper";

export const Header = () => {
  return (
    <Wrapper className="wrapper m-5 flex justify-between px-2.5 items-center">
      Headder
      <div className="flex items-center gap-3 p-5">
        <ThemeToggle />
        <UserInHeader />
      </div>
    </Wrapper>
  );
};
