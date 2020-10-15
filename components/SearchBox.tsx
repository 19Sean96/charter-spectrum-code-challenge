import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'

interface SearchInput {
    value: string;
    focused: boolean
}

const SearchBox = ( props:any ) => {
    const [searchInput, handleSearchInput] = useState<SearchInput>({value: '', focused: false})

    const handleKeyPress = (e: any) => {
        e.preventDefault();
        console.log(typeof e);

        if (e.keyCode == 13) {
 
        } else {
            handleSearchInput({value: e.target.value, focused: searchInput.focused})
        }
    }

    return (
        <div className={props.className} style={{
            borderRadius: searchInput.focused ? "10px" : "40px"
        }}>
            <input type="text" name="search" id="search" className={`${props.className}--input`} 
                onKeyUp={handleKeyPress} 
                onFocus={() => handleSearchInput({value: searchInput.value, focused: true})}
                onBlur={() => handleSearchInput({value: searchInput.value, focused: false})}
            />
            <label htmlFor="search" style={{
                transform: `translate(0, ${(searchInput.value.length > 0 || searchInput.focused) ? "-250%" : "-50%"}`
            }}>Name, City or Genre</label>
            <FontAwesomeIcon icon="search" />
        </div>
    )
}

export default SearchBox

