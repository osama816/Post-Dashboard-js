

const containers = {
    userSelect: document.getElementById('userSelect'),
    postsGrid: document.getElementById('postsGrid'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    alertContainer: document.getElementById('alertContainer'),
    postsCount: document.getElementById('postsCount')
};

//  users in dropdown
export const renderUsers = (users) => {
    const select = document.getElementById('userSelect');
    select.innerHTML = '<option value="" selected disabled>Choose a user...</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        select.appendChild(option);
    });
};


export const renderPosts = (posts) => {
    const grid = document.getElementById('postsGrid');
    const countBadge = document.getElementById('postsCount');
    grid.innerHTML = '';

    if (countBadge) countBadge.textContent = posts.length;

    if (posts.length === 0) {
        grid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center" role="alert">
                    No posts found matching your search.
                </div>
            </div>`;
        return;
    }

    posts.forEach(post => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title text-capitalize text-primary">${post.title}</h5>
                    <p class="card-text text-muted">${post.body}</p>
                </div>
                <div class="card-footer bg-transparent border-0 text-end">
                    <small class="text-muted">ID: ${post.id}</small>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
};


export const setLoading = (isLoading) => {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.toggle('d-none', !isLoading);
    }
};



export const renderPagination = (totalItems, currentPage, itemsPerPage, onPageChange) => {
    const container = document.getElementById('paginationContainer');
    if (!container) return;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    container.innerHTML = '';

    if (totalPages <= 1) return;

    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            onPageChange(i);
        });
        li.appendChild(a);
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    container.appendChild(nav);
};


export const showAlert = (message, type = 'danger', onRetry = null) => {
    const container = document.getElementById('alertContainer');
    if (container) {
        let retryBtn = '';
        if (onRetry) {
            retryBtn = `<button id="retryActionBtn" class="btn btn-sm btn-outline-${type} ms-3">Retry</button>`;
        }

        container.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show d-flex align-items-center justify-content-between" role="alert">
                <span>${message} ${retryBtn}</span>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        if (onRetry) {
            document.getElementById('retryActionBtn').addEventListener('click', onRetry);
        }
    }
};

export const clearAlerts = () => {
    const container = document.getElementById('alertContainer');
    if (container) container.innerHTML = '';
};

