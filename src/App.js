import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { locale, defaultLang } from 'lib/utility';
import { Banner, Main } from 'page';
import './App.css';

function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

let flattedMessages = flattenMessages(locale[defaultLang()]['data']);

const App = () => {
  return (
    <BrowserRouter>
      <IntlProvider locale={defaultLang()} messages={flattedMessages} onError={() => { }}>
        <Banner />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Farming" element={<Main />} />
        </Routes>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;