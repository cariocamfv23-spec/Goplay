import { t as CircleCheck } from "./circle-check-DJBeBdbd.js";
import { n as Ticket, t as WeatherWidget } from "./WeatherWidget-Jto7FB6G.js";
import "./loader-circle-B-yr6_ug.js";
import "./refresh-cw-C3BNbSEm.js";
import "./wind-9WgWzgow.js";
import { $t as Button, Br as require_jsx_runtime, Cr as ArrowLeft, F as Badge, Jr as useParams, Vn as MapPin, X as mockEvents, Xr as require_react, _r as Calendar, qr as useNavigate } from "./index-E9b2kZbq.js";
import "./card-DQ2g85J7.js";
import { t as CheckInModal } from "./CheckInModal-Co3nlPBC.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function EventDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const event = mockEvents.find((e) => e.id === id) || mockEvents[0];
	const [showCheckIn, setShowCheckIn] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-28 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-72 w-full group",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: event.image,
						alt: event.title,
						className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "absolute top-4 left-4 bg-background/30 backdrop-blur-md rounded-full text-white hover:bg-background/50",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 -mt-10 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "mb-3",
							children: event.category
						}), event.price === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "mb-3 bg-green-500/10 text-green-600",
							children: "Grátis"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold mb-2 leading-tight",
						children: event.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mb-4",
						children: event.organizer
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/50 rounded-xl p-4 shadow-sm space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: event.date
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: event.time
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold",
										children: event.location
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: event.address
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											event.city,
											", ",
											event.state
										]
									})
								] })]
							})]
						}), event.weather && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherWidget, { weather: event.weather })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-lg",
							children: "Detalhes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm leading-relaxed",
							children: event.description
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckInModal, {
				open: showCheckIn,
				onOpenChange: setShowCheckIn,
				venueName: event.location,
				points: 150
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border/50 flex flex-row items-center gap-3 z-30 pb-safe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:block min-w-[100px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Ingressos a partir de"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-bold text-primary",
							children: event.price === 0 ? "Grátis" : `R$ ${event.price.toFixed(2)}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "lg",
						className: "flex-1 rounded-full font-bold border-primary text-primary hover:bg-primary/5 gap-2 h-14",
						onClick: () => setShowCheckIn(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }), "Check-in"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "flex-1 rounded-full font-bold shadow-lg shadow-primary/20 h-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "mr-2 h-5 w-5" }), " Inscrição"]
					})
				]
			})
		]
	});
}
export { EventDetails as default };

//# sourceMappingURL=EventDetails-BU3lxkeG.js.map