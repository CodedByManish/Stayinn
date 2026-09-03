import React from "react";
import Icon from "../components/icons";
import { SearchBar, RoomCard, Reveal } from "../components/components";
import {
  PROPERTY,
  FACILITIES,
  HIGHLIGHTS,
  ROOMS,
  NEARBY,
  PROPERTY_RULES,
} from "../../data";

export default function Home() {
  const featured = ROOMS
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div
          className="hero-media"
          style={{
            backgroundImage: `url(${PROPERTY.hero.url})`,
            "--hero-img": `url(${PROPERTY.hero.url})`,
            "--hero-img-mobile": `url(${PROPERTY.hero.mobile})`,
          }}
          role="img"
          aria-label={PROPERTY.hero.alt}
        />

        <div className="hero-overlay" aria-hidden="true" />

        <div className="container hero-content">
          <span className="hero-eyebrow">
            <Icon name="star" />
            Rated {PROPERTY.rating} by {PROPERTY.reviewsCount.toLocaleString()}{" "}
            guests
          </span>

          <h1>A calm, comfortable stay, made effortless</h1>

          <p className="lead">
            {PROPERTY.tagline}. Clear pricing, flexible cancellation and rooms
            designed for a restful night.
          </p>

          <SearchBar />
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">Guest favourites</div>
                <h2>Featured rooms</h2>
                <p className="sub">
                  Our most-loved stays — picked by guests who keep coming back.
                </p>
              </div>

              <a href="#/rooms" className="btn btn-soft">
                <Icon name="arrowRight" /> View all rooms
              </a>
            </div>
          </Reveal>

          <div className="room-grid">
            {featured.map((room, i) => (
              <Reveal key={room.id} delay={i * 90}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <div>
                <div className="eyebrow">Amenities</div>
                <h2>Everything you need, under one roof</h2>
                <p className="sub center">
                  Comfort you can feel from the moment you arrive.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="feature-grid">
            {FACILITIES.map((facility, i) => (
              <Reveal key={facility.title} delay={i * 70}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Icon name={facility.icon} />
                  </div>
                  <h3>{facility.title}</h3>
                  <p>{facility.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">Why Stayinn</div>
                <h2>Highlights that make a difference</h2>
              </div>
            </div>
          </Reveal>

          <div className="highlight-grid">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="highlight-card">
                  <div className="feature-icon">
                    <Icon name="checkCircle" />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section section-alt" id="location">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">Find us</div>
                <h2>Getting around is effortless</h2>
                <p className="sub">
                  Stayinn sits in the heart of Siliguri, steps from stations,
                  markets and landmarks.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="map-grid">
            <Reveal>
              <div className="map-embed-wrap">
                <iframe
                  className="map-embed"
                  title="Stayinn location map"
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    PROPERTY.lng - 0.02
                  }%2C${PROPERTY.lat - 0.012}%2C${
                    PROPERTY.lng + 0.02
                  }%2C${PROPERTY.lat + 0.012}&layer=mapnik&marker=${
                    PROPERTY.lat
                  }%2C${PROPERTY.lng}`}
                />
              </div>
            </Reveal>

            <div className="nearby-panel">
              <div className="nearby-group">
                <h4>
                  <Icon name="mapPin" /> Nearby landmarks
                </h4>

                {NEARBY.landmarks.map((place) => (
                  <div key={place.name} className="nearby-row">
                    <span>{place.name}</span>
                    <strong>{place.dist}</strong>
                  </div>
                ))}
              </div>

              <div className="nearby-group">
                <h4>
                  <Icon name="coffee" /> Food & shopping
                </h4>

                {NEARBY.food.map((place) => (
                  <div key={place.name} className="nearby-row">
                    <span>{place.name}</span>
                    <strong>{place.dist}</strong>
                  </div>
                ))}
              </div>

              <div className="nearby-group">
                <h4>
                  <Icon name="car" /> Transportation
                </h4>

                {NEARBY.transport.map((place) => (
                  <div key={place.name} className="nearby-row">
                    <span>{place.name}</span>
                    <strong>{place.dist}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Rules */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <div>
                <div className="eyebrow">Good to know</div>
                <h2>Property rules at Stayinn</h2>
                <p className="sub center">
                  A few simple guidelines to make every stay smooth and safe.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="rules-grid">
            {PROPERTY_RULES.map((rule, i) => (
              <Reveal key={rule.title} delay={i * 60}>
                <div className="rule-card">
                  <div className="feature-icon">
                    <Icon
                      name={
                        i === 0 ? "clock" : i === 1 ? "users" : "shield"
                      }
                    />
                  </div>

                  <div>
                    <h3>{rule.title}</h3>
                    <p>{rule.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <h2>Ready for a great night's sleep?</h2>

              <p>
                Check availability in real time and book in under two minutes —
                free cancellation on most rooms.
              </p>

              <div className="cta-actions flex gap-3 justify-center flex-wrap">
                <a href="#/rooms" className="btn btn-light btn-lg">
                  <Icon name="search" /> Browse rooms
                </a>

                <a
                  href="#/rooms"
                  className="btn btn-outline btn-lg"
                  style={{
                    borderColor: "rgba(255,255,255,0.5)",
                    color: "#fff",
                  }}
                >
                  Check availability
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}