import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PlaceCategories from '../../places/PlaceCategories';

const MyStack = styled(Stack)({
})

export const CategoriesFilter = (props: { setFilter: any }) => {

    const updateFilters = (event: any, values: any) => {
        let categories: string[] = [];
        values.map((value: any) => categories.push(value));
        props.setFilter(categories);
    }

    return (
        <MyStack id="stack" spacing={3} >
            <Autocomplete
                data-testid="categoriesFilter"
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