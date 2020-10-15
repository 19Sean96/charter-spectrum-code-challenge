import SearchBox from './SearchBox'

const Header = ( props ) => {

    return (
        <header className="header">
            <SearchBox className="header--searchbox" />
            <h1 className="header--title">Restaurant Viewer</h1>
        </header>
    )
}

export default Header