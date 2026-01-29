import "./Gallery.css";
import Navbar from "../components/Navbar";

// Correct imports (based on your files)
import cafeInterior from "../assets/cafeinterior.jpg";
import liveMusic from "../assets/music.jpg";
import foodImage from "../assets/galleryfood1.jpg";
import gallerybook from "../assets/gallerybook.jpg";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";

const Gallery = () => {
  return (
    <div className="gallery-page">
      <Navbar />

      {/* HERO */}
      <section className="gallery-hero">
        <span className="gallery-tag">OUR GALLERY</span>
        <h1>The Caffino Story</h1>
        <p>
          A place where food, music and people come together
        </p>
      </section>

      {/* CAFE INTERIOR */}
      <section className="gallery-row">
        <div className="gallery-image">
          <img src={cafeInterior} alt="Cafe Interior" />
        </div>
        <div className="gallery-text">
          <h2>Our Cafe Interior</h2>
          <p>
            Designed with warmth and comfort in mind, our café offers
            a relaxing atmosphere where conversations flow and moments
            are created.
          </p>
        </div>
      </section>

      {/* LIVE MUSIC */}
      <section className="gallery-row reverse">
        <div className="gallery-image">
          <img src={liveMusic} alt="Live Music" />
        </div>
        <div className="gallery-text">
          <h2>Live Music Nights</h2>
          <p>
            We host talented music bands and artists who turn
            evenings into unforgettable experiences.
          </p>
        </div>
      </section>

      {/* SIGNATURE FOOD */}
      <section className="gallery-row">
        <div className="gallery-image">
          <img src={foodImage} alt="Signature Food" />
        </div>
        <div className="gallery-text">
          <h2>Signature Dishes</h2>
          <p>
            Our top dishes are crafted using premium ingredients
            and perfected by our chefs to delight every palate.
          </p>
        </div>
      </section>
      {/* ================= READING & WORK SPACE ================= */}
<section className="gallery-feature">
  <div className="gallery-feature-row">
    
    {/* IMAGE */}
    <div className="gallery-feature-image">
      <img src={gallerybook} alt="Reading & Work Space at Caffino" />
    </div>

    {/* CONTENT */}
    <div className="gallery-feature-content">
      <span className="feature-tag">QUIET CORNER</span>
      <h2>A Space to Read, Think & Create</h2>

      <p>
        At Caffino, we believe great ideas need calm spaces.
        Our reading and work corner is designed for people who love
        books, creativity, and peaceful productivity.
      </p>

      <p>
        Whether you’re reading your favorite novel, working remotely,
        or journaling with a cup of coffee — this space is yours.
      </p>

      
    </div>

  </div>
</section>


      {/* TEAM */}
      <section className="gallery-team">
        <h2>Meet Our Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <img src={team1} alt="Team Member 1" />
            <h4>Head Chef</h4>
            <p>Passionate about flavors & creativity</p>
          </div>

          <div className="team-card">
            <img src={team2} alt="Team Member 2" />
            <h4>Lead Barista</h4>
            <p>Brewing happiness one cup at a time</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
