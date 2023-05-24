import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="shortcut icon" href="static/favicon.png" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
}
