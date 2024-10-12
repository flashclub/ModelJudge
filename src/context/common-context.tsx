"use client";

import React, { createContext, useState, useContext } from "react";

export const ContextData = createContext<any>({
  theme: "light",
  setTheme: () => {},
  text: "",
  setText: () => {},
  parsedData: {},
  setParsedData: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const CommonProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("light");
  const [text, setText] = useState("");
  const [parsedData, setParsedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContextData.Provider
      value={{
        theme,
        setTheme,
        text,
        setText,
        parsedData,
        setParsedData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ContextData.Provider>
  );
};
