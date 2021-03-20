import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const {id, type, image, price} = props.data;
  return (
    <div className="col-md-6 col-lg-3 text-center">
      <div className="item single-card bg-light">
        <h3>{type}</h3>
          <img src={image} alt={type} className="card-image"/>
        <h5>${price}</h5>
        <Link to={`/destination/${id}`}><Button className="btn-card">BUY NOW</Button></Link>
      </div>
    </div>
  );
};

export default Card;