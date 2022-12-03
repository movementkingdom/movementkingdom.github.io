import { graphql, HeadFC } from 'gatsby';
import * as React from 'react';

import Calendar from '../components/calendar';
import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import HomeButton from '../components/home-button';
import Layout from '../components/layout';
import Social from '../components/social';

interface Props {
  data: {
    allCalendar: {
      edges: {
        node: {
          summary: string;
          location: string;
          description: string;
          childrenCalendarEvent: {
            summary: string;
            start: {
              date: string;
              dateTime: string;
            };
            description: string;
            end: {
              date: string;
              dateTime: string;
            };
          };
        };
      };
    };
  };
}

const Kurse: React.FC<Props> = ({ data }: Props) => {
  return (
    <main>
      <Layout>
        <Header />
        <Social />
        <Heading text={"Aktuelle Kurse"} />
        <Calendar events={data.allCalendar.edges[0].node.childrenCalendarEvent} />
        <HomeButton />
        <Footer />
      </Layout>
    </main>
  );
};

export default Kurse;

export const Head: HeadFC = () => <title>Aktuelle Kurse</title>;

export const pageQuery = graphql`
  query MyCalendarQuery {
    allCalendar(filter: { summary: { eq: "Yoga Termine" } }) {
      edges {
        node {
          summary
          description
          childrenCalendarEvent {
            summary
            location
            start {
              date
              dateTime
            }
            description
            end {
              date
              dateTime
            }
          }
        }
      }
    }
  }
`;
