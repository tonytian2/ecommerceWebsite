
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Home = ({ products }) => {
    const {search, setSearch } = useContext(DataContext)
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Products</label>
                <input
                    id="search"
                    type="text"
                    placeholder=""
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
    )
}

export default Home