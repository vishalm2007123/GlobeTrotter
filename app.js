

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  const pages = {
    login: initLogin,
    register: initRegister,
    dashboard: initDashboard,
    "create-trip": initCreateTrip,
    "my-trips": initMyTrips,
    "itinerary-builder": initItineraryBuilder,
    "itinerary-view": initItineraryView,
    "city-search": initCitySearch,
    "activity-search": initActivitySearch,
    "trip-budget": initTripBudget,
    "trip-calendar": initTripCalendar,
    profile: initProfile
  };

  if (pages[page]) pages[page]();
});



function initLogin() {
  const form = document.querySelector("form");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
}

function initRegister() {
  const form = document.querySelector("form");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    window.location.href = "dashboard.html";
  });
}



function initDashboard() {
  document
    .querySelector(".dashboard-actions button")
    ?.addEventListener("click", () => {
      window.location.href = "create-trip.html";
    });
}


function initCreateTrip() {
  document.querySelector("form")
    ?.addEventListener("submit", e => {
      e.preventDefault();
      window.location.href = "my-trips.html";
    });
}



function initMyTrips() {
  document.querySelectorAll(".trip-card").forEach(card => {
    const buttons = card.querySelectorAll("button");
    if (buttons.length < 3) return;

    const [view, edit, del] = buttons;

    view.onclick = () => window.location.href = "itinerary-view.html";
    edit.onclick = () => window.location.href = "itinerary-builder.html";

    del.onclick = () => {
      if (confirm("Delete this trip?")) {
        card.remove();
      }
    };
  });
}


function initItineraryBuilder() {

  /* ADD STOP */
  document
    .querySelector(".builder-controls button")
    ?.addEventListener("click", addStop);

  /* DELEGATED EVENTS */
  document.addEventListener("click", e => {

    if (e.target.classList.contains("add-activity")) {
      addActivity(e.target);
    }

    if (e.target.classList.contains("remove-stop")) {
      removeStop(e.target);
    }

  });
}



function addStop() {
  const stopsSection = document.querySelector(".stops-section");
  if (!stopsSection) return;

  const stop = document.createElement("article");
  stop.className = "trip-stop";

  stop.innerHTML = `
    <header class="stop-header">
      <h3>New City</h3>
      <p>Select dates</p>
    </header>

    <section class="stop-details">

      <article class="activities-list">
        <header><h4>Activities</h4></header>
      </article>

      <footer class="stop-actions">
        <button class="add-activity">Add Activity</button>
        <button class="remove-stop">Remove Stop</button>
      </footer>

    </section>
  `;

  stopsSection.appendChild(stop);
}

function addActivity(button) {
  const activitiesList =
    button.closest(".stop-details")
          .querySelector(".activities-list");

  const activity = document.createElement("article");
  activity.className = "activity-item";

  activity.innerHTML = `
    <p>10:00</p>
    <p>New Activity</p>
    <p>₹0</p>
  `;

  activitiesList.appendChild(activity);
}

function removeStop(button) {
  const stop = button.closest(".trip-stop");
  stop.remove();
}



function initItineraryView() {
  const buttons = document.querySelectorAll(".view-toggle button");
  const content = document.querySelector(".itinerary-content");

  if (buttons.length < 2 || !content) return;

  buttons[0].onclick = () => {
    content.classList.add("calendar-view");
    content.classList.remove("list-view");
  };

  buttons[1].onclick = () => {
    content.classList.add("list-view");
    content.classList.remove("calendar-view");
  };
}


function initCitySearch() {
  document.querySelectorAll(".city-card button")
    .forEach(btn => {
      btn.onclick = () => {
        window.location.href = "itinerary-builder.html";
      };
    });
}



function initActivitySearch() {
  document.querySelectorAll(".activity-card button")
    .forEach(btn => {
      btn.onclick = () => {
        window.location.href = "itinerary-builder.html";
      };
    });
}



function initTripBudget() {
  // Display-only for now
}



function initTripCalendar() {
  const buttons = document.querySelectorAll(".calendar-toggle button");
  const calendar = document.querySelector(".calendar-container");
  const timeline = document.querySelector(".timeline-container");

  if (buttons.length < 2) return;

  buttons[0].onclick = () => {
    calendar.style.display = "block";
    timeline.style.display = "none";
  };

  buttons[1].onclick = () => {
    calendar.style.display = "none";
    timeline.style.display = "block";
  };
}



function initProfile() {
  document.querySelector("form")
    ?.addEventListener("submit", e => {
      e.preventDefault();
      alert("Profile saved");
    });

  document
    .querySelector("[data-action='delete-account']")
    ?.addEventListener("click", () => {
      if (confirm("Delete account permanently?")) {
        window.location.href = "login.html";
      }
    });
}
