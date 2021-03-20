import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import ticket1 from "../../fakeData/1.json";
import ticket2 from "../../fakeData/2.json";
import ticket3 from "../../fakeData/3.json";
import ticket4 from "../../fakeData/4.json";
import ticket from '../../images/ticket.png';
import '../../mapbox-gl.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

let url;

const Destination = () => {
  const { ticketId } = useParams();
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
  const {id, image, price, type} = url[0];
  console.log(id, image, price, type);

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

  const [isConfirm, setIsConfirm] = useState(false);
  const [value, onChange] = useState(new Date(Date()));

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 my-3">
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

          {
            isConfirm && (
              <div className="ticket-price p-3 rounded">
                <div className="choosed-destination mb-3 px-3 py-2 text-white">
                  <ul className="right-destination m-0">
                    <li className="from-destination">Dhaka</li>
                    <li className="to-destination">Syhlet</li>
                  </ul>
                </div>
                {priceDiv()}
                {priceDiv()}
                {priceDiv()}
              </div>
            )
          }
        </div>
        <div className="col-md-8">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <div id="map">
            <MapContainer
              center={[ 23.81065, 90.41171 ]}
              zoom={10}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://api.mapbox.com/styles/v1/asiftushar/ckmhpynub35bd17oiavujm19a/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXNpZnR1c2hhciIsImEiOiJja21ob2swanUwNTc0MnBvNzdpaGlodWxoIn0.JLzTBTDXx7du465cImbCug"
                attribution="&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
              />
              <Marker position={[ 23.81065, 90.41171 ]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;