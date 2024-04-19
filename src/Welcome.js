import axios from "axios";
import md5 from "crypto-js/md5";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import "./styles.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const ts = new Date().getTime();
    const publicKey = "24d3da66262ae4148d898bab039deb64";
    const privateKey = "03639abab97a30206fb4c2aee36982293bc17c0f";
    const hash = md5(ts + privateKey + publicKey).toString();

    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      )
      .then((response) => {
        setProductos(response.data.data.results);
        setFilteredProducts(response.data.data.results);
      })
      .catch((error) => {
        console.error("Error al cargar los datos de la API de Marvel", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredProducts(productos);
      setShowSearchHistory(false);
    } else {
      setFilteredProducts(
        productos.filter((producto) =>
          producto.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
      setShowSearchHistory(true);
    }
  };

  const handleSearchSelection = (term) => {
    setSearchTerm(term);
    setFilteredProducts(
      productos.filter((producto) =>
        producto.title.toLowerCase().includes(term.toLowerCase())
      )
    );
    setShowSearchHistory(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory([searchTerm, ...searchHistory]);
    }
    setShowSearchHistory(false);
  };

  return (
    <div>
      <nav className="navbar" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar cómic..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowSearchHistory(true)}
          />
          {showSearchHistory && (
            <ul className="search-history">
              {searchHistory.map((item, index) => (
                <li key={index} onClick={() => handleSearchSelection(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </form>
      </nav>
      <div className="product-grid">
        {filteredProducts.map((producto) => (
          <div className="product-card" key={producto.id}>
            <img
              src={`${producto.thumbnail.path}.${producto.thumbnail.extension}`}
              alt={producto.title}
            />
            <div className="product-info">
              <h3>{producto.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
