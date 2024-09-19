import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import './index.scss';
import Splitter from '../Splitter';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: '0 2rem 0 2rem',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.5rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(2),
    fontSize: '1.25rem', // Agrandir le texte des titres d'accordéon
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  fontSize: '1.1rem', // Agrandir le texte des détails
}));

const QuestionContainer = styled('div')({
  backgroundColor: '#ffffff',
  padding: '2.5rem',
  borderRadius: '8px',
  margin: '2rem 2rem 0 2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const TeamQuestionContainer = styled('div')({
  backgroundColor: '#ffffff',
  padding: '2.5rem',
  borderRadius: '8px',
  margin: '2rem 2rem 0 2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const QuestionTitle = styled(Typography)({
  fontSize: '1.75rem', // Agrandir le texte du titre
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const Textarea = styled('textarea')({
  width: '100%',
  minHeight: '150px',
  padding: '1.25rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1.1rem',
  resize: 'vertical',
});

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [userQuestion, setUserQuestion] = React.useState('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleQuestionSubmit = () => {
    const teamMembers = [
      'Noé Plantier',
      'Julie Gondard',
      'Florent Desallangre',
      'Justine Bouetard',
      'Développeur Mystère',
      'Kilian Plusquellec',
    ];

    // Choisir un membre de l'équipe au hasard
    const randomMember =
      teamMembers[Math.floor(Math.random() * teamMembers.length)];

    // Envoyer la question à l'utilisateur sélectionné
    alert(`Votre question a été envoyée à ${randomMember}.`);

    setUserQuestion('');
  };

  return (
    <div className="container">
      <h2 className="faq-title">Vos questions, nos réponses..</h2>

      <QuestionContainer           fontFamily={'Times New Roman'}
>
        <QuestionTitle fontFamily={'Times New Roman'}>Posez votre question à l'équipe O'Party</QuestionTitle>
        <Textarea
          placeholder="Écrivez votre question ici..."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <Button
          size="large" 
          variant="contained"
          className="question-submit"
          onClick={handleQuestionSubmit}
        >
          Cliquez ici 
        </Button>
      </QuestionContainer>
      <Splitter />
      <h2 className="faq-title">Questions les plus fréquentes</h2>

      <QuestionContainer >
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            fontFamily={'Times New Roman'}
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography>Qu’est-ce que O’Party ?</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
              O’Party est une application qui permet aux utilisateurs de
              participer à des soirées organisées par des hôtes et de rencontrer
              des gens partout en France. Que vous soyez à la recherche de
              nouvelles amitiés, de réseautage ou simplement amateurs de bons
              moments, O’Party vous connecte avec des événements locaux.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography>Comment puis-je participer à une soirée ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
              Vous pouvez participer à une soirée en vous inscrivant via
              l'application. Recherchez une soirée qui vous intéresse, puis
              cliquez sur le bouton d'inscription.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography>Comment puis-je organiser une soirée ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
              Pour organiser une soirée, créez un compte hôte sur O'Party, puis
              utilisez l'option 'Organiser une soirée' pour renseigner les
              détails de votre événement
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography>Est-ce que O'Party est gratuit ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
              L'inscription et la création de compte sur O'Party sont gratuites.
              Cependant, certaines soirées peuvent avoir des frais de
              participation déterminés par l'hôte.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography>
              Comment garantir la sécurité lors des soirées ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
              O'Party met en œuvre plusieurs mesures de sécurité, y compris la
              vérification des profils des utilisateurs et des hôtes, ainsi que
              des options de signalement en cas de comportement inapproprié.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </QuestionContainer>
    </div>
  );
}
