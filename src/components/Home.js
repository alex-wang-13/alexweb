import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Developer Bio Section */}
        <div className="col-md-9">
          <h1>About the Dev</h1>
          <p>
            Hello! I'm Alex Wang, a passionate full-stack developer from New Orleans with real-world coding experience.
            I specialize in JavaScript, but I'm also proficient in Python, Scheme, and object oriented languages
            like Java. I love creating efficient programmatic solutions for everyday tasks.
          </p>
          <p>
            When I'm not coding, I spend time volunteering on campus, working out, and watching horror movies.
            I also like reading, cooking, and listening to new music.
          </p>
          <p>
            Let's collaborate on exciting projects or chat about the latest trends in technology and web development!
            Reach out at <a href="mailto:walex11303@gmail.com" className="text-muted">walex11303@gmail.com</a>.
          </p>
        </div>

        {/* Profile Image Section */}
        <div className="col-md-3 text-center">
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
            <img src="images/js-logo.png" alt="JavaScript Logo" className="img-fluid rounded img-thumbnail" style={{ width: "150px", height: "150px" }} />
            <p>JavaScript</p>
          </div>
          <div className="col-md-3">
            <img src="images/react-logo.png" alt="React Logo" className="img-fluid rounded img-thumbnail" style={{ width: "150px", height: "150px" }} />
            <p>React</p>
          </div>
          <div className="col-md-3">
            <img src="images/node-logo.png" alt="Node.js Logo" className="img-fluid rounded img-thumbnail" style={{ width: "150px", height: "150px" }} />
            <p>Node.js</p>
          </div>
          <div className="col-md-3">
            <img src="images/mongodb-logo.png" alt="MongoDB Logo" className="img-fluid rounded img-thumbnail" style={{ width: "150px", height: "150px" }} />
            <p>MongoDB</p>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-5">
        <h2>Projects & Experience</h2>

        <div className="project">
          <p>
            <span className="fw-bold">University Budget Sheet Bot.</span> Developed a financial bot that automates budget tracking for the Finance Committee, updating revenue
            and purchase data in real time. The bot's security features adapt user access based on roles, ensuring
            data protection for sensitive information.
          </p>
        </div>

        <div className="project">
          <p>
            <span className="fw-bold">Scheme Language Interpreter.</span> Built a Scheme-like interpreter capable of handling complex language structures, including recursive
            functions and exception management. Leveraged tail call optimization and rigorous testing to ensure
            consistent handling of parameter mismatches and function closures.
          </p>
        </div>

        <div className="project">
          <p>
            <span className="fw-bold">Eight Puzzle Solver.</span> Created a GUI-based puzzle solver using Pygame, implementing the A* algorithm to find optimal solutions
            quickly. Enhanced the user experience with intuitive controls and a heuristic approach, which reduced
            search times and improved interaction.
          </p>
        </div>

        <div className="experience">
          <p>
            <span className="fw-bold">Generative AI Externship at Cognizant.</span> Conducted accuracy comparisons across convolutional neural networks and presented findings to peers and
            mentors. Applied efficient fine-tuning techniques to improve model performance with minimal resources,
            contributing to advancements in generative AI.
          </p>
        </div>

        <div className="experience">
          <p>
            <span className="fw-bold">Algorithms Teaching Assistant.</span> Provided academic support for algorithms students, including mock interviews and one-on-one tutoring,
            boosting average exam scores by 15%. Organized review sessions that clarified core concepts and improved
            students' problem-solving skills.
          </p>
        </div>

        <div className="experience">
          <p>
            <span className="fw-bold">Intro to Programming Teaching Assistant.</span> Tutored students weekly on programming fundamentals, leading to a 20% increase in exam scores. Created
            effective quizzes and projects focused on algorithm design and signal processing, promoting deeper
            understanding.
          </p>
        </div>

        <div className="leadership">
          <p>
            <span className="fw-bold">Finance Co-Chair, University Program Board.</span> Implemented bulk purchasing strategies that reduced annual costs by 20%, managing a budget of over
            $435,000 across various university programs. Developed new budgeting systems to optimize future fund
            allocations.
          </p>
        </div>

        <div className="leadership">
          <p>
            <span className="fw-bold">Secretary, Society of Industrial & Applied Mathematics.</span> Coordinated monthly chapter meetings and tutorials for students on tech topics like Python and MATLAB.
            Compiled a newsletter highlighting research conferences and free journal access, engaging a broader
            student audience.
          </p>
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

      {/* Links */}
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 mx-5 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-muted">© 2024</span>
        </div>

        <ul className="nav col-md-4 align-items-center justify-content-end list-unstyled d-flex">
          <li className="text-muted">
            <div>- follow me -</div>
            <div className="small">icons by icons8</div>
          </li>
          <li className="ms-3"><a className="text-muted" href="https://github.com/alex-wang-13"><img alt="Github Logo" src="images/icons8-github-48.png" /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://www.linkedin.com/in/alex-11303-wang"><img alt="Linkedin Logo" src="images/icons8-linkedin-48.png" /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://letterboxd.com/alexthedawg"><img alt="Letterboxd Logo" src="images/icons8-letterboxd-48.png" /></a></li>
          <li className="ms-3"><a className="text-muted" href="https://www.goodreads.com/user/show/57369610-alex"><img alt="Goodreads Logo" src="images/icons8-goodreads-48.png" /></a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;

