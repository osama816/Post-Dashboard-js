import { getUsers, getPostsByUser } from './api.js';
import { state, applyFilter } from './state.js';
import * as ui from './ui.js';

const init = () => {
    ui.setLoading(true);
    getUsers()
        .then(users => {
            state.users = users;
            ui.renderUsers(users);
        })
        .catch(err => {
            ui.showAlert(`Failed to load users: ${err.message}`);
        })
        .finally(() => {
            ui.setLoading(false);
        });
};

const loadPosts = (userId) => {
    if (!userId) return;

    ui.clearAlerts();
    ui.setLoading(true);
    state.selectedUserId = userId;

    getPostsByUser(userId)
        .then(posts => {
            state.posts = posts;
            state.filteredPosts = applyFilter(posts, state.searchText);
            ui.renderPosts(state.filteredPosts);
        })
        .catch(err => {
            ui.showAlert(`Failed to load posts: ${err.message}`);
            ui.renderPosts([]);
        })
        .finally(() => {
            ui.setLoading(false);
        });
};

const handleSearch = (e) => {
    state.searchText = e.target.value;
    state.filteredPosts = applyFilter(state.posts, state.searchText);
    ui.renderPosts(state.filteredPosts);
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