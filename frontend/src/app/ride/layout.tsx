import React from 'react';
import { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
      <div className='flex flex-col items-center'>
        <Header />
        
            <main className=" m-0 p-[30px] w-[80%] h-[70%] flex flex-col bg-white p-">{children}</main>

        <Footer />
        </div>    
    </>
  );
};

export default Layout;
