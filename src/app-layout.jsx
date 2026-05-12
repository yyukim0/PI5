import { Link } from "react-router";
import { Teste } from "./components/Teste";


export function AppLayout({ children = null }) {
    return (
        <div>
            <header>
                <h1>PI5 Front End</h1>
            </header>
            <nav style={{ gap: "1em", display: "flex", flexDirection: "row"}}>
                <Link to="/">Home</Link>
                <Link to="/watch">Watch</Link>
            </nav>
            <Teste/>
            <hr />
            <main>{children}</main>
        </div>
    )
}