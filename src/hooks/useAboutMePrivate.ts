import {
  useGetUserByIdQuery,
  useGetUserByUuIdQuery,
} from "../types/generated/graphql";

/**
 * private部分情報取得メソッド.
 */
export const useAboutMePrivate = (postData: string) => {
  /**
   * ユーザ情報の取得(自身の情報取得).
   * @remarks 取得情報:名前、職種、GitHub
   */
  const {
    loading: myLoading,
    error: myError,
    data: my,
  } = useGetUserByIdQuery({
    variables: { userToken: postData },
  });
  const myData = my?.user.node;

  /**
   * ユーザ情報の取得(他人の情報取得).
   * @remarks 取得情報:名前、職種、GitHub
   */
  const {
    loading: otherLoading,
    error: otherError,
    data: other,
  } = useGetUserByUuIdQuery({
    variables: { userUuid: postData },
  });
  const otherData = other?.user.node;

  return { myLoading, myError, otherLoading, otherError, myData, otherData };
};
