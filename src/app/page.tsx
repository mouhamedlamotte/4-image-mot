"use client";

import Mockup from "@/components/mockup";
import { useLevel } from "@/context/LevelContext";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [trial, setTrial] = useState<
    {
      id: number;
      letter: string;
    }[]
  >([]);

  const { level, UpLevel } = useLevel();

  useEffect(() => {
    const verify = () => {
      if (trial.length == level?.word.length) {
        let combinedLetters = "";
        trial.forEach((item) => {
          combinedLetters += item.letter;
        });
        if (combinedLetters === level?.word) {
          setTrial([]);
          UpLevel();
        } else {
          alert("Incorect, reesayer");
        }
      }
    };

    setTimeout(() => {
      verify();
    }, 100);
  }, [trial, level?.word]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Mockup>
        <div className="bg-slate-900">
          <div className="p-4 w-full shadow-lg bg-slate-800  flex items-center">
            <button title="back" className="text-white">
              <ChevronLeft />
            </button>
            <button
              title="back"
              className="text-white bg-slate-700 rounded-full px-6 py-1 shadow-inner ml-auto"
            >
              <span className="font-bold text-sm">{level?.level}</span>
            </button>
          </div>
          <div className="py-4 px-2 grid grid-cols-2 gap-2">
            {level?.images.map((image) => {
              return <ImageItem src={image} key={image} />;
            })}
          </div>
          <div className="w-full mt-4 flex justify-center ">
            <div className="z-20  flex gap-2">
              {[...Array(level?.word.length)].map((car, index) => {
                return (
                  <button
                    onClick={() => {
                      const newState = trial.filter(
                        (item) => item.id != trial[index]?.id
                      );
                      setTrial(newState);
                    }}
                    title="chaine"
                    style={{
                      boxShadow:
                        "0 0 14px rgba(96, 165, 250, 0.5), 0 0 14px rgba(96, 165, 250, 0.5), 0 0 14px rgba(96, 165, 250, 0.5), 0 0 14px rgba(96, 165, 250, 0.5)",
                    }}
                    key={index}
                    className="bg-black flex items-center justify-center font-extrabold text-2xl text-white  h-[2.5rem] w-[2.5rem] border-b-4 border-slate-500 rounded-md outline-none focus:outline-none"
                  >
                    {trial[index]?.letter}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex w-full  mt-4 p-4 gap-2">
            <div className="grow grid grid-cols-6 gap-2 ">
              {level?.letters.map((car) => {
                return (
                  <div
                    title="chaine"
                    key={car.id}
                    className="bg-slate-600  h-[3rem] w-[2.5rem]  rounded-md"
                  >
                    <ButtonItem
                      car={car.letter}
                      isUsed={trial.some((letter) => letter.id === car.id)}
                      onclick={() => {
                        if (trial.length < level?.word.length) {
                          setTrial((prev) => [...prev, car]);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="w-[15%] bg-green-800 rounded-md shadow-lg"></div>
          </div>
        </div>
      </Mockup>
    </main>
  );
}

export const ImageItem = ({ src }: { src: string }) => {
  return (
    <div className="h-[10rem] rounded-md border-8 border-slate-600 bg-slate-950">
      <Image
        width={100}
        height={100}
        className="h-full w-full"
        src={src}
        alt="img"
      />
    </div>
  );
};

export const InputItem = () => {};

const ButtonItem = ({
  car,
  isUsed,
  onclick,
}: {
  car: string;
  isUsed: boolean;
  onclick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className={`bg-slate-200 h-full w-full rounded-md border-b-4 border-slate-500 font-extrabold  text-2xl flex justify-center items-center transition-all duration-200 ${
        isUsed ? "scale-0" : "scale-100"
      }`}
    >
      {car}
    </button>
  );
};
