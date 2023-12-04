import Feed from './Feed';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Home = ({ products }) => {
    const {searchResults} = useContext(DataContext)
    return (
        <main className="Home">
            {searchResults.length ? (
                <Feed products={searchResults} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No product to display.
                </p>
            )}
        </main>
    )
}

export default Home