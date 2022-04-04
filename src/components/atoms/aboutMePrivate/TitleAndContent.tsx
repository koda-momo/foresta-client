import { memo, FC } from "react";
import styled from "styled-components";

type Props = {
  title: string; //タイトル
  content: string; //項目詳細内容
};

/**
 * 項目名と内容を並べる際に使える.
 */
export const TitleAndContent: FC<Props> = memo(({ title, content }) => {
  return (
    <>
      <_Title>■{title}</_Title>
      <_Content>{content}</_Content>
    </>
  );
});

//タイトル
const _Title = styled.div`
  font-weight: bold;
  font-size: larger;
  margin-left: 10px;
`;

//項目詳細
const _Content = styled.div`
  margin: 5px 0px 20px 30px;
`;
