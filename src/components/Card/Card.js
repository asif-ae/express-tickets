import { Button } from 'react-bootstrap';
import React from 'react';

const Card = (props) => {
  const {id, type, image, price} = props.data;
  return (
    <div className="col-md-6 col-lg-3 text-center">
      <div className="item single-card bg-light">
        <h3>{type}</h3>
          <img src={image} alt={type} className="card-image"/>
        <h5>${price}</h5>
        <Button className="btn-card">BUY NOW</Button>
      </div>
    </div>
  );
};

export default Card;