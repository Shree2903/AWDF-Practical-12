function About({ name, highlights }) {
  const defaultHighlights = [
    "Creative problem solving",
    "Data-driven thinking",
    "Web development curiosity",
    "Continuous learning mindset"
  ];

  return (
    <section className="about" id="about">
      <div className="about-card">
        <div>
          <h2>About Me</h2>
          <p>
            Hello! I’m <strong>{name}</strong>, an Information Technology student
            who enjoys creating polished digital experiences and exploring the
            world of data-driven technology.
          </p>
          <p>
            I’m especially interested in blending creativity with technology,
            whether that means building modern user interfaces or uncovering
            insights through analysis and machine learning.
          </p>
        </div>

        <ul className="about-list">
          {(highlights || defaultHighlights).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;