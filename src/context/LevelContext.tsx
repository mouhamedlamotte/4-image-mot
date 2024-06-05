"use client"

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export type LevelType = {
  level: number;
  word: string;
  letters: { id: number; letter: string }[];
  images: string[];
};

type LevelContextType = {
  level: LevelType | null;
  UpLevel: () => void;
};

export const LevelContext = createContext<LevelContextType | null>(null);

const LevelContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState<LevelType | null>(null);

  const getLevelNumber = () =>{
    if (!localStorage.getItem("levelNumber")){
      localStorage.setItem("levelNumber", "1")
    }
    return Number(localStorage.getItem("levelNumber"))
  }


  const getLevel = async () => {
    try {
      const res = await axios.get("http://localhost:3001/levels");
      if (res) {
        setLevel(res.data[getLevelNumber() - 1]);
      }
    } catch (error) {
      console.error("Error fetching level:", error);
    }    
  };

  const UpLevel = () => {
    localStorage.setItem("levelNumber", String(getLevelNumber() + 1))
    getLevel();
  };

  useEffect(() => {
    getLevel();
  }, []);


  
  const contextValue: LevelContextType = {
    level,
    UpLevel,
  };


  return <LevelContext.Provider value={contextValue}>{children}</LevelContext.Provider>;
};

export const useLevel = () => {



  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel must be used within a LevelContextProvider");
  }
  return context;
};

export default LevelContextProvider;
