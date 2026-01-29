import "./Contact.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <div className="contact">
      <Navbar />
      {/* Decorative Leaves */}
<div className="leaf leaf-left-top">🌿</div>
<div className="leaf leaf-left-bottom">🌿</div>
<div className="leaf leaf-right-top">🌿</div>
<div className="leaf leaf-right-bottom">🌿</div>


      {/* HEADER */}
      <section className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          We’d love to hear from you. Get in touch anytime.
        </p>
      </section>

      {/* CONTENT */}
      <section className="contact-content">
        {/* CONTACT INFO */}
        <div className="contact-info">
          <h2>Caffino Cafe</h2>

          <p>
            📍 901 East E Street, <br />
            Chicago, USA
          </p>

          <p>📞 +1 824 809 8669</p>
          <p>✉️ contact@caffino.com</p>

          <div className="contact-hours">
            <p><strong>Mon–Fri:</strong> 7am – 8pm</p>
            <p><strong>Sat:</strong> 8am – 4pm</p>
            <p><strong>Sun:</strong> Closed</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required />

          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
