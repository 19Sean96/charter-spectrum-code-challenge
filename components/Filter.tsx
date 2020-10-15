import { useState, useEffect } from "react";

const Filter = (props: any) => {
	const { attire, genres, states } = props.filterList;
    console.log(attire, genres, states);
    
    const [filters, updateFilters] = useState(props.currentFilter)

    useEffect(() => {
        props.setCurrentFilter(filters)
    }, [filters])
    
	return (
		<div className="filters">
			<h2 className="filters--title">filters</h2>
			<div className="filters--options">
				<div className="filters--options--state filters--options--row">
					<label htmlFor="state-select">state:</label>
					<select name="state" id="state-select" onChange={e => updateFilters({
                        alpha: filters.alpha,
                        attire: filters.attire,
                        genres: filters.genres,
                        states: e.target.value
                    })}>
						<option value="all">-ALL-</option>
						{states.map((state: string) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
				</div>
				<div className="filters--options--genre filters--options--row">
					<label htmlFor="genre-select">genre:</label>
					<select name="genre" id="genre-select" onChange={e => updateFilters({
                        alpha: filters.alpha,
                        attire: filters.attire,
                        genres: e.target.value,
                        states: filters.states
                    })}>
						<option value="all">-ALL-</option>
						{genres.map((genre: string) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
				<div className="filters--options--attire filters--options--row">
					<label htmlFor="attire-select">attire:</label>
					<select name="attire" id="attire-select" onChange={e => updateFilters({
                        alpha: filters.alpha,
                        attire: e.target.value,
                        genres: filters.genres,
                        states: filters.states
                    })}>
						<option value="all">-ALL-</option>
						{attire.map((attireItem: string) => (
							<option key={attireItem} value={attireItem}>
								{attireItem}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default Filter;
