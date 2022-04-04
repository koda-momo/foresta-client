import { memo, FC } from "react";
import { Flex } from "@chakra-ui/react";
import { XCircleFillIcon } from "@primer/octicons-react";
import styled from "styled-components";

import { Url } from "../../../types/generated/graphql";
import { Heading } from "../../atoms/common/Heading";
import { ShadowFrame } from "../../atoms/common/ShadowFrame";

type Props = {
  data: Array<Url>; //URLのデータ
};

/**
 * URL一覧画面.
 */
export const UrlList: FC<Props> = memo(({ data }) => {
  //URLの登録がない場合の表示
  if (data?.length === 0) {
    return (
      <Flex justifyContent="center">
        <XCircleFillIcon size={24} />
        URLの登録がありません
      </Flex>
    );
  }

  return (
    <>
      <Flex ml={10}>
        <Heading text="Other URL" />
      </Flex>
      <ShadowFrame margin={0} padding={5}>
        <_HiddenScrollBar>
          {data.map((item) => (
            <div key={item.urlName}>
              <Flex mt={5}>
                『{item.urlName}』
                <_URL href={item.url} target="blank">
                  {item.url}
                </_URL>
              </Flex>
            </div>
          ))}
        </_HiddenScrollBar>
      </ShadowFrame>
    </>
  );
});

//URL本体にかかっている
const _URL = styled.a`
  :hover {
    opacity: 50%;
  }
`;

//小窓
const _HiddenScrollBar = styled.div`
  overflow: auto;
  height: 150px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
