function loadContent(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        document.getElementById('content').innerHTML = this.responseText;
      }
    };
    xhttp.open('GET', page + '.html', true);
    xhttp.send();
  }
  
  // Manejo de eventos de clic en los enlaces de navegación
  
  document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('nav ul li a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        var page = this.getAttribute('href').substring(1);
        loadContent(page);
      });
    }
  });
  

  
  