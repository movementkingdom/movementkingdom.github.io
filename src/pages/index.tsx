import * as React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import Links from '../components/links';
import Social from '../components/social';

import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = (data) => {
  return (
    <main>
      <Layout>
        <Header />
        <Social />
        <Links />
        <Footer />
      </Layout>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
