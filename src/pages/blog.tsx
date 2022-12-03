import { HeadFC, Link, PageProps } from 'gatsby';
import * as React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import Heading from '../components/heading';
import HomeButton from '../components/home-button';
import Layout from '../components/layout';
import Social from '../components/social';

const Blog: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Header />
      <Social />
      <Heading text={"Blog"} />
      <HomeButton />
      <Footer />
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = () => <title>Blog</title>;