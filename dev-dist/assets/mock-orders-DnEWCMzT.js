import { _t as mockProducts } from "./index-BEHBL1rc.js";
const mockOrders = [
	{
		id: "ORD-7782-XJ",
		date: "20 Out 2024",
		status: "delivered",
		total: 514.8,
		totalPoints: 0,
		items: [{
			product: mockProducts[0],
			quantity: 1
		}],
		shippingAddress: "Rua das Palmeiras, 450 - São Paulo, SP",
		shippingMethod: "Frete Padrão",
		shippingCost: 14.9,
		paymentMethod: "Cartão de Crédito (**** 4242)",
		trackingCode: "BR123456789SP"
	},
	{
		id: "ORD-9921-MC",
		date: "15 Out 2024",
		status: "shipped",
		total: 199.9,
		totalPoints: 2e3,
		items: [{
			product: mockProducts[1],
			quantity: 1
		}],
		shippingAddress: "Rua das Palmeiras, 450 - São Paulo, SP",
		shippingMethod: "Frete Grátis",
		shippingCost: 0,
		paymentMethod: "Pontos Goplay",
		trackingCode: "BR987654321SP"
	},
	{
		id: "ORD-3341-DL",
		date: "02 Set 2024",
		status: "cancelled",
		total: 249.9,
		totalPoints: 2500,
		items: [{
			product: mockProducts[3],
			quantity: 1
		}],
		shippingAddress: "Rua das Palmeiras, 450 - São Paulo, SP",
		shippingMethod: "Entrega Flash",
		shippingCost: 29.9,
		paymentMethod: "Pontos Goplay"
	}
];
export { mockOrders as t };

//# sourceMappingURL=mock-orders-DnEWCMzT.js.map