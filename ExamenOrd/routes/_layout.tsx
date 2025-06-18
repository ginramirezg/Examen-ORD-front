import { PageProps } from "$fresh/server.ts";

import Header from "../components/Header.tsx";


export default function Layout({Component}: PageProps) {
    return(
        <div>
            <Header />
            <div>
                <Component />
            </div>
           
        </div>
    );
}