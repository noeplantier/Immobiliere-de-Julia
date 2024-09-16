/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import default_event_img from '../../assets/istockphoto-672381438-170667a.jpg';
import type { Event } from '../../@types';
import './index.scss';
import EventDetails from '../../pages/EventDetails';

type EventCardProps = {
  event: Event;
};
function EventCard({ event }: EventCardProps) {
  function convertMeterToKilometer(event) {
    const kilometer = event.distance / 1000;
    return `${Number(Math.floor(kilometer).toFixed(2))}km`;
  }
  return (
    <div className="event-card-container">
      <article className="event-card" style={{ borderRadius: '12px' }}>
        <div
          className="head"
          style={{
            backgroundImage: `url(${event.picture ? event.picture : default_event_img})`,
          }}
        >
          <h2 className="event-title">{event.title}</h2>
        </div>
        <div className="event-details">
          {event?.distance ? <p>{convertMeterToKilometer(event)}</p> : null}

          <p>{event.address}</p>
          <div className="description">
            <p>{event.description}</p>
          </div>
          <div className="details_btn_container">
            <div className="details">
              <p>
                <em>Date de début:</em>
                <br />
                {event.start_date}
              </p>
              <p>
                <em>Heure de début:</em>
                <br /> {event.start_hour}
              </p>
              <p>
                <em>Date de fin:</em>
                <br /> {event.finish_date}
              </p>
            </div>
            <Button size="small" variant="contained" className="more-details">
              <Link to={`/event/${event.id}`} className="link">
                Plus de details
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default EventCard;
