import React from "react";
import Link from "next/link";
import logo from "../../public/logo.jpg";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col justify-center content-center text-center mx-auto w-screen h-screen">
        <Image
          priority
          src={logo}
          alt="logo"
          className="mx-auto"
          width={200}
          height={200}
        />
        <h2 className="my-10">uups... something went wrong</h2>
        <p>
          <Link
            className="text-xl underline decoration-xfelOrange underline-offset-2"
            href="/"
          >
            back to start
          </Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
