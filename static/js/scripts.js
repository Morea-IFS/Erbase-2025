document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a.nav-link');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            // Remove a linha event.preventDefault();

            // Remove 'active' class from all links
            links.forEach(l => l.classList.remove('active'));

            // Add 'active' class to the clicked link
            link.classList.add('active');

            // Se você quiser um pequeno delay antes de navegar (opcional)
            setTimeout(() => {
                window.location.href = link.href;
            });
        });
    });
});