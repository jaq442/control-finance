import { insertedValues } from "./valuesData.js"
import { renderValue, createSum, filterItems } from './index.js'

const handleModal = () => {
    const openModal = document.querySelector('#menu-btn')
    const modal = document.querySelector(".modal__controller")

    openModal.addEventListener('click', (e) => modal.showModal())

    closeModal ()
}


const closeModal = () => {
    const closeButton = document.querySelector('.modal__close')
    const modalClose = document.querySelector('.modal__controller')
    const cancelButton = document.querySelector('#modal-btn-cancel')

    closeButton.addEventListener('click', (event) => {
        event.preventDefault()
        modalClose.close()
    })
    cancelButton.addEventListener('click', (event) => {
        event.preventDefault()
        modalClose.close()
    })

}


const handleRegisterValue = (array) => {
    const inputValue = document.querySelector('.modal__value')
    const insertButton = document.getElementById('modal-btn-insert')
    const modal = document.querySelector(".modal__controller")
    
    
    insertButton.addEventListener('click', (event) => {
        let newValue = {}
       
        event.preventDefault()
        
        newValue.id = array.length + 1
        
        
        newValue[inputValue.name] = Number(inputValue.value)

            const modalIn = document.querySelector('#modal-in')
            const modalOut = document.querySelector('#modal-out')         

            if(modalIn.checked){
                newValue.categoryID = 0
            } if (modalOut.checked) {
                newValue.categoryID = 1
            }
            
            array.push(newValue)

            console.log(insertedValues)
            
            renderValue(array)
            createSum(array)
            filterItems(array)
            
            inputValue.value = ''
            modal.close()
    })

}
    

handleModal()
handleRegisterValue(insertedValues)
    
    

