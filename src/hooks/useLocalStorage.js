import {useEffect, useState} from 'react'

const PREFIX = 'messagingApp'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    const[value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function')
        {
            return initialValue()
        }
        else
        {
            return initialValue
        }
    }) //Get value from local state and put into state

    useEffect(() =>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])
    
    return [value, setValue]; //return our statevalues to persist everything into local storage
}
