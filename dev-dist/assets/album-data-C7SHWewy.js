var countriesData = [
	{
		name: "Brasil",
		flag: "🇧🇷",
		color: "green"
	},
	{
		name: "USA",
		flag: "🇺🇸",
		color: "blue"
	},
	{
		name: "México",
		flag: "🇲🇽",
		color: "green"
	},
	{
		name: "Argentina",
		flag: "🇦🇷",
		color: "blue"
	},
	{
		name: "França",
		flag: "🇫🇷",
		color: "blue"
	},
	{
		name: "Espanha",
		flag: "🇪🇸",
		color: "red"
	},
	{
		name: "Alemanha",
		flag: "🇩🇪",
		color: "black"
	},
	{
		name: "Inglaterra",
		flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
		color: "white"
	}
];
var positions = [
	"ATA",
	"MEI",
	"VOL",
	"ZAG",
	"LAT",
	"GOL"
];
var names = [
	"J. Silva",
	"R. Santos",
	"T. Adams",
	"P. Gomez",
	"L. Messi",
	"K. Mbappé",
	"A. Griezmann",
	"V. Júnior",
	"E. Haaland",
	"J. Bellingham",
	"H. Kane",
	"C. Pulisic",
	"G. Ochoa",
	"R. Jiménez",
	"A. Di María",
	"O. Dembélé",
	"Pedri",
	"Gavi",
	"T. Kroos",
	"J. Musiala",
	"B. Saka",
	"P. Foden",
	"N. Neymar",
	"R. Rodrygo",
	"W. McKennie",
	"T. Weah",
	"E. Álvarez",
	"S. Giménez",
	"E. Fernández",
	"J. Álvarez"
];
const mockStickers = Array.from({ length: 40 }).map((_, i) => {
	const number = i + 1;
	const country = countriesData[Math.floor(i / 5)];
	const position = positions[i % positions.length];
	const name = names[i % names.length];
	return {
		id: `stk-${number}`,
		number,
		name,
		country: country.name,
		position,
		flag: country.flag,
		image: `https://img.usecurling.com/p/300/400?q=soccer%20player%20${country.name}&color=${country.color}&dpr=2&seed=${i}`,
		rarity: number % 5 === 0 ? "rare" : "common"
	};
});
export { mockStickers as t };

//# sourceMappingURL=album-data-C7SHWewy.js.map