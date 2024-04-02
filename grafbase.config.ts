import { graph, connector, config } from "@grafbase/sdk";

const g = graph.Standalone();

const upwork = connector.GraphQL("Upwork", {
  url: "https://api.upwork.com/graphql",
  headers: (headers) => {
    headers.set("Authorization", { forward: "Authorization" });
    headers.introspection("Authorization", `Bearer ${g.env("UPWORK_API_KEY")}`);
  },
});

g.datasource(upwork, { namespace: false });

export default config({
  graph: g,
  auth: {
    rules: (rules) => {
      rules.public();
    },
  },
  cache: {
    rules: [
      {
        types: ["Query"], // Cache everything for 60 seconds
        maxAge: 60,
        staleWhileRevalidate: 60,
      },
    ],
  },
});
