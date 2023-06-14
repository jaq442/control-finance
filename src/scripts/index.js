import { insertedValues } from './valuesData.js'

//SOMA

export const createSum = (arraySumTotalValue) => {
    const sumArea = document.querySelector("#filters-value-add")
    sumArea.innerHTML = ''
    const sumTitle = document.createElement('p')
    const valueContainer = document.createElement('span')
    const sumCipher = document.createElement('p')
    const sumTotal = document.createElement('p')

    sumTitle.innerText = "Soma dos valores"
    valueContainer.id = "filters-value-area"
    sumCipher.id = "filters-value-target"
    sumCipher.innerText = "R$"
    sumTotal.id = "filters-value-total"

    valueContainer.append(sumCipher, sumTotal)
    sumArea.append(sumTitle, valueContainer)

    const totalValue = arraySumTotalValue.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

    const totalContainer = document.getElementById("filters-value-total")

    totalContainer.textContent = totalValue;
}

//FILTRO

export const filterItems = (array) => {
    const sumButton = document.querySelectorAll('.filters__btn')
    const items = document.querySelector('.filters__values') //ul
    const sumValue = document.querySelector('#filters-value-add')

    renderValue(array)
    createSum(array)
    
    sumButton.forEach(btn => {
        btn.addEventListener("click", (event) => {
            sumValue.innerHTML = ''
            items.innerHTML = ''
            if(event.target.innerText == "Saídas"){
            const outFiltered = array.filter(item => item.categoryID == 1)
            createSum(outFiltered)
            renderValue(outFiltered)
            if(document.querySelector(".filters__values").getElementsByTagName("li").length === 0){ // se não tiver li quando clicar no remove button
                const none = document.querySelector(".filters__values"); //acesso ul
                
                none.insertAdjacentHTML("afterbegin", `<li class="none"> 
                <h2>Nenhum valor cadastrado</h2>
                <p>Insira um valor</p>
                </li>`)
            }
            
            }
                
            if(event.target.innerText == "Entradas"){
                const inFiltered = array.filter(item => item.categoryID == 0)
                createSum(inFiltered)
                renderValue(inFiltered)
                if(document.querySelector(".filters__values").getElementsByTagName("li").length === 0){ // se não tiver li quando clicar no remove button
                    const none = document.querySelector(".filters__values"); //acesso ul
                    
                    none.insertAdjacentHTML("afterbegin", `<li class="none"> 
                    <h2>Nenhum valor cadastrado</h2>
                    <p>Insira um valor</p>
                    </li>`)
                }
            
            }

            if(event.target.innerText == "Todos"){
                
                createSum(insertedValues)
                renderValue(insertedValues)
                if(document.querySelector(".filters__values").getElementsByTagName("li").length === 0){ // se não tiver li quando clicar no remove button
                    const none = document.querySelector(".filters__values"); //acesso ul
                    
                    none.insertAdjacentHTML("afterbegin", `<li class="none"> 
                    <h2>Nenhum valor cadastrado</h2>
                    <p>Insira um valor</p>
                    </li>`)
                }
                
            }
        
            
            deleteValue(array)
        }
        
        )})
}


//CARDS VALORES

export function renderValue (arrayItems) { 
    const valuesArea = document.querySelector(".filters__values")
    valuesArea.innerHTML = ''

    arrayItems.forEach((item) => {     
       const card = createValueCard(item)     
    })

    const sumButton = document.querySelectorAll('.filters__btn')

    deleteValue(arrayItems)
}


function createValueCard (arrayItems) {
    const valuesArea = document.querySelector(".filters__values")

    const item = document.createElement('li')
    const valueContainer = document.createElement('span')
    const cipher = document.createElement('p')
    const value = document.createElement('p')
    const inOutContainer = document.createElement('span')
    const inOutValue = document.createElement('p')
    const deleteButton = document.createElement('button')
    const deleteImg = document.createElement('img')

    item.classList.add('filters__item')
    item.id = arrayItems.id
    valueContainer.classList.add('filters__container-value')
    cipher.innerText = "R$"
    cipher.classList.add('filters__value')
    value.innerHTML = arrayItems.value
    value.classList.add('filters__price')
    inOutContainer.classList.add('filters__value-line')
    inOutValue.classList.add('filters__in-out')
    
    if(arrayItems.categoryID == 0){
        inOutValue.innerText = "Entrada"
    } if (arrayItems.categoryID == 1){
        inOutValue.innerText = "Saída"
    }
    
    deleteButton.classList.add('filters__delete')
    deleteImg.dataset.valueId = arrayItems.id
    deleteImg.classList.add('deleteImg')
    deleteImg.src = "./src/assets/trash.svg"
    
    valueContainer.append(cipher, value)
    deleteButton.appendChild(deleteImg)
    inOutContainer.append(inOutValue, deleteButton)
    item.append(valueContainer, inOutContainer)
    valuesArea.appendChild(item)
    
}



//DELETE

function deleteValue(array) {
    const deleteBtns = document.querySelectorAll('.deleteImg')

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            
        const valueId = Number(event.target.dataset.valueId) //transformar id do botão em numero

        const index = insertedValues.findIndex(value => { //index do elemento-value
           return value.id === valueId
        })
        
        array.splice(index, 1)

        filterItems(array)

        
        if(document.querySelector(".filters__values").getElementsByTagName("li").length === 0){ // se não tiver li quando clicar no remove button
            const none = document.querySelector(".filters__values"); //acesso ul
            
            none.insertAdjacentHTML("afterbegin", `<li class="none"> 
            <h2>Nenhum valor cadastrado</h2>
            <p>Insira um valor</p>
            </li>`)
            
        }})
    })
}



filterItems(insertedValues)








