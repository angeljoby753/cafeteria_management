import "./Home.css";
import Navbar from "../components/Navbar";

// Assets
import burger from "../assets/burger.jpg";
import pizza from "../assets/pizza.jpg";
import icecream from "../assets/icecream.jpg";
import candies from "../assets/candies.jpg";
import cafestryImg from "../assets/cafestry.jpg";

const Home = () => {
  return (
    <div className="home">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>Welcome to Caffino</h1>
        <p>Fresh coffee, tasty food & cozy moments</p>
      </section>

      {/* ================= FEATURED WORKS ================= */}
<section className="featured">
  <div className="featured-layout">

    {/* RIGHT SIDE HEADING */}
    <div className="featured-heading">
      <span>Featured</span>
      <span>Experiences</span>
    </div>

    {/* LEFT IMAGE GRID */}
    <div className="featured-editorial">
      <div className="editorial-card tall">
        <img src={burger} alt="Menu" />
        <div className="editorial-overlay">
          <span className="editorial-tag">Taste</span>
          <p>Handcrafted dishes made with love & premium ingredients</p>
        </div>
      </div>

      <div className="editorial-card">
        <img src={pizza} alt="Reservation" />
        <div className="editorial-overlay">
          <span className="editorial-tag">Reserve</span>
          <p>Your perfect table, waiting just for you</p>
        </div>
      </div>

      <div className="editorial-card">
        <img src={icecream} alt="Moments" />
        <div className="editorial-overlay">
          <span className="editorial-tag">Moments</span>
          <p>Captured memories from our café space</p>
        </div>
      </div>

      <div className="editorial-card wide">
        <img src={candies} alt="Explore" />
        <div className="editorial-overlay">
          <span className="editorial-tag">Explore</span>
          <p>Take a piece of Caffino home with you</p>
        </div>
      </div>
    </div>

  </div>
</section>



      {/* ================= OUR STORY ================= */}
      <section className="story">
        <div className="story-container">
          <div className="story-image">
            <img src={cafestryImg} alt="Our Story" />
            <div className="story-badge">Since 2020</div>
          </div>

          <div className="story-content">
            <span className="story-label">OUR STORY</span>
            <h2>Crafted with Passion</h2>

            <div className="story-text">
              <p>
                At Caffino, every cup of coffee and every bite is crafted with
                passion, tradition, and the finest ingredients.
              </p>
              <p>
                What began as a simple idea became a place where people meet,
                relax, and create unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKING STRIP ================= */}
      <section className="booking-strip">
        <p className="booking-label">BOOK BY PHONE NOW:</p>
        <p className="booking-number">8248098669</p>

        <div className="booking-hours">
          <div>
            <p>
              <strong>Mon–Fri</strong> 7am – 11am <span>(breakfast)</span>
            </p>
            <p>
              <strong>Mon–Fri</strong> 11am – 3pm <span>(lunch)</span>
            </p>
            <p>
              <strong>Mon–Fri</strong> 3pm – 8pm <span>(snack)</span>
            </p>
          </div>

          <div>
            <p>
              <strong>Sat</strong> 8am – 12pm <span>(breakfast)</span>
            </p>
            <p>
              <strong>Sat</strong> 12pm – 3pm <span>(lunch)</span>
            </p>
            <p>
              <strong>Sat</strong> 3pm – 8pm <span>(snack)</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
