import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer';
import ScrollToTop from './components/helper/scroll-to-top';
import Navbar from './components/navbar';
import './css/card.scss';
import './css/globals.scss';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio of Billy Jacoby - Software Developer',
  description:
    'This is the portfolio of Billy Jacoby. Ex aute do sit labore aliquip anim officia Lorem irure minim. Non adipisicing ipsum do ipsum quis voluptate proident. Nisi irure elit tempor eiusmod ad reprehenderit et excepteur est ipsum laborum anim veniam. Excepteur enim esse laboris ut nisi fugiat aliqua occaecat incididunt.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="relative mx-auto min-h-screen px-6 text-white sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM ?? ''} />
    </html>
  );
}
