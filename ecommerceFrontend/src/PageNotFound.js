import { Link } from "react-router-dom";

function PageNotFound() {
    return (
      <div>
            <h2>404 Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
      </div>
    )
    }
    
export default PageNotFound