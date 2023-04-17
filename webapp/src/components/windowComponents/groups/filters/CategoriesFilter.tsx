import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

const MyStack = styled(Stack)({
})

export const CategoriesFilter = (props: { setFilter: any }) => {

    const updateFilters = (event: any, values: any) => {
        let categories: string[] = [];
        values.map((value: any) => {
            categories.push(value.name);
        })
        props.setFilter(categories);
    }

    return (
        <MyStack id="stack" spacing={3} >
            <Autocomplete
                multiple
                id="tags-standard"
                options={categories}
                onChange={updateFilters}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        placeholder="Categorías"
                    />
                )}
            />
        </MyStack>
    )
}

const categories = [
    {
        name: "Bar"
    },
    {
        name: "Restaurante"
    },
    {
        name: "Cafetería"
    },
    {
        name: "Club nocturno"
    },
    {
        name: "Heladería"
    },
    {
        name: "Centro comercial"
    },
    {
        name: "Librería"
    },
    {
        name: "Estanco"
    },
    {
        name: "Joyería"
    },
    {
        name: "Mercado"
    },
    {
        name: "Panadería"
    },
    {
        name: "Farmacia"
    },
    {
        name: "Floristería"
    },
    {
        name: "Supermercado"
    },
    {
        name: "Tienda de alimentos"
    },
    {
        name: "Tienda"
    }
];
