import React from 'react'
import { useEffect } from 'react'
import instance from '../api'
import { useState } from 'react'

function useCategories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        instance.get('/categories')
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    return {categories,setCategories}
}

export default useCategories