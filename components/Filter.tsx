
const Filter = (props: any) => {
    const { attire, genres, states } = props.filterList
    console.log(attire, genres, states);
    return (
        <div className="filters">
            <h2 className="filters--title">filters</h2>
            <div className="filters--options">
                <div className="filter--options--state">
                    <label htmlFor="state-select">state:</label>
                    <select name="state" id="state-select">
                        <option value="all">--all--</option>
                        {
                            states.map((state:string) => <option key={state} value={state}>{state}</option>)
                        }
                    </select>
                </div>
                <div className="filter--options--genre">
                    <label htmlFor="genre-select">genre:</label>
                    <select name="genre" id="genre-select">
                        <option value="all">--all--</option>
                        {
                            genres.map((genre:string) => <option key={genre} value={genre}>{genre}</option>)
                        }
                    </select>
                </div>
                <div className="filter--options--attire">
                    <label htmlFor="attire-select">attire:</label>
                    <select name="attire" id="attire-select">
                        <option value="all">--all--</option>
                        {
                            attire.map((attireItem:string) => <option key={attireItem} value={attireItem}>{attireItem}</option>)
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filter