import ReactDOMClient from 'react-dom/client';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';
import { PageShell } from './PageShell';

export const clientRouting = true;

let root: ReactDOMClient.Root;
export const render = async (pageContext: PageContextBuiltInClient) => {
  const { Page, isHydration } = pageContext;

  const container = document.getElementById('root')!;
  const element = (
    <PageShell>
        <Page />
    </PageShell>
  );

  if (isHydration) {
    root = ReactDOMClient.hydrateRoot(container, element);
  } else {
    root ??= ReactDOMClient.createRoot(container);
    root.render(element);
  }
};
