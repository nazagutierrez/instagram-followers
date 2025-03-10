import { useState } from "react";
import FollowersView from "./views/FollowersView";
import { FollowersContext } from "./context/FollowersContext";
import { FollowersType, FollowingType, FollowersContextType } from "./types/types";

const App = () => {
  const defaultFollowersData: FollowersContextType = {
    followersFileName:"",
    followersData: {
      title: "",
      media_list_data: [],
      string_list_data: [],
    },
    setFollowersFileName: () => {},
    setFollowersData: () => {},

    followingFileName:"",
    followingData: {
      relationships_following: [],
    },
    setFollowingFileName: () => {},
    setFollowingData: () => {},
  };

  const [followersData, setFollowersData] = useState<FollowersType["data"]>(defaultFollowersData.followersData);
  const [followersFileName, setFollowersFileName] = useState<FollowersType["name"]>(defaultFollowersData.followersFileName);

  const [followingData, setFollowingData] = useState<FollowingType["data"]>(defaultFollowersData.followingData);
  const [followingFileName, setFollowingFileName] = useState<FollowingType["name"]>(defaultFollowersData.followingFileName);

  return (
    <FollowersContext.Provider value={{  setFollowersFileName, setFollowingFileName ,followersFileName, followersData, setFollowersData, followingFileName, followingData, setFollowingData }}>
      <FollowersView />
    </FollowersContext.Provider>
  );
};

export default App;
