import { FollowersType, FollowingType } from "./types/types";

const diffFunction = (followersData: FollowersType["data"], followingData: FollowingType["data"]) => {
  const formattedFollowing = Object.values(followingData)[0];

  const followersResult = Object.values(followersData).map(
    (follow) =>  {
      if (typeof follow !== "string" ) {
        if (Array.isArray(follow)) {
          return 
        } else {
          return follow["string_list_data"][0]["value"];
        }
      }
      return follow;
    }
  );

  console.log("followersResult", followersResult);
  console.log("formattedFollowing", formattedFollowing);
  const result = Object.values(formattedFollowing)
    .filter((follow) => {
      if (followersResult.includes(follow.title)) {
        return;
      } else {
        return follow.title;
      }
    })
    .map((follow) => follow.title);

    console.log("result", result);
  return result
};

export default diffFunction;
