const loadComponent = async (selector, path) => {
    const placeholder = document.querySelector(selector);
    if (!placeholder) return;

    const response = await fetch(path);
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    placeholder.outerHTML = await response.text();
};

const markCurrentPage = () => {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;
    document.querySelectorAll(`[data-page="${currentPage}"]`).forEach((link) => {
        link.classList.add('active', 'current');
        link.setAttribute('aria-current', 'page');
    });
};

Promise.all([
    loadComponent('[data-component="header"]', 'components/header.html'),
    loadComponent('[data-component="footer"]', 'components/footer.html')
]).then(markCurrentPage).catch((error) => console.error(error));
