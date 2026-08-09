import Link from "next/link";
import { LookCard } from "../UIKit/components/LookCard/LookCard";
import { Wrapper } from "../UIKit/components/Wrapper/Wrapper";
import { Button } from "../UIKit/components/Button/Button";

export const MyLooks = () => {
  return (
    <>
      <div className="flex flex-no-wrap overflow-x-auto gap-8 py-8 px-6">
        <LookCard
          title="My Look"
          description="Лёгкое повседневное платье приталенного силуэта, которое одинаково хорошо смотрится и на прогулке, и на встрече с друзьями"
        />
        <LookCard
          title="My Look"
          description="Лёгкое повседневное платье приталенного силуэта, которое одинаково хорошо смотрится и на прогулке, и на встрече с друзьями"
        />
        <Wrapper
          shadowOut={false}
          className="flex items-center justify-center rounded-2xl p-10"
        >
          {/* потом можно поменять на модалку */}
          <Link href="/create-look">
            <Button className="bg-primary">Создать образ</Button>
          </Link>
        </Wrapper>
      </div>
    </>
  );
};
