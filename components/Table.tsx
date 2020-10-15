import { Scrollbars } from "react-custom-scrollbars";
import TableRow from "./TableRow";
const Table = (props: any) => {
	const { restaurants } = props;
	return (
		<div className="table__wrapper">
			<div className="table--heading">This is the table heading</div>
			<Scrollbars
				style={{ width: "100%", height: "100%" }}
				universal={true}
			>
				{restaurants.map((restaurant: any, index: number) => {
					return (
						<div key={index}
							className={`table--row__wrapper table--row__wrapper--${
								index % 2 == 0 ? "even" : "odd"
							}`}
						>
							<TableRow  restaurant={restaurant} />
						</div>
					);
				})}
			</Scrollbars>
		</div>
	);
};

export default Table;
