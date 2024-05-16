import { useEffect, useState } from "react"
import instance from "../api"
import react from 'react'

export const useUserProducts = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const displayProducts = () => {
            instance.get("/products", { headers: { Authorization: localStorage.getItem("token") } })
                .then((res) => {
                    if (res.data.status == "unauthorized") {
                        setProducts(false)
                        setError('არა ავტორიზებული მომხმარებელი')
                    }
                    else {
                        setProducts(res.data)
                    }
                })
                .catch((err) => {
                    throw err
                })
    }
    useEffect(()=> {
        displayProducts()
    },[])

    return { products, error, setProducts, setError,displayProducts }
}