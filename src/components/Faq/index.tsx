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
  border: `3px solid ${theme.palette.divider}`,
  paddingLeft: '1rem',
  marginLeft: ' 15rem',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1rem' }} />}
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
    fontSize: '2rem', 
    fontFamily:'Times New Roman',

  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  fontSize: '2rem', 
  fontFamily:'Times New Roman',
}));

const QuestionContainer = styled('div')({
  backgroundColor: '#ffffff',
  padding: '2.5rem',
  borderRadius: '8px',
  margin: '2rem 2rem 0 2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily:'Times New Roman',

});

const TeamQuestionContainer = styled('div')({
  padding: '2.5rem',
  borderRadius: '8px',
  margin: '2rem 2rem 0 2rem',
  fontFamily:'Times New Roman',

});

const QuestionTitle = styled(Typography)({
  fontSize: '1.75rem', 
  marginBottom: '1rem',
  fontWeight: 'bold',
  fontFamily:'Times New Roman',

});

const Textarea = styled('textarea')({
  width: '100%',
  minHeight: '150px',
  borderRadius: '4px',
  fontSize: '1.1rem',
  resize: 'vertical',
  fontFamily:'Times New Roman',

});

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [userQuestion, setUserQuestion] = React.useState('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };



  return (
    <div className="container">
     <h1 className="biens-title">Questions les plus fréquentes</h1>


      <QuestionContainer >
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="white"
          >
            <Typography> Quels sont les avantages d'acheter un bien immobilier en Bretagne ? </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
            La Bretagne offre une qualité de vie exceptionnelle 
            avec ses paysages côtiers magnifiques, son patrimoine historique 
            riche et une proximité avec la mer. De plus, le marché immobilier
             reste relativement abordable par rapport à d'autres régions, avec 
             une variété de biens allant des maisons traditionnelles bretonnes 
             aux appartements modernes. C'est un excellent choix pour les familles,
              les investisseurs ou les amateurs de nature.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography> Quelles sont les étapes pour vendre un bien avec L'immobilière de Julia ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
            Pour vendre un bien avec nous, il suffit de nous contacter pour une estimation gratuite. Ensuite, nous nous occupons de toutes les démarches : mise en valeur du bien, publication des annonces, organisation des visites, négociation et gestion administrative jusqu'à la signature de l'acte de vente. Notre équipe s'assure que votre bien bénéficie de la meilleure visibilité et des meilleurs conseils pour une vente rapide et au juste prix.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="black"
          >
            <Typography> Proposez-vous des services pour les investisseurs immobiliers en Bretagne ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
            Oui, L'immobilière de Julia propose un accompagnement sur mesure pour les investisseurs. Nous offrons une expertise locale pour vous aider à identifier les opportunités rentables, qu'il s'agisse de résidences secondaires, d'investissements locatifs ou de projets de rénovation. Nous vous aidons à maximiser la valeur de votre investissement en tenant compte des spécificités du marché breton.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            color="white"
          >
            <Typography>Quels types de biens proposez-vous à la vente ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
            Nous proposons une large gamme de biens immobiliers en Bretagne, allant des maisons de campagne, des propriétés en bord de mer, aux appartements en centre-ville. Que vous cherchiez une résidence principale, une maison de vacances ou un bien pour investissement locatif, nous avons des options pour tous les budgets et styles de vie.
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
            Comment puis-je organiser une visite d'un bien que j'ai vu sur votre site ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ textAlign: 'left' }}>
            Vous pouvez facilement organiser une visite en nous contactant directement via le formulaire en ligne, par téléphone ou par e-mail. Notre équipe se chargera de vous proposer des créneaux qui correspondent à votre emploi du temps et vous fournira toutes les informations nécessaires pour une visite personnalisée et sans engagement.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </QuestionContainer>
    </div>
  );
}
