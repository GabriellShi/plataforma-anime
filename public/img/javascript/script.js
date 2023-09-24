//-------------------------- Definindo o Botão de Scroll para o topo da pagina ----------------------------------

window.addEventListener('scroll', function() {
    let scroll = this.document.querySelector('.scrollTop')
        scroll.classList.toggle('active', window.scrollY > 450)
  })
  
  function backTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

