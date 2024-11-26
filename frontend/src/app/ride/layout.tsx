import React from "react";
import { ReactNode } from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
      <div className="items-center flex flex-col justify-between h-screen">
        <Header />
        <main className="h-full m-auto p-[20px] w-[80%] my-8 flex flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
