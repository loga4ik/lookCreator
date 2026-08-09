import Link from "next/link";
import { LogOut } from "./LogOut";
import { Button } from "./UIKit/components/Button/Button";

export default function Home() {
  return (
    <div className="flex justify-evenly mt-10">
      <Link href={"/wardrobe"}>
        <Button>wardrobe</Button>
      </Link>
      <Link className="btn btn-outline" href={"/logIn"}>
        <Button>войти</Button>
      </Link>
      <LogOut />
    </div>
  );
}
