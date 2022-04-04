import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { GithubLeafType } from "../../../types/types";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useGetUserByIdQuery } from "../../../types/generated/graphql";
import { Heading } from "../../atoms/common/Heading";

//GithubAPI用のクエリー
const query = gql`
  query ($githubUrl: String!) {
    user(login: $githubUrl) {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

/**
 * Github草データを表示
 * @returns Github草データ.
 */
export const GithubLeaf = memo(() => {
  //クッキーからユーザーID取得
  const [cookies] = useCookies();

  //ユーザーIDからGithubURL取得
  const {
    data: githubDatas,
    loading,
    error,
  } = useGetUserByIdQuery({
    //Githubデータ取得
    variables: { userToken: cookies.ForestaID },
  });

  //取得したGithubURLを格納する
  const getGithubUrl = githubDatas?.user.node.githubURL;

  //GithubAPIのアクセスするためのトークン
  const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  //GithubAPIのリンク
  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
  });

  //Linkのheadersにトークン埋め込み、認証
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${TOKEN}`,
      },
    };
  });

  //新たにGithubAPI用のアポロクライアント作成
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  //取得したGithubデータを表示用配列に格納
  const [getData, setGetData] = useState<GithubLeafType>();

  //データをメソッドとして取得してきて、useEffectで更新させる
  useEffect(() => {
    if (githubDatas) {
      (async () => {
        const { data } = await client.query({
          variables: { githubUrl: getGithubUrl },
          query: query,
        });
        setGetData(data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGithubUrl]);

  return (
    <>
      <Flex align="center" ml={5} mt={5}>
        <Heading text="Github Leafs" />
      </Flex>
      <Box
        mx={15}
        mb={10}
        backgroundColor="white"
        shadow="xl"
        borderRadius="base"
        p={5}
      >
        <Box w="15px">
          <Flex>
            {loading ? (
              <Spinner color="green.500" />
            ) : error ? (
              <p>Error...</p>
            ) : (
              getData?.user.contributionsCollection.contributionCalendar.weeks.map(
                (githubWeeks, index) => (
                  <div key={index}>
                    <_container>
                      {githubWeeks.contributionDays.map((data) => (
                        <div key={data.date}>
                          <Box
                            w={{ base: 3, xl: 5, lg: 3 }}
                            h={{ base: 3, xl: 5, lg: 3 }}
                            bg={data.color}
                            m="2px"
                            rounded="base"
                            _hover={{
                              background: "white",
                            }}
                          />
                        </div>
                      ))}
                    </_container>
                  </div>
                ),
              )
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
});

const _container = styled.span`
  flex-direction: column;
`;
