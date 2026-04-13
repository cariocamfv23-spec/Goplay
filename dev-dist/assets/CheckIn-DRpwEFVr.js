import { t as Building2 } from "./building-2-Djnbg6BW.js";
import "./loader-circle-BkKI4kJe.js";
import { t as Navigation } from "./navigation-CeVxG1Ke.js";
import { t as QrCode } from "./qr-code-Bs37MVDY.js";
import "./refresh-cw-DcjeUaF4.js";
import { $n as MapPin, R as Badge, Un as Search, an as Button, ci as useNavigate, fi as require_react, kn as Trophy, ti as require_jsx_runtime, yr as Dumbbell, z as ScrollArea } from "./index-CLnpuxm4.js";
import { n as CardContent, t as Card } from "./card-Cd7UB63n.js";
import { t as Input } from "./input-DLZisL-T.js";
import { t as CheckInModal } from "./CheckInModal-vd-_rQY9.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var nearbyVenues = [
	{
		id: "1",
		name: "Arena Tatuapé",
		distance: "0.5km",
		type: "Quadra",
		points: 150,
		address: "R. Tuiuti, 123 - Tatuapé",
		image: "https://img.usecurling.com/p/200/200?q=soccer%20field&color=green",
		icon: Trophy
	},
	{
		id: "2",
		name: "Smart Fit - Anália Franco",
		distance: "1.2km",
		type: "Academia",
		points: 100,
		address: "Av. Regente Feijó, 1230",
		image: "https://img.usecurling.com/p/200/200?q=gym&color=black",
		icon: Dumbbell
	},
	{
		id: "3",
		name: "Complexo Esportivo Mooca",
		distance: "2.5km",
		type: "Clube",
		points: 200,
		address: "Rua Taquari, 635",
		image: "https://img.usecurling.com/p/200/200?q=sports%20complex&color=blue",
		icon: Building2
	}
];
function CheckIn() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedVenue, setSelectedVenue] = (0, import_react.useState)(null);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const handleCheckIn = (venue) => {
		setSelectedVenue(venue);
		setShowModal(true);
	};
	const filteredVenues = nearbyVenues.filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/40 p-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-xl font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary" }), "Check-in"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "text-xs text-primary font-medium",
						onClick: () => navigate("/explore"),
						children: "Ver Mapa"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar local...",
						className: "pl-9 bg-secondary/50 border-transparent focus:bg-background transition-colors",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "h-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "bg-primary/5 border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors",
							onClick: () => {
								const mockVenue = nearbyVenues[0];
								handleCheckIn(mockVenue);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center justify-center gap-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-5 w-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-sm",
									children: "Ler QR Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Check-in instantâneo"
								})] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "bg-secondary/30 border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 flex flex-col items-center justify-center gap-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-secondary flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-5 w-5 text-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-sm",
									children: "Locais Próximos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground",
									children: "Baseado no GPS"
								})] })]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
							children: "Disponíveis Agora"
						}), filteredVenues.map((venue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "overflow-hidden group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-14 w-14 rounded-lg bg-secondary shrink-0 overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: venue.image,
											alt: venue.name,
											className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-bold text-sm truncate",
													children: venue.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "secondary",
													className: "text-[10px] font-mono shrink-0",
													children: venue.distance
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground truncate",
												children: venue.address
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													variant: "outline",
													className: "text-[10px] h-4 px-1 border-primary/30 text-primary",
													children: [
														"+",
														venue.points,
														" pts"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-muted-foreground flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(venue.icon, { className: "h-3 w-3" }), venue.type]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "shrink-0 rounded-full h-8 w-8 p-0",
										onClick: () => handleCheckIn(venue),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
									})
								]
							})
						}, venue.id))]
					})]
				})
			}),
			selectedVenue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckInModal, {
				open: showModal,
				onOpenChange: setShowModal,
				venueName: selectedVenue.name,
				points: selectedVenue.points
			})
		]
	});
}
export { CheckIn as default };

//# sourceMappingURL=CheckIn-DRpwEFVr.js.map