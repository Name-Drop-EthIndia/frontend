import { graphClient } from "@/graph.config";

const ApolloWrapper = ({ children }) => {
  return (
    <>
      <ApolloProvider client={graphClient}>{children}</ApolloProvider>
    </>
  );
};

export default ApolloWrapper;
