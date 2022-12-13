import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
  <div className="container">
    <div className="jumbotron mt-5">
      <h1 className="display-4">Bienvenue sur mon Blog!</h1>
      <p className="lead">
        Je m&apos;appelle Adnene et j&apos;écris toutes sortes de choses à propos de mon parcours de
        développeur et de mes opinions en général
      </p>

      <hr className="my-4" />

      <div className="blog-section">
        <p>lire les publications ?</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/blog" role="button">
            Aller vers le Blog
          </Link>
        </p>
      </div>

      <div className="description-project">
        <p>
          J&apos;ai construit ce blog avec Django, React et Bootstrap. Vous pouvez trouver la
          description de ce projet sur mon site web portfolio :
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="https://owling-dev.vercel.app/"
            target="_blank"
            rel="noreferrer"
            role="button"
          >
            Owling-dev
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default home;
