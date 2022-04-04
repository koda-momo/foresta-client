import { memo, FC } from "react";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import { returnCodeToBr } from "../../../utils/methods";
import { useCookies } from "react-cookie";
import { useGetSheetPrByUserIdQuery } from "../../../types/generated/graphql";

/**
 * スペックシート自己PR.
 */
export const SpecPr: FC = memo(() => {
  //cookieからID取得
  const [cookies] = useCookies();

  /**
   * スペックシートユーザ自己PR取得.
   */
  const { data, loading, error } = useGetSheetPrByUserIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });
  const prData = String(data?.pr.node.selfIntro);

  //読み込み中時の表示
  if (loading) {
    return (
      <Flex justifyContent="center">
        <Spinner color="green.400" />
      </Flex>
    );
  }
  //エラー時の表示
  if (error) {
    return <Flex justifyContent="center">Error</Flex>;
  }

  return (
    <>
      <Box mx={10}>{returnCodeToBr(prData)}</Box>
    </>
  );
});
