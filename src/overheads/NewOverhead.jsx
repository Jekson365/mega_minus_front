import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Textfield from '@mui/material/TextField'
import { InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button'
import useCategories from '../hooks/useCategories';
import { useState } from 'react';
import { useUserProducts } from '../hooks/useUserProducts';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close';
import instance from '../api';
import Typography from '@mui/material/Typography'

function Overhead() {
  const [productData, setProductData] = useState({})
  const [overhead, setOverhead] = useState([])
  const { categories, setCategories } = useCategories()
  const { products, setProducts } = useUserProducts()
  const [inputProducts, setInputProducts] = useState([{ title: "", price: "", code: "", amount: "", measure: "" }])

  const createRecord = () => {
    console.log({products: inputProducts,overhead: overhead})
    instance.post("/create_overhead", { products: inputProducts, overhead: overhead },
      {headers: {Authorization: localStorage.getItem("token")}}
    )
      .then((res) => {
        console.log(res.data)
      })
  }
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const fields = [...inputProducts];
    fields[index][name] = value;
    setInputProducts(fields);
  }
  const handleInput = () => {
    setInputProducts([...inputProducts, { title: "", price: "", code: "", amount: "", measure: "" }])
  }
  const handleRemoveFieldSet = (index) => {
    const fields = [...inputProducts];
    fields.splice(index, 1);
    setInputProducts(fields);
  };

  useEffect(() => {
  }, [inputProducts])
  return (
    <>
      <Grid container m={2}>
        <Grid item xs={2}>
          <Typography
            variant='h6'
            mb={3}
          >
            ახალი ზედნადები
          </Typography>
          <FormControl>
            <Grid
              container
              spacing={{ xs: 2, sm: 2 }}
              columns={{ xs: 4, sm: 8, md: 4 }}
              maxWidth={'960px'}
            >
              <Grid item>
                <Textfield
                  placeholder='code'
                  name='code'
                  type='number'
                  onChange={(e) => setOverhead({ ...overhead, code: e.target.value })}
                ></Textfield>
              </Grid>
              <Grid item>
                <Textfield
                  placeholder='importer'
                  name='importer'
                  type='text'
                  onChange={(e) => setOverhead({ ...overhead, importer: e.target.value })}
                ></Textfield>
              </Grid>
              <Grid item>
                <Textfield
                  placeholder='end location'
                  name='end location'
                  type='string'
                  onChange={(e) => setOverhead({ ...overhead, end_location: e.target.value })}
                ></Textfield>
              </Grid>
              <Grid item>
                <Textfield
                  placeholder='begin date'
                  name='begin date'
                  type='date'
                  onChange={(e) => setOverhead({ ...overhead, begin_date: e.target.value })}
                ></Textfield>
              </Grid>
            </Grid>
            <Grid item mt={1}>
              <Button
                onClick={createRecord}
                variant='contained'
              >Submit</Button>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant='h6'
            mb={3}
          >
            ზედნადების პროდუქცია
          </Typography>
          <Box className='check-box'
            onClick={handleInput}
          >
            <AddIcon
              style={{ 'color': "white" }}
            >
            </AddIcon>
          </Box>
          <Stack direction={'column'} gap={'10px'} mt={1}>
            {inputProducts.map((event, i) => {
              return (
                <>
                  <Stack gap='10px' direction={'row'} alignItems={'center'}>
                    <Textfield placeholder='title'
                      name='title'
                      type='string'
                      onChange={(e) => handleInputChange(i, e)}
                    ></Textfield>
                    <Textfield placeholder='price'
                      name='price'
                      type='number'
                      onChange={(e) => handleInputChange(i, e)}
                    ></Textfield>
                    <Textfield placeholder='code'
                      name='code'
                      type='number'
                      onChange={(e) => handleInputChange(i, e)}
                    ></Textfield>
                    <Textfield placeholder='amount'
                      name='amount'
                      type='number'
                      onChange={(e) => handleInputChange(i, e)}
                    ></Textfield>
                    <Textfield placeholder='measure'
                      name='measure'
                      type='string'
                      onChange={(e) => handleInputChange(i, e)}
                    ></Textfield>
                    <Box style={{ background: "red" }} className='check-box'
                      onClick={() => handleRemoveFieldSet(i)}
                    >
                      <CloseIcon style={{ color: "white" }}></CloseIcon>
                    </Box>
                  </Stack>
                </>
              )
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Overhead