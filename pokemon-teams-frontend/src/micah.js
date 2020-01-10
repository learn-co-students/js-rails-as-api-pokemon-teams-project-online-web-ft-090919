class PageManager{
  ​
  ​
      constructor(){
          this.container = document.querySelector('#root')
          this.renderStaticHTML()
          this.initBindingsAndEventListeners()
          
      }
  ​
  ​
      initBindingsAndEventListeners(){
  ​
          this.button = document.querySelector('#click-me')
  ​
  ​
          this.button.addEventListener('click', this.handleClick.bind(this))
  ​
      }
  ​
      checkRes(res){
          if(!res.ok){
              throw res
          }
      }
  ​
  ​
      renderSpinner(){
          this.container.innerHTML += `<div class="loader"></div>`
      }
  ​
      removeSpinner(){
          this.container.removeChild(document.querySelector(".loader"))
      }
  ​
      async fetchAndLoadData(){
  ​
          try{
              this.renderSpinner()
              const res = await fetch('http://localhost:3000/masses')
              this.checkRes(res)
              const jobj = await res.json()
              this.data = jobj
              this.removeSpinner()
              this.render()
  ​
          }catch(err){
              alert(err)
              this.removeSpinner()
          }
          
  ​
      }
  ​
      handleClick(e){
          this.fetchAndLoadData()
      }
  ​
      render(){
          this.container.innerHTML += this.data
      }
  ​
  ​
      renderStaticHTML(){
          this.container.innerHTML = (`
              <h2>Hello World!</h2>
              <button id="click-me">Click Me!</button>
          `)
      }
  ​
  ​
  ​
  ​
  ​
  }