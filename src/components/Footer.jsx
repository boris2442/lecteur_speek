// src/components/Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-10 shadow-inner">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm space-y-1">
                <p>
                    © {new Date().getFullYear()} <span className="font-semibold text-blue-600">Lecteur Vocal</span>. Tous droits réservés.
                </p>
                <p className="text-gray-400">
                    Propulsé avec 💻 par <span className="text-blue-500 font-medium"> <a href="https://wa.me/679135177">Aubin Boris Simo</a></span>
                </p>
            </div>
        </footer>


    );
};

export default Footer;
