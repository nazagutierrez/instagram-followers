import { createContext, useContext } from "react";
import { FollowersContextType } from "../types/types";

export const FollowersContext = createContext<FollowersContextType | undefined>(undefined);

export const useFollowersContext = () => {
  const context = useContext(FollowersContext);

  if (context === undefined) {
    throw new Error("context not found");
  }

  return context;
};
