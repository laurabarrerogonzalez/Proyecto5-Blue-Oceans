document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var form = document.getElementById('imageForm');
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('Imagen subida exitosamente.');
            form.reset();
        } else {
            alert('Error al subir la imagen.');
        }
    };
    xhr.send(formData);
});