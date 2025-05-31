document.addEventListener("DOMContentLoaded", () => {
	const nav = document.querySelector(".navbar-nav");
	const links = Array.from(nav.querySelectorAll(".nav-link"));

	// Function to set the active class and style
	const setActive = (link) => {
		if (!link || link.classList.contains("active")) return;

		// Remove active styles from all links
		links.forEach((l) => {
			l.classList.remove("active", "bg-warning", "rounded-pill");
			l.classList.add("text-warning");
		});

		// Apply active styles to the clicked/visible link
		link.classList.add("active", "bg-warning", "rounded-pill");
		link.classList.remove("text-warning");
	};

	// Function to update active link based on scroll position
	const updateActiveLinkByScroll = () => {
		let activated = false;

		for (const link of links) {
			const section = document.querySelector(link.getAttribute("href"));
			if (!section) continue;

			const { top, bottom } = section.getBoundingClientRect();
			if (top <= 200 && bottom > 200) {
				setActive(link);
				activated = true;
				break;
			}
		}

		// If no section is active, default to the first or last active link
		if (!activated) {
			const lastActive = nav.querySelector(".nav-link.active");
			setActive(lastActive || nav.querySelector(".nav-link"));
		}
	};

	// Initial check on page load
	updateActiveLinkByScroll();

	// Update on scroll and resize
	window.addEventListener("scroll", updateActiveLinkByScroll);
	window.addEventListener("resize", updateActiveLinkByScroll);

	// On link click: scroll smoothly and set active
	links.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault(); // Prevent default jump

			const section = document.querySelector(link.getAttribute("href"));
			if (section) {
				window.scrollTo({
					top: section.offsetTop - 60,
					behavior: "smooth",
				});
			}

			setActive(link);
		});
	});
});

// Table script for the schedule
const tabs = document.querySelectorAll(".date-tab");
const scheduleBodies = document.querySelectorAll(".schedule-body");

function showActiveSchedule() {
	const activeTab = document.querySelector(".date-tab.active");
	if (activeTab) {
		const activeDay = activeTab.getAttribute("data-day");
		const activeBody = document.querySelector(`.${activeDay}`);
		if (activeBody) activeBody.style.display = "table-row-group";
	}
}

const titleCalls = document.querySelector(".hero-calls-content-title");

function textCallsUpdate() {
	if (!titleCalls) return;

	if (window.innerWidth <= 420) {
		titleCalls.textContent = "Futebol de Robôs";
	} else {
		titleCalls.textContent = "Campeonato de Futebol de Robôs";
	}
}

// Call on load
textCallsUpdate();

// Update in real time on resize
window.addEventListener("resize", textCallsUpdate);

// Add click event listeners to each tab to switch the schedule
tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		tabs.forEach((t) => t.classList.remove("active"));
		tab.classList.add("active");

		scheduleBodies.forEach((body) => (body.style.display = "none"));

		const dayClass = tab.getAttribute("data-day");
		const activeBody = document.querySelector(`.${dayClass}`);
		if (activeBody) activeBody.style.display = "table-row-group";
	});
});

// Initialize the schedule display on page load
showActiveSchedule();
