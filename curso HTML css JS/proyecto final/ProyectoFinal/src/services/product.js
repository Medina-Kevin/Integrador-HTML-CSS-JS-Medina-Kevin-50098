import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";
import Swal from "sweetalert2";
//Guardamos
const aceptButton = document.getElementById('aceptButton');
aceptButton.addEventListener('click', () => {
    handleSaveOrModifyElement();
});

//Funcion de guardar
const handleSaveOrModifyElement = () => {
    const nombre = document.getElementById('nombre').value,
        imagen = document.getElementById('img').value,
        precio = document.getElementById('precio').value,
        categories = document.getElementById('categoria').value;
    let object = null;
    if (productoActivo) {
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categories,
        }
    } else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories,
        };
    }
    Swal.fire({
        title: "Perfecto!",
        text: "Elemento guardado correctamente!",
        icon: "success"
    });
    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
};

//Eliminar elemento
export const handleDeleteProduct = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "¿Desea eliminar el elemento?",
        text: "Si lo eliminas será de forma permanente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si,eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            //Setear el nuevo array
            localStorage.setItem('products', JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();
        } else {
            closeModal();
        }
    });
};
