import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Textfield from '@mui/material/TextField'
import { InputLabel, Select } from '@mui/material';
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import instance from '../api';
import Button from '@mui/material/Button'
import useCurrentUser from '../hooks/useCurrentUser';
import Typography from '@mui/material/Typography'
import Error from '../errors/Error';


function Editproduct(props) {
    const [productData, setProductData] = useState({})
    const [categories, setCategories] = useState([])
    const [isError, setIsError] = useState([])
    const currentProduct = props.data

    const { loading, user } = useCurrentUser()

    useEffect(() => {
        instance.get('/categories')
            .then((res) => {
                setCategories(res.data)
            })
    }, [])
    useEffect(() => {
        console.log(productData)
    }, [productData])

    const updateRecord = async () => {
        await instance.patch("/update_product", { ...productData, product_id: currentProduct.id, user_id: user.id },
            {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }
        )
            .then((res) => {
                location.reload()
            })
    }
    return (
        <>
            <Error isError={isError} />
            <div className={`edit-product-popup ${props.open ? 'open-slide' : ""}`}>
                <div className='marg'>
                    <FormControl>
                        <Typography>Id: {currentProduct.id}</Typography>
                        <Grid
                            container
                            spacing={{ xs: 2, sm: 2 }}
                            columns={{ xs: 4, sm: 8, md: 4 }}
                            maxWidth={'960px'}
                        >
                            <Grid item>
                                <Textfield
                                    label='title'
                                    name='title'
                                    placeholder={currentProduct.title}
                                    onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                                ></Textfield>
                            </Grid>
                            <Grid item>
                                <Textfield
                                    placeholder={currentProduct.price}
                                    name='price'
                                    label={'price'}
                                    type='number'
                                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                ></Textfield>
                            </Grid>
                            <Grid item>
                                <Textfield
                                    placeholder={currentProduct.code}
                                    name='code'
                                    type='number'
                                    label='code'
                                    onChange={(e) => setProductData({ ...productData, code: e.target.value })}
                                ></Textfield>
                            </Grid>
                            <Grid item>
                                <Textfield
                                    placeholder={currentProduct.amount}
                                    name='amount'
                                    type='number'
                                    label='amount'
                                    onChange={(e) => setProductData({ ...productData, amount: e.target.value })}
                                ></Textfield>
                            </Grid>
                            <Grid item>
                                <Textfield
                                    placeholder={currentProduct.measure}
                                    name='measure'
                                    label='measure'
                                    type='string'
                                    onChange={(e) => setProductData({ ...productData, measure: e.target.value })}
                                ></Textfield>
                            </Grid>
                            <Grid item>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={((e) => setProductData({ ...productData, category_id: e.target.value }))}
                                >
                                    {categories.map((e) => {
                                        return <MenuItem value={e.id} key={e.id}>{e.id}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item mt={1}>
                            <Stack direction={'row'} gap={'10px'}>
                                <Button
                                    onClick={updateRecord}
                                    variant='contained'
                                >Update</Button>
                                <Button variant='outlined' color='error'
                                    onClick={() => props.setopen(false)}
                                >Cancel</Button>
                            </Stack>

                        </Grid>
                    </FormControl>
                </div>
            </div>
        </>
    )
}

export default Editproduct