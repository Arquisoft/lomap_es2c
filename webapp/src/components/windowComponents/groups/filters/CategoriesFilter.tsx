import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PlaceCategories from '../../places/PlaceCategories';


export const CategoriesFilter = (props: { setFilter: any }) => {

    const updateFilters = (event: any, values: any) => {
        let categories: string[] = [];
        values.map((value: any) => categories.push(value));
        props.setFilter(categories);
    }

    let categories = PlaceCategories;
    categories[categories.length - 1].name = "Otro";

    return (
        
        <Autocomplete
            sx={{ maxHeight: 50 }}
            multiple
            id="tags-standard"
            data-testid="categoriesFilter"
            className='categoriesAutocomplete'
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
      
                
    )
}