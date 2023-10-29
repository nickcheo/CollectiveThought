// pages/_app.tsx

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // You can add global layout components or context providers here
  return <Component {...pageProps} />;
}

export default MyApp;
