export class Router {
    routes = {}
    
    add(routeName, page) {
        this.routes[routeName] = page        
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }
    
    handle() {
        const body = document.querySelector('body')
        const { pathname } = window.location
        const route =  this.routes[pathname] || this.routes[404]
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
        function resetBg() {
            body.classList.remove("home")
            body.classList.remove("universe")
            body.classList.remove("exploration")
        }
        let fundo = pathname.length
        let nome
        if (fundo == 1) {
            nome = "home"
        }else if(fundo == 9) {
            nome = "universe"            
        }else {
            nome = "exploration"            
        }
        resetBg()
        body.classList.add(nome)
        
    }
    
}
