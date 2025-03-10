import { Dispatch } from "react";

export type FileData = {
  name: string;
  data: File[];
};

export type FollowersType = {
  name: string;
  data: {
    title: string;
    media_list_data: [];
    string_list_data: {
      href: string;
      value: string;
      timestamp: number;
    }[];
  };
};

export type FollowingType = {
  name: string;
  data: {
    relationships_following: {
      title: string;
      media_list_data: [];
      string_list_data: {
        href: string;
        value: string;
        timestamp: number;
      }[];
    }[];
  };
};

export type FollowersContextType = {
  followersFileName: FollowersType['name'];
  followersData: FollowersType['data'];
  setFollowersFileName: Dispatch<React.SetStateAction<FollowersType['name']>>;
  setFollowersData: Dispatch<React.SetStateAction<FollowersType['data']>>;

  followingFileName: FollowingType['name'];
  followingData: FollowingType['data'];
  setFollowingFileName: Dispatch<React.SetStateAction<FollowingType['name']>>;
  setFollowingData: Dispatch<React.SetStateAction<FollowingType['data']>>;
};