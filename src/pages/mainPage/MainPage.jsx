import React from 'react'
import { useRef, useState} from 'react'
import classes from './MainPage.module.css'

export default function MainPage() {
    const [elements, setElements] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)

    const inpRef = useRef(null)
    const btnRef = useRef(null)
    const lstRef = useRef(null)
    const changeRef = useRef(null)


    function add (){
        const el = inpRef.current.value
        if(el.trim()){
            setElements((prev) => ([...prev, {id: Date.now(), value : el}]))
        }

        inpRef.current.value = ''
        disabled()
    }

    function disabled(){
        if(inpRef.current.value !== ''){
            setIsDisabled(() => false)
        }else{
            setIsDisabled(() => true)
        }
    }

  const change = (id) =>{
    const newName = inpRef.current.value
    if(newName.trim()){
        setElements((prev) => prev.map((item) => item.id === id ? {...item, value:newName}: item))
    }
    inpRef.current.value = ''
  }


    return(
        <div>
            <h1>Список</h1>
            <input ref={inpRef} onChange={disabled} type="text" placeholder='Введите своё имя'/>
            <button disabled={isDisabled} ref={btnRef} onClick={add}>Добавить</button>

            
            <div ref={lstRef}>
                {elements.length ?
                    elements.map((item) => (
                    <div className={classes.list}>
                        <h1>{item.value} <button disabled={isDisabled} onClick={() => change(item.id)} ref={changeRef}>Поменять</button></h1>
                    </div>
                    ))
                : <h1>Список пуст</h1>}
            </div>
        </div>
    )

}