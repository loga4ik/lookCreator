import { cookies } from "next/headers";
import { Wrapper } from "../UIKit/components/Wrapper/Wrapper";
import { UserType } from "@/src/store/user.store";
import Image from "next/image";
import { Button } from "../UIKit/components/Button/Button";
import { LogOut } from "../LogOut";
import { MyLooks } from "./MyLooks";
import { MyItems } from "./MyItems";

const getUser = async (): Promise<UserType | null> => {
  const cookieStore = await cookies();
  console.log(cookieStore.toString());
  const res = await fetch("http://localhost:4000/user/me", {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
};

const Page = async () => {
  const user = await getUser();

  return (
    <>
      {user && (
        <div className="mx-15 my-5">
          <Wrapper
            shadowOut={false}
            className="flex h-30 p-5 mb-5 items-center gap-4"
          >
            <Image
              src={user.prophileImageLink}
              alt="Profile"
              width={64}
              height={64}
              loading="eager"
              className="rounded-full w-20 h-20"
            />
            <div>
              <h3 className="text-lg font-medium text-primary">
                {`${user.name} ${user.surname}`}
              </h3>
              <p className="text-sm text-secondary py-2">{`@${user.login}`}</p>
              <p className="text-sm text-muted">{`${user.email} • ${user.phone}`}</p>
            </div>
            <div className="flex flex-col gap-2 ml-auto">
              <Button
                size="sm"
                variant="ghost"
                className="text-secondary rounded-4xl"
              >
                Редактировать профиль
              </Button>
              <LogOut />
            </div>
          </Wrapper>
          <p className="text-sm text-muted">
            <b className="text-primary">12</b> вещей в гардеробе •{" "}
            <b className="text-primary">12</b> образов •{" "}
            <b className="text-primary">12</b> избранных вещей
          </p>
          <Wrapper className="py-1 px-3 mt-5 flex text-sm justify-between text-muted">
            <p>мои образы</p>
            <p>4 образа</p>
          </Wrapper>
          <MyLooks />
          <Wrapper className="py-1 px-3 mt-5 flex text-sm justify-between text-muted">
            <p>мои вещи</p>
            <p>4 вещи</p>
          </Wrapper>
          <MyItems />
        </div>
      )}
    </>
  );
};

export default Page;
