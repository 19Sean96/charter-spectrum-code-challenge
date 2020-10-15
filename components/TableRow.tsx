import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {useSpring, animated} from "react-spring"
const TableRow = (props: any) => {
    const [ expanded, setExpanded ] = useState(false)
    const { restaurant } = props;

    const expanding = useSpring({
        // transform: expanded ? "scaleY(1)" : "scaleY(0)",
        height: expanded ? "230px" : "0px"
    })

	return (
		<article className="table--row">
			<div className="table--row--main">
				<p className="table--row__name">{restaurant.name}</p>
				<p className="table--row__city">{restaurant.city}</p>
				<p className="table--row__state">{restaurant.state}</p>
				<p className="table--row__phone">{restaurant.telephone}</p>
				<p className="table--row__genres">{restaurant.genre}</p>
			</div>
			<hr />
			<animated.div className="table--row--more" style={expanding}>
				<div className="table--row__address">
					<p className="table--row__address--title">address</p>
					<p className="table--row__address--details">
						{restaurant.address1}
					</p>
				</div>
				<div className="table--row__attire">
					<p className="table--row__attire--title">attire</p>
					<p className="table--row__attire--details">
						{restaurant.attire}
					</p>
				</div>
				<div className="table--row__hours">
					<p className="table--row__hours--title">hours</p>
					<p className="table--row__hours--details">
						{restaurant.hours}
					</p>
				</div>
				<div className="table--row__website">
					<p className="table--row__website--title">website</p>
					<a href={restaurant.website} target="_blank" className="table--row__website--details">
						{restaurant.website}
					</a>
				</div>
			</animated.div>

			<button style={{
                transform: `translateY(30%) rotate(${expanded ? "180deg" : "0deg"})`
            }} className="table--row--expand" onClick={() => setExpanded(!expanded)}>
				<FontAwesomeIcon icon="angle-double-down" />
			</button>
		</article>
	);
};

export default TableRow;
