/* 
Docs: 
https://googleapis.dev/nodejs/googleapis/latest/calendar/index.html

*/

import { calendar_v3, google } from 'googleapis';

import Calendar = calendar_v3.Calendar;
import Schema$Events = calendar_v3.Schema$Events;

type CalendarTypeOverridesType = {
  method: string;
  minutes: number;
};

export type CalendarEventType = {
  summary: string;
  location: string;
  start: {
    dateTime: Date;
    timeZone: string;
  };
  end: {
    dateTime: Date;
    timeZone: string;
  };
  recurrence: Array<string>;
  attendees: Array<string>;
  reminders: {
    useDefault: boolean;
    overrides: Array<CalendarTypeOverridesType>;
  };
};

export const getEvents = async (calendarId: string) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendar: Calendar = google.calendar({ version: "v3", auth: apiKey });

  const schemaEvent: Schema$Events = (
    await calendar.events.list({
      calendarId: calendarId,
      orderBy: "starttime",
      singleEvents: true,
      timeMin: new Date().toISOString(),
      maxResults: 50
    })
  ).data;

  return schemaEvent;
};

export const addEvent = (calendarID: string, event: CalendarEventType) => {
  // function initiate() {
  //   gapi.client
  //     .request({
  //       path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
  //       method: "POST",
  //       body: event,
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(
  //       (response) => {
  //         return [true, response];
  //       },
  //       function (err) {
  //         console.log(err);
  //         return [false, err];
  //       }
  //     );
  // }

  // gapi.load("client", initiate);
};
