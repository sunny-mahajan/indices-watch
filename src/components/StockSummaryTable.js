import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const StockSummaryTable = ({ onPreview }) => {
	const [isfetching, setIsFetching] = useState(false);
	const [stockData, setStockData] = useState([]);

	useEffect(() => {
		fetchStockData();
	}, []);

	const fetchStockData = async () => {
		setIsFetching(true);
		try {
			const data = await fetch("/api/indices").then((res) => res.json());

			if (!data?.error) {
				setStockData(data.results);
			} else {
				toast(data?.message);
			}
		} catch (error) {
			toast.error("Failed to fetch stock data");
		} finally {
			setIsFetching(false);
		}
	};

	const handlePreviewClick = (e, ticker, name) => {
		e.preventDefault();
		onPreview(ticker, name);
	};

	const columns = [
		{
			id: "1",
			name: "#",
			content: (item, index) => index + 1,
		},
		{
			id: "2",
			name: "Ticker",
			content: (item) => item?.ticker,
		},
		{
			id: "3",
			name: "Name",
			content: (item) => item?.name,
		},
		{
			id: "4",
			name: "Active",
			content: (item) => (item?.active ? "Yes" : "No"),
		},
		{
			id: "5",
			name: "Source Feed",
			content: (item) => {
				console.log(item?.source_feed);
				return item?.source_feed;
			},
		},
		{
			id: "6",
			name: "",
			content: (item) => (
				<a
					class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
					onClick={(e) =>
						handlePreviewClick(e, item?.ticker, item?.name)
					}
				>
					Preview
				</a>
			),
		},
	];

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Indices Overview</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							{columns.map((column, index) => (
								<th
									key={`table_header_th_${index}`}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{column.name}
								</th>
							))}
						</tr>
					</thead>
					{stockData.length > 0 && !isfetching && (
						<tbody>
							{stockData.map((item, i) => (
								<tr key={item.id} className="hover:bg-gray-50">
									{columns.map((column, index) => (
										<td
											key={`table_header_td_${index}`}
											className="px-6 py-4 whitespace-nowrap"
										>
											{column.content(item, i)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					)}
				</table>

				{isfetching && (
					<div className="mt-4">
						<LoadingSpinner />
					</div>
				)}
			</div>
		</div>
	);
};

export default StockSummaryTable;
