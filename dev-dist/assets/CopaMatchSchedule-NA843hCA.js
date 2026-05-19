import { Nr as Calendar, R as Badge, er as MapPin, kn as Tv, mi as require_react, on as Button, ri as require_jsx_runtime, ui as useNavigate, wr as Clock, yi as __toESM, zr as ArrowLeft } from "./index-CCaIJfg9.js";
import { t as Card } from "./card-CERpt5Lz.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-B5Gt1pzz.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var SCHEDULE_DATA = [
	{
		id: "m1",
		date: "11 Jun 2026",
		time: "15:00",
		group: "Abertura - Grupo A",
		team1: {
			name: "México",
			flag: "https://img.usecurling.com/p/100/100?q=mexico%20flag"
		},
		team2: {
			name: "Catar",
			flag: "https://img.usecurling.com/p/100/100?q=qatar%20flag"
		},
		stadium: "Estádio Azteca, Cidade do México",
		broadcasters: [
			"TV Globo",
			"SporTV",
			"CazéTV"
		]
	},
	{
		id: "m2",
		date: "12 Jun 2026",
		time: "16:00",
		group: "Grupo B",
		team1: {
			name: "EUA",
			flag: "https://img.usecurling.com/p/100/100?q=usa%20flag"
		},
		team2: {
			name: "País de Gales",
			flag: "https://img.usecurling.com/p/100/100?q=wales%20flag"
		},
		stadium: "SoFi Stadium, Los Angeles",
		broadcasters: ["SporTV", "Globoplay"]
	},
	{
		id: "m3",
		date: "15 Jun 2026",
		time: "13:00",
		group: "Grupo G",
		team1: {
			name: "Brasil",
			flag: "https://img.usecurling.com/p/100/100?q=brazil%20flag"
		},
		team2: {
			name: "Sérvia",
			flag: "https://img.usecurling.com/p/100/100?q=serbia%20flag"
		},
		stadium: "MetLife Stadium, Nova York",
		broadcasters: [
			"TV Globo",
			"SporTV",
			"CazéTV",
			"Globoplay"
		]
	},
	{
		id: "m4",
		date: "16 Jun 2026",
		time: "16:00",
		group: "Grupo C",
		team1: {
			name: "Argentina",
			flag: "https://img.usecurling.com/p/100/100?q=argentina%20flag"
		},
		team2: {
			name: "Arábia Saudita",
			flag: "https://img.usecurling.com/p/100/100?q=saudi%20arabia%20flag"
		},
		stadium: "AT&T Stadium, Dallas",
		broadcasters: ["SporTV", "CazéTV"]
	},
	{
		id: "m5",
		date: "18 Jun 2026",
		time: "16:00",
		group: "Grupo D",
		team1: {
			name: "França",
			flag: "https://img.usecurling.com/p/100/100?q=france%20flag"
		},
		team2: {
			name: "Dinamarca",
			flag: "https://img.usecurling.com/p/100/100?q=denmark%20flag"
		},
		stadium: "Hard Rock Stadium, Miami",
		broadcasters: ["SporTV"]
	},
	{
		id: "m6",
		date: "19 Jun 2026",
		time: "13:00",
		group: "Grupo B",
		team1: {
			name: "Inglaterra",
			flag: "https://img.usecurling.com/p/100/100?q=england%20flag"
		},
		team2: {
			name: "EUA",
			flag: "https://img.usecurling.com/p/100/100?q=usa%20flag"
		},
		stadium: "Mercedes-Benz Stadium, Atlanta",
		broadcasters: [
			"TV Globo",
			"SporTV",
			"Globoplay"
		]
	},
	{
		id: "m7",
		date: "20 Jun 2026",
		time: "15:00",
		group: "Grupo E",
		team1: {
			name: "Espanha",
			flag: "https://img.usecurling.com/p/100/100?q=spain%20flag"
		},
		team2: {
			name: "Alemanha",
			flag: "https://img.usecurling.com/p/100/100?q=germany%20flag"
		},
		stadium: "Levi's Stadium, San Francisco",
		broadcasters: ["SporTV", "CazéTV"]
	},
	{
		id: "m8",
		date: "22 Jun 2026",
		time: "13:00",
		group: "Grupo G",
		team1: {
			name: "Brasil",
			flag: "https://img.usecurling.com/p/100/100?q=brazil%20flag"
		},
		team2: {
			name: "Suíça",
			flag: "https://img.usecurling.com/p/100/100?q=switzerland%20flag"
		},
		stadium: "SoFi Stadium, Los Angeles",
		broadcasters: [
			"TV Globo",
			"SporTV",
			"CazéTV",
			"Globoplay"
		]
	}
];
function CopaMatchSchedule() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-32 overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 pointer-events-none z-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[hsl(var(--gold)/0.1)] rounded-full blur-[120px]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 px-4 pt-safe-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate(-1),
							className: "rounded-full shrink-0 hover:bg-secondary/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-[hsl(var(--gold))]",
								children: "Tabela de Jogos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold text-muted-foreground uppercase tracking-widest",
								children: "Copa do Mundo 2026"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 shrink-0" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 max-w-4xl mx-auto px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "border-border/30 bg-secondary/10 backdrop-blur-md overflow-hidden shadow-xl rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto [&::-webkit-scrollbar]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
							className: "w-full min-w-[700px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
								className: "bg-secondary/40 backdrop-blur-sm border-b border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: "hover:bg-transparent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "w-[120px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4",
											children: "Data / Hora"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "w-[250px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4 text-center",
											children: "Confronto"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "w-[150px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4",
											children: "Grupo / Fase"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "w-[180px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4",
											children: "Local"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "w-[180px] text-xs uppercase font-black text-muted-foreground tracking-wider py-4",
											children: "Onde Assistir"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: SCHEDULE_DATA.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: "border-border/20 hover:bg-secondary/30 transition-colors group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "py-4 align-top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 font-bold text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5 text-primary" }), match.date]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), match.time]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3 w-[110px] justify-end",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-bold truncate",
														children: match.team1.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: match.team1.flag,
														alt: match.team1.name,
														className: "w-7 h-7 rounded-full object-cover border-[1.5px] border-border/50 shadow-sm"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-black text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full",
													children: "X"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3 w-[110px] justify-start",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: match.team2.flag,
														alt: match.team2.name,
														className: "w-7 h-7 rounded-full object-cover border-[1.5px] border-border/50 shadow-sm"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-bold truncate",
														children: match.team2.name
													})]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "py-4 align-top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-[10px] font-bold uppercase tracking-widest bg-background/50",
											children: match.group
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "py-4 align-top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-1.5 text-xs text-muted-foreground font-medium leading-tight max-w-[160px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: match.stadium })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "py-4 align-top",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { className: "w-3.5 h-3.5" }), " Transmissão"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-1.5",
												children: match.broadcasters.map((broadcaster) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "secondary",
													className: "text-[9px] px-2 py-0.5 font-bold tracking-wider bg-background/60 border-border/40 hover:bg-primary/20 transition-colors",
													children: broadcaster
												}, broadcaster))
											})]
										})
									})
								]
							}, match.id)) })]
						})
					})
				})
			})
		]
	});
}
export { CopaMatchSchedule as default };

//# sourceMappingURL=CopaMatchSchedule-NA843hCA.js.map