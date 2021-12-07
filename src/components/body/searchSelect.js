import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import './searchSelect.css'

export const SearchSelect = ({ data = [], updateMap }) => {
    const [selected, setsSelected] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [inputString, setinputString] = useState('')

    const addInSelected = (data) => {
        const set = [...new Set([...selected, data])];
        setsSelected(set);
        // setsSelected([...selected, data]);
        updateMap(set)
    }
    const onChangeHandler = (e) => {
        setisOpen(isOpen ? true : true)
        setinputString(e.target.value.toUpperCase())
    }
    useEffect(() => {
        // Cleanup
        setsSelected([])
        setisOpen(false)
        setinputString('')
    }, [data]);
    return (
        <div className="" style={{
            position: 'relative',

        }}>
            <div className='' style={{ display: 'flex', flexDirection: Row }}>
                <input onChange={onChangeHandler} style={{ padding: "5px", flex: 1, }} type='text' placeholder="Input here" className='searchSelect-input' />
                <span onClick={() => { setisOpen(!isOpen) }} style={{ padding: "5px 10px", border: '1px solid #000' }} >^</span>
            </div>
            {
                isOpen ?
                    <div className='options-container my-2'>
                        <div className='selected-list' style={{ borderBottom: "1px solid #000" }}>
                            {
                                selected.map((d) => (
                                    <button className='w-100 py-1 selected_buttons'>
                                        {d.truckNumber}
                                    </button>))
                            }

                        </div>
                        <div>
                            {
                                (inputString ? data.filter((item) => item.truckNumber.includes(inputString)) : data).map((d, i) => (
                                    <button className='w-100 py-1 list-buttons' onClick={() => addInSelected(d)}>
                                        {d.truckNumber}
                                    </button>)
                                )
                            }
                        </div>
                    </div>
                    : null
            }

        </div >
    )
}
