import React from 'react';

const About = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Pourquoi avons-nous créé Lecteur Vocal ?</h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Dans un monde où l'information est partout, beaucoup de personnes ne trouvent pas le temps de lire, ou simplement ne le veulent pas. 
          Que ce soit par manque de motivation, de temps, ou à cause de la fatigue visuelle, la lecture est souvent négligée.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          <span className="font-semibold text-blue-600">Lecteur Vocal</span> est né de ce constat. 
          Nous avons voulu offrir un outil simple, accessible et rapide pour que chacun puisse écouter ses textes à voix haute, que ce soit pour apprendre, se divertir, ou gagner du temps.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          C’est une façon moderne de consommer le texte — avec vos oreilles !
        </p>
      </div>
    </section>
  );
};

export default About;
