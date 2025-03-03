import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import TableLoader from "./components/TableLoader";
const PAGE_LIMIT = 5;

function App() {
	const [apiData, setApiData] = useState(null);
	const [paginatedData, setPaginatedData] = useState(null);
	const [page, setPage] = useState(0);

	useEffect(() => {
		async function getData() {
			const url =
				"https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}
				const parsedResponse = await response.json();
				setApiData(parsedResponse);
				setPaginatedData(parsedResponse.slice(0, PAGE_LIMIT));
			} catch (error) {
				console.error(error.message);
			}
		}
		getData();
	}, []);

	useEffect(() => {
		if (apiData) {
			setPaginatedData(
				apiData.slice(PAGE_LIMIT * page, (page + 1) * PAGE_LIMIT)
			);
		}
	}, [apiData, page]);

	const handlePageChange = (type = "next") => {
		if (type === "next") {
			setPage((page) => page + 1);
		} else {
			setPage((page) => page - 1);
		}
	};

	const showPrevious = page !== 0;
	const showNext = page <= apiData?.length / PAGE_LIMIT - 1;

	return (
		<>
			<h2>SaaSLabs Frontend assignment</h2>
			{paginatedData ? (
				<Table
					paginatedData={paginatedData}
					handlePageChange={handlePageChange}
					showPrevious={showPrevious}
					showNext={showNext}
				/>
			) : (
				<TableLoader />
			)}
		</>
	);
}

export default App;
