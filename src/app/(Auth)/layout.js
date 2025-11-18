import Image from "next/image";
import React from "react";
import authsideImage from "@/assets/images/loginsideImage.png";

export default function AuthLayout({ children }) {
  return (
    <main
      className="relative flex h-screen items-center justify-center"
      style={{
        background: "url('/rm222batch2-mind-03.jpg') ",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 w-[100%]">
        <Image src="/Vector.png" alt="background" width={1200} height={1200} />
      </div> */}
      <div className="mx-auto lg:w-[55%]">
        {/* -------------------------------------------logo -------------------------------- */}
        {/* <div className="w-max mx-auto mb-3">
          <LogoSvg />
        </div> */}

        <div className="flex items-center justify-center gap-10">
          <div>
            <Image
              className=""
              src={authsideImage}
              alt="background"
              width={1200}
              height={1200}
            />
          </div>
          <div className="w-full bg-white">{children}</div>
        </div>
      </div>
    </main>
  );
}
