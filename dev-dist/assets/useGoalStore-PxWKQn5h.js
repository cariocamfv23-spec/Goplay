import { At as persist, Q as mockGoals, jt as create } from "./index-Dl1oMQSI.js";
const useGoalStore = create()(persist((set) => ({
	goals: mockGoals,
	addGoal: (data) => set((state) => {
		return { goals: [{
			...data,
			id: Math.random().toString(36).substr(2, 9),
			status: "active",
			progress: 0,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}, ...state.goals] };
	}),
	updateGoal: (id, data) => set((state) => ({ goals: state.goals.map((goal) => goal.id === id ? {
		...goal,
		...data
	} : goal) })),
	deleteGoal: (id) => set((state) => ({ goals: state.goals.filter((goal) => goal.id !== id) })),
	completeGoal: (id) => set((state) => ({ goals: state.goals.map((goal) => goal.id === id ? {
		...goal,
		status: "completed",
		progress: 100
	} : goal) }))
}), { name: "goplay-goal-storage" }));
export { useGoalStore as t };

//# sourceMappingURL=useGoalStore-PxWKQn5h.js.map