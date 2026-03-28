import { t as Navigation } from "./navigation-qjzl-f5J.js";
import { $n as MapPin, Cr as Clock, Ln as Star, Lr as ArrowLeft, Qn as Map, R as Badge, a as DialogFooter, an as Button, ci as useNavigate, di as require_react, i as DialogDescription, ir as Info, kr as Car, o as DialogHeader, pr as Fuel, r as DialogContent, s as DialogTitle, t as Dialog, ti as require_jsx_runtime } from "./index-CJ2Qsi3b.js";
import { n as CardContent, t as Card } from "./card-Dv35n-NR.js";
import { t as Label } from "./label-CMDheHfa.js";
import { t as Input } from "./input-DziIEZ2a.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var stations = [
	{
		id: 1,
		name: "Posto Shell Select",
		region: "Jardins",
		city: "São Paulo, SP",
		address: "Av. Paulista, 1230",
		hours: "24 Horas",
		rating: 4.8,
		imageQuery: "shell",
		color: "red",
		prices: [
			{
				type: "Gasolina Comum",
				price: 5.89
			},
			{
				type: "Gasolina Aditivada",
				price: 6.09
			},
			{
				type: "Etanol",
				price: 3.99
			}
		]
	},
	{
		id: 2,
		name: "Posto Ipiranga AMPM",
		region: "Pinheiros",
		city: "São Paulo, SP",
		address: "Rua dos Pinheiros, 450",
		hours: "06:00 - 23:00",
		rating: 4.6,
		imageQuery: "ipiranga",
		color: "blue",
		prices: [
			{
				type: "Gasolina Comum",
				price: 5.79
			},
			{
				type: "Etanol",
				price: 3.89
			},
			{
				type: "Diesel S10",
				price: 6.19
			}
		]
	},
	{
		id: 3,
		name: "Posto Petrobras BR",
		region: "Vila Olímpia",
		city: "São Paulo, SP",
		address: "Av. Brigadeiro Faria Lima, 3400",
		hours: "24 Horas",
		rating: 4.9,
		imageQuery: "petrobras",
		color: "green",
		prices: [
			{
				type: "Gasolina Grid",
				price: 5.99
			},
			{
				type: "Etanol",
				price: 4.09
			},
			{
				type: "Podium",
				price: 7.49
			}
		]
	},
	{
		id: 4,
		name: "Posto Ale",
		region: "Moema",
		city: "São Paulo, SP",
		address: "Av. Ibirapuera, 2100",
		hours: "06:00 - 22:00",
		rating: 4.5,
		imageQuery: "ale",
		color: "cyan",
		prices: [{
			type: "Gasolina Comum",
			price: 5.69
		}, {
			type: "Etanol",
			price: 3.79
		}]
	}
];
function PartnerGasStations() {
	const navigate = useNavigate();
	const [selectedStation, setSelectedStation] = (0, import_react.useState)(null);
	const [origin, setOrigin] = (0, import_react.useState)("");
	const handleTraceRoute = (service) => {
		if (!selectedStation) return;
		const destination = `${selectedStation.address}, ${selectedStation.city}`;
		let url = "";
		if (service === "waze") url = `https://waze.com/ul?q=${encodeURIComponent(destination)}&navigate=yes`;
		else if (origin.trim()) url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
		else url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
		window.open(url, "_blank");
		setSelectedStation(null);
		setOrigin("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 bg-background/95 backdrop-blur z-20 p-4 border-b border-border/50 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-xl font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-5 w-5 text-yellow-600" }), "Postos Parceiros"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-3 flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5 text-yellow-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed",
						children: "Utilize seus créditos Goplay Fuel nestes estabelecimentos para abastecer com desconto. Os preços podem variar sem aviso prévio."
					})]
				}), stations.map((station) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center p-2 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `https://img.usecurling.com/i?q=${station.imageQuery}&color=${station.color}`,
									alt: station.name,
									className: "w-full h-full object-contain"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm truncate pr-2",
										children: station.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-xs text-muted-foreground mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											station.region,
											" • ",
											station.city
										] })]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "secondary",
										className: "flex items-center gap-1 h-5 px-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-yellow-500 text-yellow-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px]",
											children: station.rating
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2 mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-[10px] font-normal gap-1 h-5 px-2 bg-secondary/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), station.hours]
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-secondary/20 rounded-lg p-3 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2",
									children: "Preços de Hoje"
								}), station.prices.map((price, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: price.type
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-primary",
										children: ["R$ ", price.price.toFixed(2)]
									})]
								}, index))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full mt-4 h-9 text-xs font-semibold gap-2",
								variant: "outline",
								onClick: () => setSelectedStation(station),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-3 w-3" }), "Traçar Rota"]
							})]
						})]
					})
				}, station.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!selectedStation,
				onOpenChange: (open) => {
					if (!open) {
						setSelectedStation(null);
						setOrigin("");
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Traçar Rota" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
							"Escolha como deseja chegar até o ",
							selectedStation?.name,
							"."
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "destination",
									children: "Destino"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 p-2.5 border rounded-md bg-muted/50 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "truncate",
										children: [
											selectedStation?.address,
											" - ",
											selectedStation?.region
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "origin",
										children: "Partida (Opcional)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "origin",
										placeholder: "Sua localização atual",
										value: origin,
										onChange: (e) => setOrigin(e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground",
										children: "Deixe em branco para usar o GPS do seu dispositivo."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "flex-col sm:flex-row gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full sm:w-1/2 gap-2",
								onClick: () => handleTraceRoute("waze"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-4 w-4" }), "Waze"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full sm:w-1/2 gap-2",
								onClick: () => handleTraceRoute("google"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-4 w-4" }), "Google Maps"]
							})]
						})
					]
				})
			})
		]
	});
}
export { PartnerGasStations as default };

//# sourceMappingURL=PartnerGasStations-D8rMUcVJ.js.map