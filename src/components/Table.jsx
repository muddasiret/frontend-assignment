const Table = ({
	paginatedData = [],
	handlePageChange = () => {},
	showPrevious = false,
	showNext = false,
}) => {
	return (
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
							<td
                                className="fund-percentage"
								style={{
									color: item["percentage.funded"] >= 100 ? "green" : "red",
								}}
							>
								{item["percentage.funded"]}%
							</td>
							<td>${item["amt.pledged"]}</td>
						</tr>
					);
				})}
			</table>
			<div className="pagination">
				{showPrevious && (
					<button
						onClick={() => {
							handlePageChange("previous");
						}}
					>
						Previous
					</button>
				)}

				{showNext && (
					<button
						onClick={() => {
							handlePageChange("next");
						}}
					>
						Next
					</button>
				)}
			</div>
		</>
	);
};

export default Table;
