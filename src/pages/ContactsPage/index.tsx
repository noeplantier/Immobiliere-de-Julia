import React from 'react';
import './index.scss';

const generateAvatar = (id: number) => `https://i.pravatar.cc/150?img=${id}`;

const teamMembers = [

  {
    id: 1,
    name: 'Julie Gondard',
    role: 'Développeuse Front-end Mobile',
    bio: 'Julie est passionnée par le développement mobile, notamment en React Native. Elle adore créer des interfaces utilisateur intuitives et fluides pour les applications mobiles.',
  },
  {
    id:2,
    name: 'Noé Plantier',
    role: 'Développeur Fullstack Web & Mobile',
    bio: "Noé est un expert en développement fullstack spécialisé dans les applications web et mobiles. Avec plus de 10 ans d'expérience, il excelle dans la création de solutions robustes et performantes.",
  },
  
];

const ContactsPage = () => {
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

export default ContactsPage;
