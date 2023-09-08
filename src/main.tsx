import React from 'react';
import App from './app/app';
import { createRoot } from 'react-dom/client';

const getOrCreateRootElement = (Id: string) => {
  const result = document.getElementById(Id);

  if (result) {
    return result;
  }

  const div = document.createElement("div");
  div.id = Id;

  document.body.appendChild(div);

  return div;
}

const rootElement = getOrCreateRootElement("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);