import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <nav>
                <p><Link to="/dashboard">dashboard</Link></p>
            </nav>
        </>
    );
}