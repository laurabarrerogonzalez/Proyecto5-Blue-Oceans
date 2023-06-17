document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario
  
    var commentInput = document.getElementById("commentInput");
    var commentTableBody = document.querySelector("#commentTable tbody");
  
    var commentText = commentInput.value;
  
    // Crear una nueva fila de comentario en la tabla
    var row = commentTableBody.insertRow();
    var commentCell = row.insertCell();
    commentCell.textContent = commentText;
  
    // Crear celda para las acciones
    var actionsCell = row.insertCell();
    actionsCell.className = "actions";
  
    // Crear botón de modificar
    var editButton = document.createElement("button");
    editButton.textContent = "Modificar";
    editButton.addEventListener("click", function() {
      // Obtener el texto del comentario y colocarlo en el textarea para su modificación
      commentInput.value = commentCell.textContent;
  
      // Eliminar la fila de comentario de la tabla
      row.remove();
    });
    actionsCell.appendChild(editButton);
  
    // Crear botón de eliminar
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function() {
      // Eliminar la fila de comentario de la tabla
      row.remove();
    });
    actionsCell.appendChild(deleteButton);
  
    commentInput.value = ""; // Limpiar el área de texto después de enviar el comentario
  });