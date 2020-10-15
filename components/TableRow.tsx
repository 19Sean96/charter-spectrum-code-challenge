import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableRow = (props: any) => {
    const { restaurant } = props;
    return (
        <article className="table--row">
            <div className="table--row--main">
                <p className="table--row__name">{restaurant.name}</p>
                <p className="table--row__city">{restaurant.city}</p>
                <p className="table--row__state">{restaurant.state}</p>
                <p className="table--row__phone">{restaurant.telephone}</p>
                <p className="table--row__genres">{restaurant.genre}</p>
            </div>
            <div className="table--row--more"></div>

            <button className="table--row--expand">
                <FontAwesomeIcon icon="angle-double-down" />
            </button>
        </article>
    )
}

export default TableRow