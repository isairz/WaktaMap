import React from 'react';
import { MapList, Map, TilePallet } from 'containers/Map';

const Main = () => {
  return (
    <div className="main">
      {/* <MapList /> */}
      <Map />
      <TilePallet />
    </div>
  );
}

export default Main;