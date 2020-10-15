import SearchBox from './SearchBox'

const Header = ( props:any ) => {

    return (
        <header className="header">
            <SearchBox      
                className="header--searchbox" 
                handleSearchQuery={props.handleSearchQuery}
            />

            <h1 className="header--title">Restaurant Viewer</h1>
        </header>
    )
}

export default Header