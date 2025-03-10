import { FollowersType, FollowingType } from "./types/types";

const diffFunction = (followersData: FollowersType["data"], followingData: FollowingType["data"]) => {
  const formattedFollowing = Object.values(followingData)[0];

  const followersResult = Object.values(followersData).map(
    (follow) => follow.string_list_data[0].value
  );

  const result = Object.values(formattedFollowing)
    .filter((follow) => {
      if (followersResult.includes(follow.string_list_data[0].value)) {
        return;
      } else {
        return follow.string_list_data[0].value;
      }
    })
    .map((follow) => follow.string_list_data[0].value);

  return result
};

export default diffFunction;
