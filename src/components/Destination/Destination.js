import React from 'react';

const Destination = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 my-3">
          <div className="choose-destination bg-light p-3 rounded">
            <div class="mb-3">
              <small>Pick From</small>
              <input class="form-control" type="text" placeholder="Dhaka"/>
            </div>
            <div class="mb-0">
              <small>Pick To</small>
              <input class="form-control" type="text" placeholder="Syhlet"/>
            </div>
          </div>

          <div className="ticket-price bg-light p-3 rounded"></div>
        </div>
        <div className="col-md-8"></div>
      </div>
    </div>
  );
};

export default Destination;