import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import Icon from "../components/icons.jsx";
import { SearchBar, RoomCard, Reveal } from "../components/components.jsx";
import { PROPERTY, FACILITIES, HIGHLIGHTS, ROOMS, NEARBY, PROPERTY_RULES } from "../../data.js";
function Home() {
  const featured = ROOMS.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 3);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV("section", { className: "hero", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "hero-media",
          style: {
            backgroundImage: `url(${PROPERTY.hero.url})`,
            "--hero-img": `url(${PROPERTY.hero.url})`,
            "--hero-img-mobile": `url(${PROPERTY.hero.mobile})`
          },
          role: "img",
          "aria-label": PROPERTY.hero.alt
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 12,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "hero-overlay", "aria-hidden": "true" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "container hero-content", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "hero-eyebrow", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "star" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 24,
            columnNumber: 42
          }, this),
          " Rated ",
          PROPERTY.rating,
          " by ",
          PROPERTY.reviewsCount.toLocaleString(),
          " guests"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 24,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { children: "A calm, comfortable stay, made effortless" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 25,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "lead", children: [
          PROPERTY.tagline,
          ". Clear pricing, flexible cancellation and rooms designed for a restful night."
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 26,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(SearchBar, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 29,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "section", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { children: /* @__PURE__ */ jsxDEV("div", { className: "section-head", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "eyebrow", children: "Guest favourites" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 38,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { children: "Featured rooms" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 39,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "sub", children: "Our most-loved stays \u2014 picked by guests who keep coming back." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 40,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 37,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", className: "btn btn-soft", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "arrowRight" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 42,
            columnNumber: 58
          }, this),
          " View all rooms"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 42,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 36,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "room-grid", children: featured.map((room, i) => /* @__PURE__ */ jsxDEV(Reveal, { delay: i * 90, children: /* @__PURE__ */ jsxDEV(RoomCard, { room }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 52
      }, this) }, room.id, false, {
        fileName: "<stdin>",
        lineNumber: 47,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 45,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 34,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "section section-alt", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { children: /* @__PURE__ */ jsxDEV("div", { className: "section-head center", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "eyebrow", children: "Amenities" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 58,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { children: "Everything you need, under one roof" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 59,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "sub center", children: "Comfort you can feel from the moment you arrive." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 60,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 57,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 56,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 55,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "feature-grid", children: FACILITIES.map((f, i) => /* @__PURE__ */ jsxDEV(Reveal, { delay: i * 70, children: /* @__PURE__ */ jsxDEV("div", { className: "feature-card", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "feature-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: f.icon }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 68,
          columnNumber: 49
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 68,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { children: f.title }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 69,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("p", { children: f.desc }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 70,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 67,
        columnNumber: 17
      }, this) }, f.title, false, {
        fileName: "<stdin>",
        lineNumber: 66,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 54,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "section", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { children: /* @__PURE__ */ jsxDEV("div", { className: "section-head", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "eyebrow", children: "Why Stayinn" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 83,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { children: "Highlights that make a difference" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 82,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "highlight-grid", children: HIGHLIGHTS.map((h, i) => /* @__PURE__ */ jsxDEV(Reveal, { delay: i * 70, children: /* @__PURE__ */ jsxDEV("div", { className: "highlight-card", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "feature-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: "checkCircle" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 92,
          columnNumber: 49
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 92,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { children: h.title }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 94,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: h.desc }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 95,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 93,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 17
      }, this) }, h.title, false, {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 88,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "section section-alt", id: "location", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { children: /* @__PURE__ */ jsxDEV("div", { className: "section-head", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "eyebrow", children: "Find us" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 109,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { children: "Getting around is effortless" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "sub", children: "Stayinn sits in the heart of Siliguri, steps from stations, markets and landmarks." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 111,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 108,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 107,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "map-grid", children: [
        /* @__PURE__ */ jsxDEV(Reveal, { className: "map-embed-wrap", children: /* @__PURE__ */ jsxDEV(
          "iframe",
          {
            className: "map-embed",
            title: "Stayinn location map",
            loading: "lazy",
            src: `https://www.openstreetmap.org/export/embed.html?bbox=${PROPERTY.lng - 0.02}%2C${PROPERTY.lat - 0.012}%2C${PROPERTY.lng + 0.02}%2C${PROPERTY.lat + 0.012}&layer=mapnik&marker=${PROPERTY.lat}%2C${PROPERTY.lng}`
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 118,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 117,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "nearby-panel", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "nearby-group", children: [
            /* @__PURE__ */ jsxDEV("h4", { children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "mapPin" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 127,
                columnNumber: 21
              }, this),
              " Nearby landmarks"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 127,
              columnNumber: 17
            }, this),
            NEARBY.landmarks.map((l) => /* @__PURE__ */ jsxDEV("div", { className: "nearby-row", children: [
              /* @__PURE__ */ jsxDEV("span", { children: l.name }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 129,
                columnNumber: 60
              }, this),
              /* @__PURE__ */ jsxDEV("strong", { children: l.dist }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 129,
                columnNumber: 81
              }, this)
            ] }, l.name, true, {
              fileName: "<stdin>",
              lineNumber: 129,
              columnNumber: 19
            }, this))
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 126,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "nearby-group", children: [
            /* @__PURE__ */ jsxDEV("h4", { children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "coffee" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 133,
                columnNumber: 21
              }, this),
              " Food & shopping"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 133,
              columnNumber: 17
            }, this),
            NEARBY.food.map((l) => /* @__PURE__ */ jsxDEV("div", { className: "nearby-row", children: [
              /* @__PURE__ */ jsxDEV("span", { children: l.name }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 135,
                columnNumber: 60
              }, this),
              /* @__PURE__ */ jsxDEV("strong", { children: l.dist }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 135,
                columnNumber: 81
              }, this)
            ] }, l.name, true, {
              fileName: "<stdin>",
              lineNumber: 135,
              columnNumber: 19
            }, this))
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 132,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "nearby-group", children: [
            /* @__PURE__ */ jsxDEV("h4", { children: [
              /* @__PURE__ */ jsxDEV(Icon, { name: "car" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 139,
                columnNumber: 21
              }, this),
              " Transportation"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 139,
              columnNumber: 17
            }, this),
            NEARBY.transport.map((l) => /* @__PURE__ */ jsxDEV("div", { className: "nearby-row", children: [
              /* @__PURE__ */ jsxDEV("span", { children: l.name }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 141,
                columnNumber: 60
              }, this),
              /* @__PURE__ */ jsxDEV("strong", { children: l.dist }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 141,
                columnNumber: 81
              }, this)
            ] }, l.name, true, {
              fileName: "<stdin>",
              lineNumber: 141,
              columnNumber: 19
            }, this))
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 138,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 116,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 105,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 1
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "section", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
      /* @__PURE__ */ jsxDEV(Reveal, { children: /* @__PURE__ */ jsxDEV("div", { className: "section-head center", children: /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "eyebrow", children: "Good to know" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 154,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { children: "Property rules at Stayinn" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 155,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "sub center", children: "A few simple guidelines to make every stay smooth and safe." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 156,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 153,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 152,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 151,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "rules-grid", children: PROPERTY_RULES.map((r, i) => /* @__PURE__ */ jsxDEV(Reveal, { delay: i * 60, children: /* @__PURE__ */ jsxDEV("div", { className: "rule-card", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "feature-icon", children: /* @__PURE__ */ jsxDEV(Icon, { name: i === 0 ? "clock" : i === 1 ? "users" : "shield" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 164,
          columnNumber: 49
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 164,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { children: r.title }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 166,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: r.desc }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 167,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 165,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 163,
        columnNumber: 17
      }, this) }, r.title, false, {
        fileName: "<stdin>",
        lineNumber: 162,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 160,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 150,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 149,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("section", { className: "section", children: /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV(Reveal, { children: /* @__PURE__ */ jsxDEV("div", { className: "cta-banner", children: [
      /* @__PURE__ */ jsxDEV("h2", { children: "Ready for a great night's sleep?" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 180,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("p", { children: "Check availability in real time and book in under two minutes \u2014 free cancellation on most rooms." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 181,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "cta-actions flex gap-3 justify-center flex-wrap", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", className: "btn btn-light btn-lg", children: [
          /* @__PURE__ */ jsxDEV(Icon, { name: "search" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 183,
            columnNumber: 68
          }, this),
          " Browse rooms"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 183,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#/rooms", className: "btn btn-outline btn-lg", style: { borderColor: "rgba(255,255,255,0.5)", color: "#fff" }, children: "Check availability" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 184,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 182,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 179,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 178,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 177,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 176,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
export {
  Home as default
};
