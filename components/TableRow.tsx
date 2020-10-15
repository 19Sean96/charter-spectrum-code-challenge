const TableRow = (props: any) => {

    return (
        <article className="table--row">
            <p>{props.restaurant.name}</p>
        </article>
    )
}

export default TableRow