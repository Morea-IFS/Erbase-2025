document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar-nav');
    const links = nav.querySelectorAll('.nav-link');
    const indicator = document.createElement('div');
    indicator.classList.add('navbar-underline-indicator');
    nav.appendChild(indicator);

    const moveIndicator = (link) => {
        const { width, left } = link.getBoundingClientRect();
        const { left: navLeft } = nav.getBoundingClientRect();
        indicator.style.width = `${width}px`;
        indicator.style.left = `${left - navLeft}px`;
    };

    const setActive = (link) => {
        if (!link || link.classList.contains('active')) return;
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        moveIndicator(link);
    };

    const updateActiveLinkByScroll = () => {
        let activated = false;

        for (const link of links) {
            const section = document.querySelector(link.getAttribute('href'));
            if (section && section.getBoundingClientRect().top <= 100 && section.getBoundingClientRect().bottom > 100) {
                setActive(link);
                activated = true;
                break;
            }
        }

        if (!activated) {
            setActive(nav.querySelector('.nav-link[href="#home"]'));
        }
    };

    updateActiveLinkByScroll();

    window.addEventListener('scroll', updateActiveLinkByScroll);
    window.addEventListener('resize', () => {
        const activeLink = nav.querySelector('.nav-link.active');
        if (activeLink) moveIndicator(activeLink);
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(updateActiveLinkByScroll, 100);
        });
    });
});
