import { renderCategories } from "./src/services/categories";
import { handleSearchProductByName } from "./src/services/searchBar";
import { openModal } from "./src/views/modal";
import { handleGetProductsToStore } from "./src/views/store";
import './style.css'

/* === APLICACION ===*/

export let categoriaActiva = null;
export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};
export let productoActivo = null;
export const setproductoActivo = (productoIn) => {
    productoActivo = productoIn;
};


handleGetProductsToStore();
renderCategories();

//HEADER    
const buttonAdd = document.getElementById('buttonAddElement');
buttonAdd.addEventListener("click", () => {
    openModal();
})

//buttonsearch
const header_buttonSearch = document.getElementById('header_buttonSearch');
header_buttonSearch.addEventListener("click", () => {
    handleSearchProductByName()
});