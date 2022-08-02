import "../styles/globals.css";

import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="DvGuMvt8DBJSRlK9xnmvk47CBAyyJ6IRbaoZWF3E"
      serverUrl="https://wgvljzn3us9r.usemoralis.com:2053/server"
      
    >
    
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
