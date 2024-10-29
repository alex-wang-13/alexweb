import { isMobile } from 'react-device-detect';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light p-3">
            <a className="navbar-brand">AlextheDev</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="/posts">Posts</a></li>
                    {!isMobile && <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Games
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/scrabble">Scrabble</a></li>
                            <li><a className="dropdown-item" href="/crossword">Crossword</a></li>
                        </ul>
                    </li>}
                </ul>
            </div>
        </nav>
    );
};

export default Header;