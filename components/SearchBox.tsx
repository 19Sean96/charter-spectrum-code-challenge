import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";

interface SearchInput {
	value: string;
	focused: boolean;
}

const SearchBox = (props: any) => {

    const { handleSearchQuery } = props

	const [searchInput, handleSearchInput] = useState<SearchInput>({
		value: "",
		focused: false,
    });
    
    const [ checked, setChecked ] = useState(true)

    const ref = useRef(null)
	const handleKeyPress = (e: any) => {
		e.preventDefault();
		console.log(typeof e);

		if (e.keyCode == 13) {
		} else {
			handleSearchInput({
				value: e.target.value,
				focused: searchInput.focused,
			});
		}
	};

	return (
		<>
			<div
				className={props.className}
				style={{
					borderRadius: searchInput.focused ? "10px" : "40px",
				}}
			>
				<input
                    ref={ref}
					type="text"
					name="search"
					id="search"
					className={`${props.className}--input`}
					onKeyUp={handleKeyPress}
					onFocus={() =>
						handleSearchInput({
							value: searchInput.value,
							focused: true,
						})
					}
					onBlur={() =>
						handleSearchInput({
							value: searchInput.value,
							focused: false,
						})
					}
				/>
				<label
					htmlFor="search"
					style={{
						transform: `translate(0, ${
							searchInput.value.length > 0 || searchInput.focused
								? "-250%"
								: "-50%"
						}`,
					}}
				>
					Name, City or Genre
				</label>
				<FontAwesomeIcon icon="search" onClick={e => {
                    handleSearchQuery(checked, searchInput.value)

                    ref.current.value = ''
                    handleSearchInput({
                        value: ref.current.value,
                        focused: searchInput.focused
                    })
                    
                }}/>
			</div>
            <button className="clear-search" onClick={(e) => {
                ref.current.value = ''
                handleSearchInput({
                    value: ref.current.value,
                    focused: searchInput.focused
                })
            }}>Clear Search</button>
			<div className="header--searchbox__toggle-filters">
				<input
                    onChange={e => setChecked(!checked)}
					type="checkbox"
					name="includeFilter"
                    id="includeFilter"
                    checked={checked}
				/>
				<label htmlFor="includeFilter">Include Filter?</label>
			</div>
		</>
	);
};

export default SearchBox;
