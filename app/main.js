import { getUsers, getPostsByUser } from './api.js';
import { state, applyFilter } from './state.js';
import * as ui from './ui.js';


// Initialize the application
const init = () => {
    ui.setLoading(true);
    getUsers()
        .then(users => {
            state.users = users;
            ui.renderUsers(users);
        })
        .catch(err => {
            ui.showAlert(`Failed to load users: ${err.message}`, 'danger', init);
        })
        .finally(() => {
            ui.setLoading(false);
        });
};


// Handles rendering with pagination

const renderWithPagination = () => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedPosts = state.filteredPosts.slice(startIndex, startIndex + state.itemsPerPage);

    ui.renderPosts(paginatedPosts);
    ui.renderPagination(
        state.filteredPosts.length,
        state.currentPage,
        state.itemsPerPage,
        (page) => {
            state.currentPage = page;
            renderWithPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    );
};

// Load posts for a specific user
const loadPosts = (userId) => {
    if (!userId) return;

    ui.clearAlerts();
    ui.setLoading(true);
    state.selectedUserId = userId;
    state.currentPage = 1; 

   getPostsByUser(userId)
        .then(posts => {
            state.posts = posts;
            state.filteredPosts = applyFilter(posts, state.searchText);
            renderWithPagination();
        })
        .catch(err => {
            ui.showAlert(`Failed to load data: ${err.message}`, 'danger', () => loadPosts(userId));
            ui.renderPosts([]);
        })
        .finally(() => {
            ui.setLoading(false);
        });
};

// Handles search input event (Debounced)
let timeout;
const handleSearch = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        state.searchText = e.target.value;
        state.currentPage = 1; 
        state.filteredPosts = applyFilter(state.posts, state.searchText);
        renderWithPagination();
    }, 300);
};

// Event Listeners
document.getElementById('userSelect').addEventListener('change', (e) => {
    loadPosts(e.target.value);
});

document.getElementById('searchInput').addEventListener('input', handleSearch);

document.getElementById('reloadBtn').addEventListener('click', () => {
    if (state.selectedUserId) {
        loadPosts(state.selectedUserId);
    } else {
        ui.showAlert('Please select a user first', 'warning');
    }
});

// Start the app
document.addEventListener('DOMContentLoaded', init);