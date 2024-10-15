import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Developer Bio Section */}
        <div className="col-md-8">
          <h1>About the Developer</h1>
          <p>
            Hello! I'm Alex Wang, a passionate full-stack developer with coding experience in real-world environments.
            I specialize in JavaScript, but I'm also proficient in Python, Scheme, and object oriented languages
            like Java. I love creating efficient programmatic solutions for everyday tasks.
          </p>
          <p>
            When I'm not coding, I spend time volunteering on campus, working out, and watching horror movies.
            I also like reading, cooking, and listening to new music.
          </p>
          <p>
            Let's collaborate on exciting projects or chat about the latest trends in technology and web development!
          </p>
        </div>

        {/* Profile Image Section */}
        <div className="col-md-4 text-center">
          <img 
            src="images/IMG_2.jpg" 
            alt="Developer Profile" 
            className="img-fluid rounded-circle mb-3" 
          />
          <h4>Alex Wang</h4>
          <p>Developer</p>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="mt-5">
        <h3>Technologies I Work With</h3>
        <div className="row text-center align-items-center">
          <div className="col-md-3">
            <img src="images/js-logo.png" alt="JavaScript Logo" className="img-fluid" />
          </div>
          <div className="col-md-3">
            <img src="images/react-logo.png" alt="React Logo" className="img-fluid" />
          </div>
          <div className="col-md-3">
            <img src="images/node-logo.png" alt="Node.js Logo" className="img-fluid" />
          </div>
          <div className="col-md-3">
            <img src="images/mongodb-logo.png" alt="MongoDB Logo" className="img-fluid" />
          </div>
          <div className="col-md-3">
            <p>JavaScript</p>
          </div>
          <div className="col-md-3">
            <p>React</p>
          </div>
          <div className="col-md-3">
            <p>Node.js</p>
          </div>
          <div className="col-md-3">
            <p>MongoDB</p>
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="mt-5">
        <h3>Resume</h3>
        <p>
          Interested in seeing my full experience and projects? Download my resume below:
        </p>
        <a href="images/WangAlexResume.pdf" className="btn btn-secondary" download>Download Resume</a>
      </div>
    </div>
  );
};

export default Home;

