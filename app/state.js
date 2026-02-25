
export const state = {
    users: [],
    posts: [],
    filteredPosts: [],
    selectedUserId: null,
    searchText: '',
    loading: false,
    currentPage: 1,
    itemsPerPage: 6
};

export const applyFilter = (posts, searchText) => {
    const q = searchText.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(p => p.title.toLowerCase().includes(q));
};