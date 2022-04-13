import React from "react";
import Catalog from "../components/Catalog";
import Search from "../components/Search";
const CatalogPage: React.FC = () => {
  return (
    <div className="catalogPage">
      <Search />
      <Catalog />
    </div>
  );
};

export default CatalogPage;
