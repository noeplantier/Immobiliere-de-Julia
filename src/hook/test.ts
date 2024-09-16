import { useEffect, useState } from 'react';
import axios from 'axios';

// const API_URL = 'https://projet-11-o-party-back.onrender.com';

/*
  Le `<T>` (_michelisable_) est un **type générique** en TypeScript.

  Il permet de spécifier un **type de données dynamique** lors de la déclaration
  de la fonction ; sa valeur exacte sera déterminée lors de l'appel de celle-ci.

  Ici, il est utilisé pour définir le type de la valeur initiale ainsi que
  que le type de données retournées.
  Ce type sera automatiquement déduit à l'exécution du _hook_.

  Utilisation :

  `const [posts, loadingPosts] = useAjaxData<IPost[]>('posts', []);`
    → `posts` sera forcément du type `IPost[]`

  `const [categories, loadingCategories] = useAjaxData<ICategory[]>('categories', []);`
    → `categories` sera forcément du type `ICategory[]`
*/
function useFetchData<T>(initialValue: T): [T, boolean] {
  const [profileData, setProfileData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const headers = {
          Authorization: `${sessionStorage.getItem('token')}`,
        };
        const response = await axios.get(`${API_URL}/user/me`, {
          headers,
        });
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return [profileData, loading];
}

export default useFetchData;
