const inputValue = document.getElementById("input_anime")
const form = document.getElementById("form")
const button_search = document.getElementById("submit_anime")
const container = document.getElementById("container")
const aside = document.getElementById("aside");

window.addEventListener("load", ()=>{
        fetch(`https://api.jikan.moe/v4/recommendations/anime`)
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(res =>{
            const fragment = document.createDocumentFragment()
            const list_container = document.createElement("UL")
            list_container.classList.add("list_container-styles")
            for(let i=0; i<7;i++){
                let randomNum=Math.round(Math.random()*99)
                const div = document.createElement("DIV")
                const div_aux = document.createElement("DIV")
                const list_item = document.createElement("LI");
                const parag = document.createElement("A")
                const img = document.createElement("IMG")
                img.classList.add("image_recomm-styles")
                parag.href=res.data[randomNum].entry[0].url;
                parag.target="_blank"
                parag.textContent=res.data[randomNum].entry[0].title;
                div_aux.classList.add("div_aux")
                img.classList.add("aside_bg_anime")
                img.setAttribute("src", res.data[randomNum].entry[0].images.webp.image_url)
                list_item.classList.add("list_item-styles")
                parag.classList.add("list_item-title")
                div.classList.add("list_content")
                div_aux.append(parag)
                div.append(div_aux)
                div.append(img)
                list_item.append(div)
                fragment.append(list_item)
            }
            list_container.append(fragment)
            aside.appendChild(list_container)
        })
    
})

form.addEventListener("click", (e)=>{
    e.preventDefault()
})

button_search.addEventListener("click", ()=>{
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue.value}&sfw`)
    .then(res =>res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res =>{
            if(res.data.length==0) form.classList.add("active")
            else  form.classList.remove("active")
            const contenido = document.createElement("DIV")
            contenido.classList.add("content")
            container.replaceChildren(contenido,contenido)
            const fragment = document.createDocumentFragment()
            for(const aux of res.data){
                const div = document.createElement("DIV")
                const img = document.createElement("IMG")
                const parag = document.createElement("A")
                parag.href=aux.url;
                parag.target="_blank"
                parag.classList.add("title")
                div.classList.add("card")
                img.classList.add("bg_anime")
                parag.textContent=aux.title
                img.setAttribute("src", aux.images.webp.image_url )
                div.appendChild(img)
                div.appendChild(parag)
                fragment.appendChild(div)
            }
            contenido.appendChild(fragment);
        })
})