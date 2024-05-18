import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Textfield from '@mui/material/TextField'
import { InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid'
import instance from '../api';
import Button from '@mui/material/Button'
import useCategories from '../hooks/useCategories';
import Error from '../errors/Error';
import Box from '@mui/material/Box'


function Createproduct() {
    const [productData, setProductData] = useState({})
    const { categories, setCategories } = useCategories()
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState([])
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    useEffect(() => {
        console.log(productData)
    }, [productData])
    useEffect(() => {
        instance.get("/current_user",
            { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                setUser(res.data)
                setLoading(false)
            })
    }, [])

    const createRecord = async () => {
        await instance.post("/create_product", { ...productData, user_id: user.id })
            .then((res) => {
                console.log(res)
                if (res.data.status == 401) {
                    setIsError(res.data.message)
                }
                else {
                    window.location.href = '/products'
                }
            })
    }
    return (
        <>
            <Error isError={isError} />
            <div className='marg'>
                <FormControl>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 2 }}
                        columns={{ xs: 4, sm: 8, md: 4 }}
                        maxWidth={'960px'}
                    >
                        <Grid item>
                            <Textfield
                                placeholder='title'
                                name='title'
                                onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                            ></Textfield>
                        </Grid>
                        <Grid item>
                            <Textfield
                                placeholder='price'
                                name='price'
                                type='number'
                                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            ></Textfield>
                        </Grid>
                        <Grid item>
                            <Textfield
                                placeholder='code'
                                name='code'
                                type='number'
                                onChange={(e) => setProductData({ ...productData, code: e.target.value })}
                            ></Textfield>
                        </Grid>
                        <Grid item>
                            <Textfield
                                placeholder='amount'
                                name='amount'
                                type='number'
                                onChange={(e) => setProductData({ ...productData, amount: e.target.value })}
                            ></Textfield>
                        </Grid>
                        <Grid item>
                            <Textfield
                                placeholder='measure'
                                name='measure'
                                type='string'
                                onChange={(e) => setProductData({ ...productData, measure: e.target.value })}
                            ></Textfield>
                        </Grid>
                        <Grid item>
                            <Select
                                name='category_id'
                                value={productData.category || ''}
                                onChange={(e) => setProductData({ ...productData, category_id: e.target.value })}
                                sx={{ width: '233px' }} // Set the width to 100% to match the max width of the Grid
                                displayEmpty // This ensures the placeholder is displayed even if no value is selected
                                placeholder="Select a category" // Add a placeholder
                            >
                                {/* Render categories as MenuItems */}
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item mt={1}>
                        <Button
                            onClick={createRecord}
                            variant='contained'
                        >Submit</Button>
                    </Grid>
                </FormControl>
            </div>
        </>
    )
}

export default Createproduct