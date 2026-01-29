import "./About.css";

import Navbar from "../components/Navbar";
import cafestryImg from "../assets/cafestry.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: "☕",
      title: "Quality",
      description:
        "We source the finest ingredients from trusted suppliers to ensure every dish and drink is exceptional.",
    },
    {
      icon: "❤️",
      title: "Passion",
      description:
        "Our team pours heart and soul into every creation, making each visit memorable.",
    },
    {
      icon: "🤝",
      title: "Community",
      description:
        "We believe in building lasting relationships with our customers and the local community.",
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description:
        "We're committed to eco-friendly practices and supporting sustainable sourcing.",
    },
  ];

  return (
    <div className="about">
      <Navbar />

      {/* Decorative Leaves */}
      <div className="leaf leaf-left-top">🌿</div>
      <div className="leaf leaf-left-bottom">🌿</div>
      <div className="leaf leaf-right-top">🌿</div>
      <div className="leaf leaf-right-bottom">🌿</div>

      {/* Hero Section */}
      <section className="about-hero">
        <h1>Oh hey there!</h1>
        <p>Welcome to Caffino — where great coffee meets amazing food</p>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-wrapper">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              I'm Chef Marco, and I started Caffino back in 2020 as a dream to
              create a welcoming space where people could gather, relax, and
              enjoy exceptional food and coffee.
            </p>
            <p>
              What began as a small idea has grown into a beloved destination for
              food enthusiasts and coffee lovers.
            </p>
            <p>
              Whether you're here for your morning espresso or a special moment
              with loved ones, Caffino is your space.
            </p>
          </div>

          <div className="story-image">
            <img src={cafestryImg} alt="Caffino cafe" />
            <p className="image-caption">
              Caffino, where passion meets coffee ☕
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>What We're All About</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Curious About Us?</h2>
        <div className="faq-content">
          <div className="faq-item">
            <h3>What makes us special?</h3>
            <p>
              We're obsessed with quality — from beans to baked goods, every
              detail matters.
            </p>
          </div>
          <div className="faq-item">
            <h3>Do you use local ingredients?</h3>
            <p>
              Yes! We partner with local farmers and suppliers whenever possible.
            </p>
          </div>
          <div className="faq-item">
            <h3>Can we host events?</h3>
            <p>
              Absolutely! Contact us to plan your special occasion at Caffino.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      {/* Footer Navigation */}
<section className="nav-footer">
  <div className="nav-footer-content">
    <button
      className="nav-btn prev"
      onClick={() => navigate("/home")}
    >
      ← Back to Home
    </button>

    

    <button
      className="nav-btn next"
      onClick={() => navigate("/specialities")}
    >
      Explore Specialities →
    </button>
  </div>
</section>

    </div>
  );
};

export default About;
