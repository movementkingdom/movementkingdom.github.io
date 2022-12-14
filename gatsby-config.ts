import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `movementkingdom.github.io`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Movementkingdom`,
        short_name: `Move`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#FFF3C7`,
        display: `standalone`,
        icon: "src/images/icon-bg-white.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./src/content/",
      },
      __key: "content",
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-telegram",
      options: {
        channelName: "mkdrgbnews",
      },
    },
    {
      resolve: `gatsby-plugin-google-calendar`,
      options: {
        calendarIds: ["hla1m0ms5tppffg9mv1q22oojg@group.calendar.google.com"],
        // options to retrieve the next 10 upcoming events
        timeMin: new Date().toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: "startTime",
      },
    },
  ],
};

export default config;
