import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="search-line">
        <form className="search-form">
          <input className="search-input" type="search"></input>
          <button className="search-button" type="submit"></button>
        </form>
      </div>
    </header>
  );
}
