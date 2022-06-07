import { Link } from "react-router-dom";

function render() {
    return (
        <nav>
            <Link color="primary" to="/">Game</Link>
            <Link to="/products">Products</Link>
            <Link to="/warning">Warning</Link>
            <Link to="/clock">Clock</Link>
            <Link to='/login'>Login</Link>
            <Link to='/lists'>Lists</Link>
            <Link to='/forms'>Forms</Link>
        </nav>
    );
}

export default render;