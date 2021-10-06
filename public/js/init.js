document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var modal = document.querySelectorAll('.modal');
    var instances = M.Sidenav.init(elems);
    var instance = M.Modal.init(modal);
  });