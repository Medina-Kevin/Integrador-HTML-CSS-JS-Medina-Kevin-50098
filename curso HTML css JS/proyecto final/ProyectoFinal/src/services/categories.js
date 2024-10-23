import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

/* === CATEGORIAS ===*/
const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el) => el.categories == categoryIn)
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
            const resultPrecioMayor = products.sort((a,b)=>b.precio - a.precio)
            handleRenderList(resultPrecioMayor);
            break;
        case "menorPrecio":
            const resultPrecioMenor = products.sort((a,b)=>a.precio - b.precio)
            handleRenderList(resultPrecioMenor);
            break;
    }
}

//render de la vista categorias
export const renderCategories = () => {
    const ulList = document.getElementById('listFilter');
    ulList.innerHTML = `
    <li id="Todo">Todos los elementos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="mayorPrecio">Mayor precio</li>
    <li id="menorPrecio">Menor precio</li>
    `;
    //Aca añadimos el evento de click a cada elemento li de la lista
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener('click', () => {
            handleClick(liElement);
        });
    });
    //Este metodo lo que hace es permitirnos hacer click a cada li de la lista, y si ya lo tiene se lo saca
    const handleClick = (elemento) => {
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el) => {
            if (el.classList.contains('liActive')) {
                el.classList.remove("liActive")
            } else {
                if (elemento === el) {
                    el.classList.add("liActive");
                }
            }
        })
    }
};