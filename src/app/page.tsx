import Link from "next/link";
import { LogOut } from "./LogOut";

export default function Home() {
  return (
    <div className="flex justify-evenly mt-10">
      <Link className="btn btn-outline" href={"/testPage1"}>
        testPage
      </Link>
      <Link className="btn btn-outline" href={"/logIn"}>
        войти
      </Link>
      <LogOut />
    </div>
  );
}
