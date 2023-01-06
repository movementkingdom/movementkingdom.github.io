const { google } = require("googleapis");
const moment = require("moment-timezone");
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
const CALENDAR_NODE_TYPE = `Calendar`;
const EVENT_NODE_TYPE = `CalendarEvent`;

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, getNodesByType }, pluginOptions) => {
  const { createNode } = actions;

  const calendars = await getCalendars(pluginOptions.calendarIds);

  // constants for your GraphQL Calendar and CalendarEvent types
  const CALENDAR_NODE_TYPE = `Calendar`;
  const EVENT_NODE_TYPE = `CalendarEvent`;

  if (!calendars) {
    throw "No calendars found";
  }

  // loop through data, query events and create Gatsby nodes for calendar and events
  for (let calendar of calendars) {
    const calendarNodeId = createNodeId(`${CALENDAR_NODE_TYPE}-${calendar.id}`);
    const queryParams = { ...pluginOptions };
    const events = await getEvents(calendar.id, queryParams);
    if (!events.length) {
      console.warn(`gatsby-plugin-google-calendar: no events found (calendar ${calendar.id})`);
    }
    const children = [];
    events.forEach((event) => {
      const eventNodeId = createNodeId(`${EVENT_NODE_TYPE}-${event.id}`);

      // If no events have a description, then Google does not send the field.
      // An empty value should be provided in-case queries are referencing it.
      if (!event.description) event.description = "";

      if (event.start.date && event.end.date) {
        // event is "all-day"
        event.start = {
          ...event.start,
          date: moment(event.start.date).tz(calendar.timeZone, true).format(),
          timeZone: calendar.timeZone,
        };
        event.end = {
          ...event.end,
          date: moment(event.end.date).tz(calendar.timeZone, true).format(),
          timeZone: calendar.timeZone,
        };
        event.allDay = true;
      } else {
        event.allDay = false;
      }

      createNode({
        ...event,
        id: eventNodeId,
        parent: calendarNodeId,
        children: [],
        internal: {
          type: EVENT_NODE_TYPE,
          content: JSON.stringify(event),
          contentDigest: createContentDigest(JSON.stringify(event)),
        },
      });
      children.push(eventNodeId);
    });
    createNode({
      ...calendar,
      id: calendarNodeId,
      parent: null,
      children: children,
      internal: {
        type: CALENDAR_NODE_TYPE,
        content: JSON.stringify(calendar),
        contentDigest: createContentDigest(calendarNodeId),
      },
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Calendar implements Node {
      summary: String!
      description: String
      children: [CalendarEvent]
    }
    type EventDate {
      date: String!
      timeZone: String!
    }
    type CalendarEvent implements Node {
      summary: String!
      description: String
      start: EventDate!
      end: EventDate!
      allDay: Boolean!
    }
  `;
  createTypes(typeDefs);
};

/**
 * Lists the calendars of the user.
 * By default all calendars of the user are returned.
 * Optionally an array containing the IDs of the Google calendars to be queried can be specified.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {Array} calendarIds An array containing the IDs of the Google calendars to retrieve
 */
async function getCalendars(calendarIds = []) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendar = google.calendar({ version: "v3", auth: apiKey });
  if (calendarIds.length) {
    return await Promise.all(
      calendarIds.map(async (calendarId) => {
        const res = await calendar.events.list({
          calendarId,
          maxResults: 1,
        });
        return {
          id: calendarId,
          summary: res.data.summary,
          timeZone: res.data.timeZone,
          description: ""
        };
      })
    );
  } else {
    return [];
  }
}

/**
 * Lists the events of the calendar with the provided calendarId.
 * Various options can be passed to e.g.
 * - only return events starting from a minimum time
 * - limit the number of returned events
 * - order the returned events
 * For a full list of options visit
 * @param {string} calendarId An ID of a Google Calendar.
 * @param {Object} queryParams Options to be passed to the calendar event list query
 */
async function getEvents(calendarId, queryParams) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendar = google.calendar({ version: "v3", auth: apiKey });
  return (
    await calendar.events.list({
      calendarId,
      ...queryParams,
    })
  ).data.items;
}
