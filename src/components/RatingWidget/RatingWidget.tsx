import starEmpty from "../../assets/icons/starEmpty.svg";
import starFilled from "../../assets/icons/starFilled.svg";
import logoLight from "../../assets/logo-alphland-light.svg";
import logo from "../../assets/logo-alphland.svg";
import { useDarkMode } from "../../hooks/useDarkMode";
import useRatingData from "../../hooks/useRatingData";
import Loading from "./Loading/Loading";
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";

const RatingWidget = (): ReactElement => {
  const [dappName, setDappName] = useState("");
  const { ratingData, isLoading } = useRatingData(dappName);
  const { currentTheme, setTheme } = useDarkMode();
  const totalStars = 5;
  const activeStars = ratingData ? ratingData.average_rating : undefined;
  const url = `https://www.alph.land/${dappName}`;

  function handleClick() {
    if (window.top) {
      window.top.location.href = url;
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("dappname");
    if (name) {
      setDappName(name.toLowerCase());
    }
    const userTheme = params.get("theme");
    if (userTheme) {
      setTheme(userTheme);
    }
  }, []);

  return (
    <div
      className={`${
        currentTheme === "dark" ? "bg-black" : "bg-white "
      } flex flex-col justify-center items-center border-2 border-black rounded-lg cursor-pointer py-5  leading-none`}
      onClick={handleClick}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {activeStars ? (
            <h2 className="text-[22px] font-bold">
              Error, app does not exist or has no ratings!
            </h2>
          ) : (
            <>
              <div>
                <a href={url}>
                  <h2 className="text-[22px] font-bold">{dappName}</h2>
                </a>
              </div>
              <div className="mt-2">
                {Array.from({ length: totalStars }).map((_, index) =>
                  activeStars && index < activeStars ? (
                    <span className="mx-0.5" key={index}>
                      <Image
                        src={starFilled}
                        alt="icon full star"
                        width={20}
                        height={20}
                      />
                    </span>
                  ) : (
                    <span className="mx-0.5" key={index}>
                      <Image
                        src={starEmpty}
                        alt="icon empty star"
                        width={20}
                        height={20}
                      />
                    </span>
                  )
                )}
              </div>
              <div className="mt-1 font-bold">
                <span>{activeStars}</span>
                <span className="text-lightgrey"> / {totalStars}</span>
              </div>
              <div className="mt-2 w-[124px] h-[37px]">
                {currentTheme === "dark" ? (
                  <Image src={logoLight} alt="Alphland logo" />
                ) : (
                  <Image src={logo} alt="Alphland logo" />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RatingWidget;
