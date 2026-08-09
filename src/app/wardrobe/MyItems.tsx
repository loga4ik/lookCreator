import Link from "next/link";
import { Wrapper } from "../UIKit/components/Wrapper/Wrapper";
import { Button } from "../UIKit/components/Button/Button";
import { ItemCard } from "../UIKit/components/ItemCard/ItemCard";

export const MyItems = () => {
  return (
    <>
      <div className="flex flex-no-wrap overflow-x-auto gap-8 py-8 px-6">
        <ItemCard title="My Item" category="платье" />
        <ItemCard title="My Item" category="платье" />
        <Wrapper
          shadowOut={false}
          className="flex items-center justify-center rounded-2xl p-10"
        >
          {/* потом можно поменять на модалку */}
          <Link href="/create-item">
            <Button className="bg-primary">Добавить вещь</Button>
          </Link>
        </Wrapper>
      </div>
    </>
  );
};
