import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import * as React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import Layout from '../components/layout';
import { MessageType, NewsList } from '../components/news-list';
import PrimaryButton from '../components/primary-button';
import Social from '../components/social';

interface Props {
  // messages: Array<MessageType>;
  data:{
  allMessage: {
    nodes: Array<MessageType>;
  };}
}

const News: React.FC<Props> = ({ data }: Props) => {
  return (
    <Layout>
      <Header />
      <Social />
      <Heading text={"News"} />
      {/* <div className="m-4 mx-auto px-6 max-w-2xl w-lg pb-48 text-center">Noch nichts los hier.</div> */}
      <NewsList messages={data.allMessage.nodes} />
      <PrimaryButton link={"/"} />
      <Footer />
    </Layout>
  );
};

export default News;

export const Head: HeadFC = () => <title>News</title>;

export const pageQuery = graphql`
  {
    allMessage {
      nodes {
        id
        date
        message
      }
    }
  }
`;
