import { useEffect, useState } from "react";
import "./App.css";
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
	}, [page]);

	const handlePageChange = (type = "next") => {
		if (type === "next") {
			setPage((page) => page + 1);
		} else {
			setPage((page) => page - 1);
		}
	};

	const isPreviousBtnDisabled = page === 0;
	const isNextBtnDisabled = page > apiData.length / PAGE_LIMIT - 1;

	return (
		<>
			<h3>Frontend assignment</h3>
			{paginatedData ? (
				<>
					<table>
						<tr>
							<th>S.No.</th>
							<th>Percentage funded</th>
							<th>Amount pledged</th>
						</tr>
						{paginatedData.map((item) => {
							return (
								<tr>
									<td>{item["s.no"]}</td>
									<td>{item["percentage.funded"]}</td>
									<td>{item["amt.pledged"]}</td>
								</tr>
							);
						})}
					</table>
					<div className="pagination">
						<button
							disabled={isPreviousBtnDisabled}
							onClick={() => {
								handlePageChange("previous");
							}}
						>
							Previous
						</button>
						<button
							onClick={() => {
								handlePageChange("next");
							}}
							disabled={isNextBtnDisabled}
						>
							Next
						</button>
					</div>
				</>
			) : (
				"Loading fund data"
			)}
		</>
	);
}

export default App;
