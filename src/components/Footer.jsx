// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
      <p>© {new Date().getFullYear()} Lecteur Vocal. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
