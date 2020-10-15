import { Scrollbars } from "react-custom-scrollbars";
import TableRow from "./TableRow";
const Table = (props: any) => {
	const { restaurants } = props;
	return (
		<div className="table__wrapper">
			<div className="table--heading">
				<div className="table--heading--col table--heading__name">
					name
				</div>
				<div className="table--heading--col table--heading__city">
					city
				</div>
				<div className="table--heading--col table--heading__state">
					state
				</div>
				<div className="table--heading--col table--heading__phone">
					phone #
				</div>
				<div className="table--heading--col table--heading__genres">
					genres
				</div>
				<span className="table--heading--underline"></span>
			</div>
			<div className="table--data">
				<Scrollbars
					style={{ width: "100%", height: "100%" }}
					universal={true}
				>
					{restaurants.length > 0 ? restaurants.map((restaurant: any, index: number) => {
						return (
							<div
								key={index}
								className={`table--row__wrapper table--row__wrapper--${
									index % 2 == 0 ? "even" : "odd"
								}`}
							>
								<TableRow restaurant={restaurant} />
							</div>
						);
					}) : (
						<div className="no-results">No Results Found </div>
					)}
					<span></span>
				</Scrollbars>
			</div>
		</div>
	);
};

export default Table;
