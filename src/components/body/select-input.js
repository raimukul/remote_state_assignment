import React, {useState} from 'react'

const SelectInput = ({data}) => {
    const [selectedState, setSelectedState] = useState(null);
    const fun = (e)=>{
        console.log(e);
        // setSelectedState()
    }
    return (
        <select onChange={fun}>
            {
                data.map((item)=><option  value={item.truckNumber}>{item.truckNumber}</option>)
            }
        </select>
    )
}