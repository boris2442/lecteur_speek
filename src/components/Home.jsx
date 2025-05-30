const Home = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6">
        
        {/* Texte */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-blue-600">
            Bienvenue sur notre application !
          </h1>
          <p className="text-gray-700 text-lg">
            Cette application vous permet d'écouter n'importe quel texte grâce à la synthèse vocale. Entrez simplement un texte et laissez la magie opérer. Simple, rapide, et efficace !
          </p>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://source.unsplash.com/500x400/?technology,text"
            alt="Illustration"
            className="w-full h-auto rounded-xl shadow-md"
          />
        </div>

      </div>
    </div>
  );
};

export default Home;
