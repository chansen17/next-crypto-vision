import Navbar from '@/components/Navbar';
import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return <>
    <NextNProgress color="#0891b2" stopDelayMs={200}/>
    <Navbar />
    <Component {...pageProps} />
  </>
}
