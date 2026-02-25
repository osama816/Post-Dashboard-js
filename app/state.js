
export const state = {
    users: [],
    posts: [],
    filteredPosts: [],
    selectedUserId: null,
    searchText: '',
    loading: false
};

export const applyFilter = (posts, searchText) => {
    const q = searchText.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(p => p.title.toLowerCase().includes(q));
};