import { HeadFC, Link, PageProps } from 'gatsby';
import * as React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import HomeButton from '../components/home-button';
import Layout from '../components/layout';
import Social from '../components/social';

const News: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Header />
      <Social />
      <Heading text={"News"} />
      <div className="m-4 mx-auto px-6 max-w-2xl w-lg pb-48 text-center">Noch nichts los hier.</div>
      <HomeButton />
      <Footer />
    </Layout>
  );
};

export default News;

export const Head: HeadFC = () => <title>News</title>;
