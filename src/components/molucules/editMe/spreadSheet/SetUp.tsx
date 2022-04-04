import { memo, FC, Dispatch, SetStateAction, useCallback } from "react";
import { useCookies } from "react-cookie";

import { useGetSpreadSheetIdQuery } from "../../../../types/generated/graphql";
import { ButtonItem } from "../../../atoms/common/ButtonItem";
import styled from "styled-components";

type Props = {
  setMenuItem: Dispatch<SetStateAction<string>>; //menuItemセット用
  onClose: () => void; //モーダルを閉じるメソッド
};

/**
 * 初期設定説明用.
 */
export const SetUp: FC<Props> = memo(({ onClose, setMenuItem }) => {
  //cookieからID取得
  const [cookies] = useCookies();
  /**
   * 開発経験情報の取得.
   */
  const { data } = useGetSpreadSheetIdQuery({
    variables: {
      userToken: cookies.ForestaID,
    },
  });

  const spId = data?.getUserById.node.spreadSheetID;

  /**
   * リセットボタン.
   */
  const cancel = useCallback(() => {
    setMenuItem("");
    onClose();
  }, [onClose, setMenuItem]);

  return (
    <>
      <div>あなたのスプレッドシートのURLは</div>
      <div>
        {data && (
          <_Url href={`https://docs.google.com/spreadsheets/d/${spId}`}>
            https://docs.google.com/spreadsheets/d/{spId}
          </_Url>
        )}
      </div>
      <div>です。</div>
      <_Text>(1)スプレッドシートを作成します。</_Text>
      <_Text>
        (2)スプレッドシートのシート名を「スペックシート」に変更します。
        <_Image src="/images/image1.JPG" alt="シート名変更" />
      </_Text>
      <_Text>(3)右上、共有ボタンをクリックします。</_Text>
      <_Image src="/images/image2.JPG" alt="共有ボタンをクリック" />
      <_Text>
        (4)foresta@foresta-343403.iam.gserviceaccount.com
        のメールアドレスを追加します。
      </_Text>
      <_Image src="/images/image3.JPG" alt="メールアドレスを追加" />
      <_Btn>
        <ButtonItem name="とじる" onClick={cancel} />
      </_Btn>
    </>
  );
});

const _Text = styled.div`
  text-align: left;
  margin-top: 50px;
`;

const _Image = styled.img`
  margin-top: 10px;
  width: 500px;
  height: auto;
`;

const _Url = styled.a`
  :hover {
    opacity: 50%;
  }
`;

const _Btn = styled.div`
  margin-top: 50px;
`;
