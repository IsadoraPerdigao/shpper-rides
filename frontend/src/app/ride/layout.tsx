import React from 'react';
import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/header';

// Tipagem para o componente Layout, indicando que ele recebe children (conteúdo da página)
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Meu Layout - Next.js</title>
        <meta name="description" content="Exemplo de layout com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main>{children}</main>
    </>
  );
};

export default Layout;
