function removeNavBar(elementoABorrar) {
  if (elementoABorrar) {
    elementoABorrar.remove();
    console.log("Elemento eliminado.");
  } else {
    console.log("Elemento no existe.");
  }
}

function hideSideBar(elementoSidebar) {
  const button = document.createElement("button");
  // Add text/content to the button
  button.textContent = ">";
  elementoSidebar.style.display = "none";
  // Style the button and position it
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

  button.addEventListener("click", () => {
    if (button.textContent === ">") {
      button.textContent = "<";
      elementoSidebar.style.display = "flex";
    } else {
      button.textContent = ">";
      elementoSidebar.style.display = "none";
    }
  });
  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#45a049";
  });
  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "#4CAF50";
  });

  // Add the button to the document
  document.body.appendChild(button);
}

function modificarDOM() {
  console.log("Modificando el DOM...");
  const listaHijos = document.getElementById("root").childNodes[0].childNodes[0].childNodes[0].childNodes;
  const index = listaHijos.length - 1;
  setTimeout(() => {
    removeNavBar(listaHijos[index].childNodes[0]);
  }, 500);
  setTimeout(() => {
    hideSideBar(listaHijos[index].childNodes[0]);
  }, 500);
}

// Usar MutationObserver para detectar cambios en el DOM
const observer = new MutationObserver((_, observer) => {
  // Verificar si el elemento que buscamos ya está en el DOM
  if (document.getElementById("root") || document.querySelector("h1")) {
    // Si está, modificar el DOM y desconectar el observer
    modificarDOM();
    observer.disconnect();
  }
});

// Configurar el observer para observar cambios en el cuerpo del documento
observer.observe(document.body, {
  childList: true, // Observar cambios en los hijos del nodo
  subtree: true, // Observar en todo el subárbol del nodo
});

// También ejecutar modificarDOM() en DOMContentLoaded por si acaso
document.addEventListener("DOMContentLoaded", modificarDOM);
