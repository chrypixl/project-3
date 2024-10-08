import Tipjar from '../Tipjar';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Tipjar />
      </div>

      <div style={{ flex: 1, textAlign: 'center' }} className="container mb-5">
        <h4>
          Made for the{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          of sick beats.
        </h4>
      </div>
      <div style={{ flex: 1 }}></div>
    </footer>
  );
};

export default Footer;
