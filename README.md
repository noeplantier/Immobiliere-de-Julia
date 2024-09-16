<<<<<<< HEAD
# Immobiliere-de-Julia
=======
# Installation du projet

#

#

## Utiliser un React Modele Vite

modèle/template de projet React
[`repos`](https://github.com/O-clock-Onigiri/React-modele-vite)

#

### Objectif

l'idée est de se _baser sur_ le modèle et de le faire tourner dans notre projet.
Nous pouvons nous baser sur lui pour :

- démarrer notre **projet** avec un environnement fiable et configuré

#

#

### Utilisation:

Il s'agit essentiellement de copier/coller les parties intéressantes
du modèle dans le dossier du projet, sans écraser d'éventuels fichiers spécifiques.

Pour ce faire :

### 1. lancer le script

./React-modele-vite/bin/install.sh

#

### 2. cloner le repo

renseigner l'adresse SSH du dépôt Git de notre projet

#

#

### Pour info : Principaux outils

- [Vite](https://vitejs.dev/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [React](https://react.dev/)

### - Vite est un _bundler_ (_Task Runner_ ou _Builder_)

c'est un automatiseur de tâches :

- transpilation JS par Babel
- conversion Sass vers CSS
- optimisation du _build_

En mode développement, il s'appuie sur [esbuild](https://esbuild.github.io/) ;
tandis qu'il utilise [Rollup](https://rollupjs.org/) pour la production.

> [En savoir plus](https://vitejs.dev/guide/why.html)

-- Javascript compiler

Pour transpiler du code ES2015+/JSX vers du JS ES5, Vite utilise
[Babel](https://babeljs.io/).

Appelé par le plugin `@vitejs/plugin-react`.

> Il est possible d'utiliser [SWC](https://swc.rs/) à la place
> grâce au plugin `@vitejs/plugin-react-swc`

-- Linter

- [`eslint`](https://github.com/eslint/eslint) - ESLint, linter / analyseur de code JS.

- [`eslint-config-airbnb`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) - Configuration Airbnb pour ESLint.

- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) - Évite les éventuels conflits avec Prettier
  (le formateur de code).

- Plugins :
  - [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) - Considère Prettier comme une règle ESLint.
  - [`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import) - Analyse les imports de fichiers.
  - [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) - Analyse le code React.
  - [`eslint-plugin-react-hooks`](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks) - Analyse les hooks de React.
  - [`eslint-plugin-jsx-a11y`](https://github.com/evcohen/eslint-plugin-jsx-a11y) - Analyse l'accessibilité du JSX.

-- Formateur de code

- [`prettier`](https://prettier.io/)

#

#

## Les scripts avec pnpm

#

```bash
-`dev` : lance le serveur de développement
- `build` : lance la construction de la version de production
- `preview` : permet de lancer un serveur pour visualiser le code après un _build_
- `lint` : lance ESLint
  - `lint:fix` : corrige les erreurs _auto-fixables_
```

#

#

#

### 3. installer pnpm

```bash
npm install  pnpm
```

#

### 4. installer les dépendances

```bash
pnpm i
```

#

### 5. installer react et react-dom

```bash
pnpm i react react-dom
```

#

### 6. installer react-modal

```bash
pnpm i react-modal
```

#

### 7. installer la librairie MUI

```bash
pnpm install @mui/material @emotion/react @emotion/styled
```

#

#

### Build du projet

#

Le mode d'utilisation par défaut consiste à lancer un serveur de développement
avec la commande `pnpm dev`.  
Dans ce cas tout est géré en mémoire :
on ne voit jamais le résultat concret du travail de Vite.

Vite peut toutefois produire une version concrète du projet
dans un dossier `dist/` avec la commande `pnpm build`.

`build` permet de construire le projet pour la **production**
(version prête pour hébergement).

- assemblage des fichiers
- copie de fichiers
- nettoyage du code
- minification du code
- …
>>>>>>> 66539834 (Template paste)
