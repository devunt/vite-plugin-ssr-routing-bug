import { dangerouslySkipEscape, escapeInject, PageContextBuiltIn } from 'vite-plugin-ssr';
import ReactDOMServer from 'react-dom/server';
import { PageShell } from './PageShell';

export const render = async (pageContext: PageContextBuiltIn) => {
  const { Page } = pageContext;

  const element = (
    <PageShell>
        <Page />
    </PageShell>
  );

  const markup = ReactDOMServer.renderToString(element);

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>vite-plugin-ssr</title>
        <meta charset="utf-8" />
      </head>
      <body><div id="root">${dangerouslySkipEscape(markup)}</div></body>
    </html>`;
};
