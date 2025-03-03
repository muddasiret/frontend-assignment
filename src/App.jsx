import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [tableData, setTableData] = useState(null);

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
				setTableData(parsedResponse);
			} catch (error) {
				console.error(error.message);
			}
		}
		getData();
	}, []);

	return (
		<>
			<h3>Frontend assignment</h3>
			{tableData ? (
				<table>
					<tr>
						<th>S.No.</th>
						<th>Percentage funded</th>
						<th>Amount pledged</th>
					</tr>
					{tableData.map((item) => {
						return (
							<tr>
								<td>{item["s.no"]}</td>
								<td>{item["percentage.funded"]}</td>
								<td>{item["amt.pledged"]}</td>
							</tr>
						);
					})}
				</table>
			) : (
				"Loading fund data"
			)}
		</>
	);
}

export default App;
