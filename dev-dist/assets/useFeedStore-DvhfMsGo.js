import { Nt as persist, Pt as create, mt as mockPosts } from "./index-DzO-_6nv.js";
const useFeedStore = create()(persist((set) => ({
	posts: mockPosts,
	addPost: (post) => set((state) => ({ posts: [{
		...post,
		id: Date.now(),
		time: "Agora",
		likes: 0,
		comments: 0,
		shares: 0,
		applauds: 0,
		supports: 0
	}, ...state.posts] }))
}), { name: "goplay-feed-storage" }));
export { useFeedStore as t };

//# sourceMappingURL=useFeedStore-DvhfMsGo.js.map