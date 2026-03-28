import { t as LoaderCircle } from "./loader-circle-BkKIOR9f.js";
import { $t as Logo, Br as createLucideIcon, C as SportsWallpaper, D as useAuthStore, En as User, Ir as ArrowRight, an as Button, b as PageLoader, ci as useNavigate, di as require_react, ti as require_jsx_runtime, tr as Lock, vn as toast } from "./index-CJ2Qsi3b.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-Dv35n-NR.js";
import { t as Label } from "./label-CMDheHfa.js";
import { t as Input } from "./input-DziIEZ2a.js";
import { t as Checkbox } from "./checkbox-B76VBUx8.js";
var Fingerprint = createLucideIcon("fingerprint", [
	["path", {
		d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",
		key: "1nerag"
	}],
	["path", {
		d: "M14 13.12c0 2.38 0 6.38-1 8.88",
		key: "o46ks0"
	}],
	["path", {
		d: "M17.29 21.02c.12-.6.43-2.3.5-3.02",
		key: "ptglia"
	}],
	["path", {
		d: "M2 12a10 10 0 0 1 18-6",
		key: "ydlgp0"
	}],
	["path", {
		d: "M2 16h.01",
		key: "1gqxmh"
	}],
	["path", {
		d: "M21.8 16c.2-2 .131-5.354 0-6",
		key: "drycrb"
	}],
	["path", {
		d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",
		key: "1tidbn"
	}],
	["path", {
		d: "M8.65 22c.21-.66.45-1.32.57-2",
		key: "13wd9y"
	}],
	["path", {
		d: "M9 6.8a6 6 0 0 1 9 5.2v2",
		key: "1fr1j5"
	}]
]);
var Github = createLucideIcon("github", [["path", {
	d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
	key: "tonef"
}], ["path", {
	d: "M9 18c-4.51 2-5-2-7-2",
	key: "9comsn"
}]]);
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const { login, isAuthenticated, hasHydrated } = useAuthStore();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [socialLoading, setSocialLoading] = (0, import_react.useState)(null);
	const [biometricLoading, setBiometricLoading] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (hasHydrated && isAuthenticated) setTimeout(() => {
			navigate("/home", { replace: true });
		}, 0);
	}, [
		hasHydrated,
		isAuthenticated,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		const savedUsername = localStorage.getItem("goplay_username");
		const savedPassword = localStorage.getItem("goplay_password");
		if (localStorage.getItem("goplay_remember") === "true" && savedUsername) {
			setUsername(savedUsername);
			setRememberMe(true);
			if (savedPassword) setPassword(savedPassword);
		}
	}, []);
	const handleLogin = () => {
		if (!username.trim() || !password.trim()) {
			toast.error("Preencha todos os campos para continuar");
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			if (password.length < 6) {
				toast.error("A senha deve ter pelo menos 6 caracteres.");
				return;
			}
			if (username.toLowerCase() === "admin" && password !== "admin123") {
				toast.error("Credenciais inválidas. Verifique seu usuário e senha.");
				return;
			}
			if (rememberMe) {
				localStorage.setItem("goplay_username", username);
				localStorage.setItem("goplay_password", password);
				localStorage.setItem("goplay_remember", "true");
			} else {
				localStorage.removeItem("goplay_username");
				localStorage.removeItem("goplay_password");
				localStorage.removeItem("goplay_remember");
			}
			setTimeout(() => {
				login();
				toast.success("Login realizado com sucesso!");
				navigate("/home", { replace: true });
			}, 0);
		}, 1500);
	};
	const handleSocialLogin = (provider) => {
		setSocialLoading(provider);
		setTimeout(() => {
			setSocialLoading(null);
			setTimeout(() => {
				login();
				toast.success(`Login com ${provider} realizado com sucesso!`);
				navigate("/home", { replace: true });
			}, 0);
		}, 1500);
	};
	const handleBiometricLogin = () => {
		setBiometricLoading(true);
		toast.info("Aproxime o dedo do sensor", {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "h-4 w-4 animate-pulse text-primary" }),
			duration: 2e3
		});
		setTimeout(() => {
			setBiometricLoading(false);
			setTimeout(() => {
				login();
				toast.success("Identidade confirmada", { description: "Acesso seguro liberado via biometria." });
				navigate("/home", { replace: true });
			}, 0);
		}, 2e3);
	};
	if (!hasHydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoader, {});
	if (isAuthenticated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportsWallpaper, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					variant: "full",
					className: "scale-125"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-border/50 shadow-2xl bg-background/95 backdrop-blur-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-2xl font-bold text-center",
							children: "Bem-vindo de volta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
							className: "text-center",
							children: "Entre para continuar sua jornada esportiva"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => e.preventDefault(),
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "username",
										children: "Usuário"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "username",
											placeholder: "Seu usuário",
											type: "text",
											className: "pl-9",
											value: username,
											onChange: (e) => setUsername(e.target.value),
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											children: "Senha"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "link",
											type: "button",
											className: "px-0 h-auto text-xs text-muted-foreground",
											children: "Esqueceu a senha?"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password",
											type: "password",
											className: "pl-9",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center space-x-2 pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										id: "remember",
										checked: rememberMe,
										onCheckedChange: (checked) => setRememberMe(checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "remember",
										className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
										children: "Lembrar-me"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									className: "w-full font-bold",
									disabled: loading || !!socialLoading || biometricLoading,
									onClick: handleLogin,
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Entrando..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Entrar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative my-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-muted" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative flex justify-center text-xs uppercase",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-background px-2 text-muted-foreground",
									children: "Ou acesse com"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "w-full gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors h-11",
								type: "button",
								onClick: handleBiometricLogin,
								disabled: loading || !!socialLoading || biometricLoading,
								children: [biometricLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Entrar com Biometria"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										type: "button",
										onClick: () => handleSocialLogin("Google"),
										disabled: loading || !!socialLoading || biometricLoading,
										children: socialLoading === "Google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "https://img.usecurling.com/i?q=google&color=multicolor",
											alt: "Google",
											className: "h-4 w-4"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										type: "button",
										onClick: () => handleSocialLogin("Apple"),
										disabled: loading || !!socialLoading || biometricLoading,
										children: socialLoading === "Apple" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "https://img.usecurling.com/i?q=apple&color=black",
											alt: "Apple",
											className: "h-4 w-4 dark:invert"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										type: "button",
										onClick: () => handleSocialLogin("GitHub"),
										disabled: loading || !!socialLoading || biometricLoading,
										children: socialLoading === "GitHub" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
									})
								]
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Não tem uma conta?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "link",
									className: "px-0 text-primary font-semibold",
									onClick: () => navigate("/register"),
									children: "Criar conta"
								})
							]
						})
					})
				]
			})]
		})]
	});
}
export { Login as default };

//# sourceMappingURL=Login-jXBOCFX2.js.map