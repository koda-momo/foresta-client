import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { TodoModalProvider } from "./Providers/TodoModalProvider";

//GraphQLのURL
const client = new ApolloClient({
  uri: "https://protected-dawn-46734.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <TodoModalProvider>
          <App />
        </TodoModalProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
