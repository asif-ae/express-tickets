import React, { useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Card from '../Card/Card';

const Home = () => {
  return (
    <div className="background">
      <div className="background-opacity d-flex align-items-center">
        <div className="container">
          <div className="row">
            {
              fakeData.map(data => <Card data={data} key={data.id}></Card>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;