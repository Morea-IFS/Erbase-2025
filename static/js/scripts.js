// Active script for the navbar
// This script will add an underline indicator to the active link in the navbar
// and update it on scroll and resize events.
document.addEventListener("DOMContentLoaded", () => {
	const nav = document.querySelector(".navbar-nav");
	const links = Array.from(nav.querySelectorAll(".nav-link"));
	const indicator = document.createElement("div");
	indicator.classList.add("navbar-underline-indicator");
	nav.appendChild(indicator);

	const moveIndicator = (link) => {
		const { width, left } = link.getBoundingClientRect();
		const { left: navLeft } = nav.getBoundingClientRect();
		indicator.style.width = `${width}px`;
		indicator.style.left = `${left - navLeft}px`;
	};

	const setActive = (link) => {
		if (!link || link.classList.contains("active")) return;
		links.forEach((l) => l.classList.remove("active"));
		link.classList.add("active");
		moveIndicator(link);
	};

	const updateActiveLinkByScroll = () => {
		let activated = false;

		// check each section to see if it's in the viewport
		for (const link of links) {
			const section = document.querySelector(link.getAttribute("href"));
			const { top, bottom } = section.getBoundingClientRect();
			if (top <= 200 && bottom > 200) {
				setActive(link);
				activated = true;
				break;
			}
		}

		// if no section is found, set the last active link or default to home
		if (!activated) {
			const lastActive = nav.querySelector('.nav-link.active');
			setActive(lastActive || nav.querySelector('.nav-link[href="#home"]'));
		}
	};

	updateActiveLinkByScroll();

	// update the active link on scroll and resize events
	window.addEventListener("scroll", updateActiveLinkByScroll);
	window.addEventListener("resize", () => {
		const activeLink = nav.querySelector(".nav-link.active");
		if (activeLink) moveIndicator(activeLink);
	});

	// add click event listeners to each link to update the active link on click
	links.forEach((link) => {
		link.addEventListener("click", () => {
			setTimeout(updateActiveLinkByScroll, 100);
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