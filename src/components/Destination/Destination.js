import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import ticket1 from "../../fakeData/1.json";
import ticket2 from "../../fakeData/2.json";
import ticket3 from "../../fakeData/3.json";
import ticket4 from "../../fakeData/4.json";
import ticket from '../../images/ticket.png';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import MapDivision from '../MapDivision/MapDivision';


const Destination = () => {
  // Get URL parameters
  const { ticketId } = useParams();
  
  // The URL
  let url;
  // Setting JSON data URL(s)
  if (ticketId === "1") {
    url = ticket1;
  }
  if (ticketId === "2") {
    url = ticket2;
  }
  if (ticketId === "3") {
    url = ticket3;
  }
  if (ticketId === "4") {
    url = ticket4;
  }
  // Data destructuring from JSON data
  const {type} = url[0];

  // This function for ticket price division
  const priceDiv = () => {
    return (
      <div className="choose-ticket px-3 mb-3 py-2">
        <div className="d-flex align-items-center w-100">
          <img src={ticket} className="ticket-image pr-2" alt="Ticket"/>
          <div className="d-flex w-100 justify-content-between">
            <div className="part-1">Ticket-1</div>
            <div className="part-2 d-flex justify-content-end">$67</div>
          </div>
        </div>
      </div>
    )
  }

  // This state is define is the person clicked on confirm button or not
  const [isConfirm, setIsConfirm] = useState(false);

  // This state is for Calender
  const [value, onChange] = useState(new Date(Date()));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 my-3">

          {/* If the user just comming from home, The user will see this for choosing destination and date. */}
          {
            !isConfirm && (
              <div className="choose-destination bg-light p-3 rounded">
                <div className="mb-3">
                  <h3 className="to-uppercase">{type}</h3>
                </div>
                <div className="mb-3">
                  <small>Pick From</small>
                  <input className="form-control" type="text" placeholder="Dhaka"/>
                </div>
                <div className="mb-3">
                  <small>Pick To</small>
                  <input className="form-control" type="text" placeholder="Syhlet"/>
                </div>
                <small>Pick A Date</small>
                <Calendar
                  onChange={onChange}
                  value={value}
                />
                <div className="py-3"><input type="submit" value="Confirm Order" onClick={() => setIsConfirm(!isConfirm)} id="submit" className="btn btn-submit text-white rounded"/></div>
              </div>
            )
          }

          {/* When the user choosed destination point. Then this pice of code will be executed. */}
          {
            isConfirm && (
              <div className="ticket-price p-3 rounded">
                <div className="choosed-destination mb-3 px-3 py-2 text-white">
                  <ul className="right-destination m-0">
                    <li className="from-destination">Dhaka</li>
                    <li className="to-destination">Syhlet</li>
                  </ul>
                </div>

                {/* Ticket Price */}
                {priceDiv()}
                {priceDiv()}
                {priceDiv()}
                
              </div>
            )
          }
        </div>

        {/* The Map is here */}
        <div className="col-md-8">
          <MapDivision></MapDivision>
        </div>
      </div>
    </div>
  );
};

export default Destination;