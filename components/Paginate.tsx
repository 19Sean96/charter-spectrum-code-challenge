import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Paginate = (props: any) => {
	const { pages, updatePages } = props;
	return (
		<div className="paginate">
			<h3 className="paginate--title">page</h3>
			<div className="paginate--controls">
				<button
					className="paginate--controls--prev"
					onClick={(e) => {
                        
						pages.current > 1 && updatePages({
							current: pages.current - 1,
							total: pages.total,
						});
					}}
				>
					<FontAwesomeIcon icon="arrow-alt-circle-left" />
				</button>
				<div className="paginate--controls--status">
					<span>
						{pages.current}/{pages.total}
					</span>
				</div>
				<button
					className="paginate--controls--next"
					onClick={(e) => {
                        // console.log(pages.current++);

						pages.current < pages.total && updatePages({
							current: pages.current + 1,
							total: pages.total,
						});
					}}
				>
					<FontAwesomeIcon icon="arrow-alt-circle-right" />
				</button>
			</div>
		</div>
	);
};

export default Paginate;
