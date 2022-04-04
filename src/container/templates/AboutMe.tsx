import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { Private } from "../../components/organisms/aboutMe/Private";
import { Public } from "../../components/organisms/aboutMe/Public";
import { StackTime } from "../../components/organisms/study/StackTime";

interface State {
  engineerId: string;
}

/**
 * AboutMe表示ページ.
 */
export const AboutMe: FC = () => {
  // エンジニアリストからtokenを受け取るためのlocation
  const location = useLocation();
  const { engineerId } = location.state as State;

  return (
    <>
      <Box width="90%" margin="0 auto 50px auto">
        <Public engineerId={engineerId} />
        {!engineerId && <Private />}
        {/* {engineerId ? <StackTime /> : <Private />} */}
      </Box>
    </>
  );
};
