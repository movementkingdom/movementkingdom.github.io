import { getMessageHistory } from './helper/google-calendar';

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  });
  console.log("Loaded gatsby-plugin-google-calendar");
};

// constants for your GraphQL Post and Author types
const MESSAGE_NODE_TYPE = `Message`;

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType }, pluginOptions) => {
  const { createNode } = actions;

  console.log('Options of gatsby-plugin-google-calendar: ');
  console.log(pluginOptions)

  // console.log("Google Calendar ID: " + pluginOptions.channelName);

  const data = []; //await getEvents(pluginOptions.channelName);

  // loop through data and create Gatsby nodes
  data.forEach((message) =>
    createNode({
      ...message,
      id: createNodeId(`${MESSAGE_NODE_TYPE}-${message.id}`),
      parent: null,
      children: [],
      internal: {
        type: MESSAGE_NODE_TYPE,
        contentDigest: createContentDigest(message),
      },
    })
  );

  return;
};





