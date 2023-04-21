import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import PlaceCategories from '../../places/placeViews/PlaceCategories';

const MyStack = styled(Stack)({
})

export const CategoriesFilter = (props: { setFilter: any }) => {

    const updateFilters = (event: any, values: any) => {
        let categories: string[] = [];
        values.map((value: any) => {
            console.log("en categories filter.tsx   " + value)
            categories.push(value);
        })
        props.setFilter(categories);
    }

    return (
        <MyStack id="stack" spacing={3} >
            <Autocomplete
                multiple
                id="tags-standard"
                options={PlaceCategories.flatMap((option) => option.name)}
                onChange={updateFilters}
                getOptionLabel={(option) => option}
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