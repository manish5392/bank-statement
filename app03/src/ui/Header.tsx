//import type { FC } from "react";

type HeaderProps =  { appTitle: string };

//const Header : FC<HeaderProps> = ({ appTitle }) => (

const Header = ({ appTitle }:HeaderProps) => (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">{appTitle}</a>            
        </div>
    </nav>
);

export default Header;