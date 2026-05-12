import './styles/pages.css';
import { BrowserRouter, Routes, Route } from "react-router";
import { WatchListPage } from "@/routes/watch-page";
import { HomePage } from "@/routes/home-page";
import { AppLayout } from "./app-layout";

export function App() {
    return(
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/watch" element={<WatchListPage />} />
                    <Route path="/watch:id" element={<WatchListPage />} />
                </Routes>
            </AppLayout>    
        </BrowserRouter>
    );
}