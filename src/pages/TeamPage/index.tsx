import React from 'react';
import './index.scss';

const generateAvatar = (id: number) => `https://i.pravatar.cc/150?img=${id}`;

const teamMembers = [
  {
    id: 4,
    name: 'Noé Plantier',
    role: 'Développeur Fullstack Web & Mobile',
    bio: "Noé est un expert en développement fullstack spécialisé dans les applications web et mobiles. Avec plus de 10 ans d'expérience, il excelle dans la création de solutions robustes et performantes.",
  },
  {
    id: 2,
    name: 'Julie Gondard',
    role: 'Développeuse Front-end Mobile',
    bio: 'Julie est passionnée par le développement mobile, notamment en React Native. Elle adore créer des interfaces utilisateur intuitives et fluides pour les applications mobiles.',
  },
  {
    id: 3,
    name: 'Florent Desallangre',
    role: 'Développeur Back-end Web',
    bio: 'Florent est spécialisé dans le développement back-end pour les applications web. Il se concentre sur la création d’API robustes et scalables pour des applications modernes.',
  },
  {
    id: 1,
    name: 'Justine Bouetard',
    role: 'Développeuse Fullstack Mobile',
    bio: "Justine maîtrise l'art du développement fullstack mobile. Elle est experte en Flutter et React Native, et aime résoudre des problèmes complexes en créant des applications mobiles élégantes.",
  },
  {
    id: 5,
    name: 'Développeur Mystère',
    role: 'Développeur Fullstack Mobile',
    bio: "Le Dev Mystère possède d'excellentes aptitdes en développement fullstack mobile et maitrise l'IA à la perfection..",
  },
  {
    id: 6,
    name: 'Kilian Plusquellec',
    role: 'Développeur Fullstack Web & Mobile',
    bio: 'Kilian se spécialise dans la création de solutions fullstack qui couvrent à la fois le web et le mobile. Il aime intégrer les dernières technologies pour offrir des expériences utilisateur de qualité.',
  },
];

const TeamPage = () => {
  return (
    <div className="team-page">
      <h2 className="teampage-title">Notre équipe</h2>
      <ul className="team-list">
        {teamMembers.map((member) => (
          <li key={member.name} className="team-member">
            <img
              src={generateAvatar(member.id)}
              alt={`${member.name} avatar`}
              className="team-avatar"
            />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPage;
