function Skills({ skillList }) {
  return (
    <section id="skills" className="skills">
      <div className="skills-card">
        <h2>Skills & Interests</h2>
        <p className="skills-intro">
          I’m always learning new tools and keeping my skill set practical,
          modern, and useful for real-world projects.
        </p>

        <ul className="skills-list">
          {skillList.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;