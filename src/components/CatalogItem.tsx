import { Link } from "react-router-dom";
import { heroesType } from "./../types/heroes";
import "../css/catalogItem.css";

interface itemTypes {
  heroesData: heroesType;
}

const CatalogItem: React.FC<itemTypes> = ({ heroesData }) => {
  return (
    <div className="catalog-item">
      <Link className="link" to={`/Hero/${heroesData.id}`}>
        <img
          className="catalog-item__image"
          src={heroesData.image.url}
          alt=""
        />
        <div className="catalog-item__title">{heroesData.name}</div>
      </Link>
    </div>
  );
};

export default CatalogItem;
