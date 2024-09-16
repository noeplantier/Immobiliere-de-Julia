import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GlobalContext from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Tooltip,
} from '@mui/material';

import './index.scss';

import { Event } from '../../@types';
import accountServices from '../../_services/account.service';

function EventDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>();
  const [participantsCount, setParticipantsCount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(GlobalContext);
  const { id } = useParams<{ id: string }>();
  const fetchParticipants = async () => {
    const headers = {
      'Content-Type': 'application/json',
      METHODS: 'GET',
    };
    try {
      const response = await fetch(`${API_URL}event/${id}/participate/all`, {
        headers,
      });

      const data = await response.json();
      console.log(`participants:`, data);
      setParticipantsCount(data.length);
      const participantsInfo = data
        ?.filter((participant) => !participant.approval)
        .map((participant) => ({
          id: participant.id,
          firstName: participant.user.first_name,
          lastName: participant.user.last_name,
          email: participant.user.email,
          address: participant.user.address,
          approval: participant.approval,
          createdAt: participant.createdAt,
          updatedAt: participant.updatedAt,
        }));
      console.log(participantsInfo);
      setParticipants(participantsInfo);
      // setEvent(data);
    } catch (fetchError) {
      setError((fetchError as Error).message);
    }
  };
  console.log(`my id:`, user?.id);
  // const userId = 1;

  // const eventId = 1;

  // const userId = user.id;
  // const eventId = event?.id;
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));

    const fetchEventDetails = async () => {
      const headers = {
        'Content-Type': 'application/json',
        METHODS: 'GET',
      };
      try {
        const response = await fetch(`${API_URL}event/${id}`, {
          headers,
        });
        if (!response.ok) {
          throw new Error('réponse réseau incorrecte');
        }
        const data: Event = await response.json();
        console.log(`my event data:`, data);
        setEvent(data);
        console.log(`this event data:`, event);
        // console.log(event?.host.id, user.user.id);
      } catch (fetchError) {
        setError((fetchError as Error).message);
      }
    };

    fetchParticipants();
    fetchEventDetails();
  }, []);

  const handleParticipationSubmit = async () => {
    if (!event) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${sessionStorage.getItem('token')}`,
    };

    try {
      const response = await fetch(`${API_URL}event/${event.id}/participate`, {
        method: 'POST',
        headers,
      });
      if (response.status === 200 || response.status === 201) {
        alert('Participation soumise avec succès');
        console.log(response.status);
      } else {
        alert(
          'Soumission de votre participation impossible, vous avez peut-être deja envoyé votre participation'
        );
      }
    } catch (fetchError) {
      console.error(
        'Erreur lors de la soumission de la participation:',
        fetchError
      );
    }
  };

  const handleAcceptParticipation = async (participantId) => {
    if (!event) return;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${sessionStorage.getItem('token')}`,
    };
    try {
      const response = await fetch(`${API_URL}event/${id}/participate/accept`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ id: participantId }),
      });
      if (response.ok) {
        alert('Participation acceptée avec succès');
        fetchParticipants();
      } else {
        throw new Error("Échec de l'accès à la participation");
      }
    } catch (fetchError) {
      alert("Erreur lors de l'accès à la participation:", fetchError);
    }
  };

  const handleDelete = async () => {
    if (!event) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${sessionStorage.getItem('token')}`,
    };

    try {
      const response = await fetch(`${API_URL}event/${event.id}`, {
        method: 'DELETE',
        headers,
      });
      if (response.ok) {
        alert('Événement supprimé avec succès');
        setEvent(null);
        navigate('/');
      } else {
        throw new Error("Échec de la suppression de l'événement");
      }
    } catch (fetchError) {
      alert("Erreur lors de la suppression de l'événement:", fetchError);
    }
  };
  return (
    <Card
      className="event-details-card"
      sx={{
        height: '100%',
        marginTop: '0',
        marginBottom: '0',
      }}
    >
      <div className="event-details-header">
        <Typography variant="h5">{event?.title}</Typography>
        <Box
          className="event_image"
          sx={{
            background:
              'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
            borderRadius: '12px',
            padding: '0.1rem',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
            width: '80%',
            boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.7)',
          }}
        >
          <CardMedia
            className="event-img"
            component="img"
            image={event?.picture}
            alt="Event Image"
            sx={{
              width: '100%',

              height: '100%',

              objectFit: 'contain',

              borderRadius: '12px',
            }}
          />
        </Box>

        {participants?.length > 0 && event?.host.id === user?.id && (
          <div
            className="participants-container"
            style={{ border: '1px, solid, black' }}
          >
            <Typography variant="body1">Participants :</Typography>
            <ul style={{ padding: '0.5rem' }}>
              {participants?.map((participant) => (
                <li
                  key={participant?.id}
                  style={{
                    listStyle: 'none',
                    textAlign: 'right',
                    height: '2.5rem',
                    fontSize: '0.8rem',

                    gap: '0.5rem',
                  }}
                >
                  {participant?.firstName} {participant.lastName}
                  <Tooltip title="Valider la participation" arrow>
                    <button
                      className="accept"
                      type="button"
                      style={{
                        borderRadius: '50%',
                        marginLeft: '1rem',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: 'green',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
                      }}
                      onClick={() => handleAcceptParticipation(participant.id)}
                    >
                      V
                    </button>
                  </Tooltip>
                  <Tooltip title="Décliner la participation" arrow>
                    <button
                      className="accept"
                      type="button"
                      style={{
                        borderRadius: '50%',
                        marginLeft: '1rem',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      X
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CardContent
        sx={{ width: '70%', margin: '2rem auto', height: '40%' }}
        className="all-details"
      >
        <div className="detail-container">
          <Typography variant="h5">Informations</Typography>
          <div className="description-container">{event?.description}</div>
          <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid item xs={6}>
              <Typography fontWeight="bold" variant="body1">
                Date de début:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {' '}
                {event?.start_date}{' '}
              </Typography>

              <Typography fontWeight="bold" variant="body1">
                Heure de début:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.start_hour}
              </Typography>

              <Typography fontWeight="bold" variant="body1">
                Date de fin:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.finish_date}
              </Typography>

              <Typography fontWeight="bold" variant="body1">
                Adresse:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.address}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight="bold" variant="body1">
                Localisation:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.zip_code_city}
              </Typography>
              <Typography fontWeight="bold" variant="body1">
                Type de soirée:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.privacy_type ? 'Public' : 'Privé'}
              </Typography>
              <Typography fontWeight="bold" variant="body1">
                Statut:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.status ? 'En cours' : 'Termine'}
              </Typography>

              <Typography fontWeight="bold" variant="body1">
                Accessibilté:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {event?.pmr_access ? 'Oui' : 'Non'}
              </Typography>

              <Typography fontWeight="bold" variant="body1">
                Max Participants:
              </Typography>
              <Typography variant="caption" gutterBottom>
                {`${participantsCount} inscrit(s) / ${event?.max_attendee}`}
              </Typography>
            </Grid>
          </Grid>
        </div>

        {accountServices.isLogged() && (
          <div className="detail-btn">
            {event?.host.id === user?.id ? (
              <Button
                className="delete-btn"
                type="button"
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(39, 95, 142, 1)',
                  borderRadius: '0.5rem',
                  border: '0.1rem solid rgba(47, 69, 88, 1)',
                  '&:hover': {
                    background:
                      'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
                  },
                  '&:active': {
                    background:
                      'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
                  },
                  '&.gradient-background': {
                    background:
                      'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
                  },
                  color: 'white',

                  width: '50%',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
                }}
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            ) : (
              <Button
                className="submit-participation-btn"
                type="submit"
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(39, 95, 142, 1)',
                  borderRadius: '0.5rem',
                  border: '0.1rem solid rgba(47, 69, 88, 1)',
                  '&:hover': {
                    background:
                      'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
                  },
                  '&:active': {
                    background:
                      'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
                  },
                  '&.gradient-background': {
                    background:
                      'linear-gradient(101.21deg, #fdd700 1.65%, #f26a09 79.01%)',
                  },
                  color: 'white',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.35)',
                }}
                onClick={handleParticipationSubmit}
              >
                Participer
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EventDetails;
