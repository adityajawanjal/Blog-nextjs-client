import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className=" flex flex-col min-h-screen relative">
          <nav>
            <Navbar />
          </nav>
          <main className=" mb-40 container mx-auto">
            <Main />
          </main>
          <footer className=" absolute bottom-2 w-full ">
            <Footer />
          </footer>
        </div>
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
