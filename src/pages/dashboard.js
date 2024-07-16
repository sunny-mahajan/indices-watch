import React, { useState } from "react";

import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Layout from "@/components/layout";
import StockSummaryTable from "@/components/StockSummaryTable";
import LoadingSpinner from "@/components/LoadingSpinner";

const Dashboard = () => {
	const [indexData, setIndexData] = useState(null);
	const [name, setName] = useState(null);
	const [isfetching, setIsFetching] = useState(false);

	const convertToEstAndFormat = (timestamp) => {
		let date = new Date(timestamp);

		// Options for formatting the date to show only the hour in 12-hour format with AM/PM
		let options = {
			hour: "numeric",
			hour12: true,
			timeZone: "America/New_York", // EST timezone
		};

		// Use the toLocaleTimeString method to format the date
		return date.toLocaleTimeString("en-US", options);
	};

	const fetchDetail = async (ticker, name) => {
		setIsFetching(true);
		setName(name);
		const data = await fetch(`/api/index/${ticker}`).then((res) =>
			res.json()
		);
		setIsFetching(false);
		let chartData = null;

		if (data?.status == "OK") {
			chartData = {
				labels: data.results.map((d) => convertToEstAndFormat(d.t)),
				datasets: [
					{
						label: "Index Value",
						data: data.results.map((d) => d.c),
						borderColor: "rgba(75, 192, 192, 1)",
						backgroundColor: "rgba(75, 192, 192, 0.2)",
						fill: true,
					},
				],
			};
		} else {
			toast(data?.message);
		}

		setIndexData(chartData);
	};

	return (
		<Layout>
			<StockSummaryTable onPreview={fetchDetail} />

			{isfetching && <LoadingSpinner />}

			{indexData && !isfetching && (
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-3xl font-bold text-gray-900">
							{name}
						</h1>
					</div>
					<div className="card">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Index Value for the Day
						</h2>
						<Line data={indexData} />
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Dashboard;
