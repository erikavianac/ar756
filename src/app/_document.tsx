// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    let GMT_ID = process.env.NEXT_PUBLIC_GTM_ID;
    console.log(GMT_ID)
    return (
      <Html>
        <Head>
          <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GMT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GMT_ID}', {
                page_path: window.location.pathname
              });`,

            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
