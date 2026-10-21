function Header({ name }) {
  return (
    <section id="home" className="homee">
      <div className="hero-card">
        <p className="eyebrow">Aspiring Data Analyst • Web Developer</p>
        <h1>{name}</h1>
        <p>
          I enjoy building thoughtful digital experiences and turning ideas into
          meaningful solutions. My interests span web development, data analytics,
          and machine learning.
        </p>

        <div className="badges">
          <span className="badge">Data Analytics</span>
          <span className="badge">Machine Learning</span>
          <span className="badge">Web Development</span>
        </div>

        <div className="hero-actions">
          <a href="#about" className="btn">
            Know More
          </a>
          <a href="#skills" className="btn-secondary">
            View Skills
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;