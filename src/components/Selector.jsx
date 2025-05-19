import Select from 'react-select'
import { useEffect, useState } from 'react'

const Selector = ({options, placeholder, selectedOptions, setSelectedOptions, filterFunction}) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const handleChange = (selected) => {
        setSelectedOptions(selected)
        filterFunction(selected)
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            width: '100%',
            maxWidth: screenWidth <= 767 ? '100%' : '300px',
            marginBottom: screenWidth <= 767 ? '10px' : '0px',
            //maxWidth: '250px',
        }),
    };

    return (
        <div>
            <Select options={options} 
            isMulti={true}
            onChange={handleChange}
            value={selectedOptions}
            blurInputOnSelect={false}
            closeMenuOnScroll={false}
            closeMenuOnSelect={false}
            placeholder={placeholder}
            styles={customStyles}
            />
        </div>
    )
}

export default Selector