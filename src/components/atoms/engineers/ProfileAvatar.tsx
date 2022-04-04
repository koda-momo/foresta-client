import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";

type Props = {
  engineerId: string;
  githuburl: string;
};

export const ProfileAvatar: FC<Props> = memo(({ engineerId, githuburl }) => {
  return (
    <Link to="/aboutme" state={{ engineerId: engineerId }}>
      <Avatar size="2xl" src={`https://github.com/${githuburl}.png`} />
    </Link>
  );
});
