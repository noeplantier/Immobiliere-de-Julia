import React from 'react';
import './index.scss';

const generateRandomUser = (id: number) => {
  const randomName = () => {
    const names = [
      'Dupont',
      'Durand',
      'Moreau',
      'Lefèvre',
      'Roux',
      'Juano',
      'Lescar',
      'Ideole',
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const randomFirstName = () => {
    const firstNames = [
      'Alice',
      'Bob',
      'Charlie',
      'David',
      'Eva',
      'Max',
      'Christina',
    ];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  };

  const randomLocation = () => {
    const streets = [
      'rue de la Paix',
      'avenue de la République',
      'boulevard Saint-Germain',
      'place de la Concorde',
      'rue du Faubourg Saint-Honoré',
    ];
    const number = Math.floor(Math.random() * 100) + 1;
    return `${number} ${streets[Math.floor(Math.random() * streets.length)]}, Paris`;
  };

  const randomDescription = () => {
    const descriptions = [
      'Passionné de technologie et de voyages.',
      'Amateur de musique classique et de littérature.',
      'Adepte de randonnée et de photographie.',
      'Fan de cinéma et de jeux vidéo.',
      'Gourmet et amateur de cuisine française.',
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  // Replace this with a better service or a collection of avatar images
  const avatarUrls = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
    'https://randomuser.me/api/portraits/men/7.jpg',
    'https://randomuser.me/api/portraits/women/8.jpg',
    'https://randomuser.me/api/portraits/men/9.jpg',
  ];

  return {
    id,
    name: randomName(),
    firstname: randomFirstName(),
    email: `utilisateur${id}@oparty.com`,
    phone: `+33 6 12 34 56 ${String(id).padStart(2, '0')}`,
    location: randomLocation(),
    description: randomDescription(),
    avatar: avatarUrls[id % avatarUrls.length],
  };
};

const users = Array.from({ length: 9 }, (_, i) => generateRandomUser(i + 1));

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <h2 className="contacts-title">Contacts</h2>
      <ul className="contacts-list">
        {users.map((user) => (
          <li key={user.id} className="contact-item">
            <img src={user.avatar} alt={`${user.name} ${user.firstname}`} />
            <h2>
              {user.firstname} {user.name}
            </h2>
            <p>
              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            <p>
              Téléphone: <a href={`tel:${user.phone}`}>{user.phone}</a>
            </p>
            <p>Adresse: {user.location}</p>
            <p>{user.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
