const Header = ({ title, subtitle, backgroundImage }) => {
  return (
    <header 
      className="page-header"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
};

export default Header;