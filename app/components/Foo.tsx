import {createTheme} from "@mui/material";
import {esES} from '@mui/material/locale'

const theme = createTheme(esES)

export function Foo(){
    console.log(theme);

    return <div>Nothing to see here...</div>
}
