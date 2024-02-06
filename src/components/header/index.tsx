"use client"

import { useRouter } from "next/navigation";
import { ImageComponent } from "../utils/image";

export function HomeHeaderComponent() {
  const { replace } = useRouter();
  return (
    <header className="z-40 absolute  flex items-center justify-center w-full px-3 py-1 md:justify-start md:py-3 lg:px-14">
      <ImageComponent
        alt={"logo"}
        h={"h-[6.25rem] md:h-[9.375tem]"}
        w={"w-[15.625rem] md:w-[18.75rem]"}
        src={
          "https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png"
        }
        containerClassname={"z-20"}
        onclik={() => replace("/")}
      />
    </header>
  );
}
