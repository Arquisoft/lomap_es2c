import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PlaceCategories from '../../places/PlaceCategories';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

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