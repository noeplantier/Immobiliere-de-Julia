import { createContext } from 'react';
import type { Event } from '../@types';

const GlobalContext = createContext({
  isConnexionModalOpen: false,
  setIsConnexionModalOpen: (value: boolean) => {},
  isRegisterModalOpen: false,
  setIsRegisterModalOpen: (value: boolean) => {},
  user: {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    address: '123 Main St',
    city: 'New York',
    email: '2bJpM@example.com',
    events: [] as Event[],
    password: 'password',
    about: 'I am an amazing user',
    birth_date: '01/01/2000',
    profile_picture: 'https://i.pravatar.cc/300',
    token: '',
  },
  setUser: (value: any) => {},
});
export default GlobalContext;
