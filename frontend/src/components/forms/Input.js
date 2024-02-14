import { useContext, memo } from 'react';
import { capitalize, getParentItemType } from '../../helpers/helpers';
import { getOptionsFromPropAndItemType } from '../../helpers/formHelpers';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { KanbanContext } from '../../contexts/KanbanContext.js'
import { v4 as uuidv4 } from 'uuid';

function Input({ prop, itemType, formState, handleInputChange }) {
    const kanban = useContext(KanbanContext);

    const getLabel = () => {
        let label;
        if (prop === 'text' || prop === 'status') label = prop;
        else label = getParentItemType(itemType);
        return capitalize(label);
    }

    let label = getLabel();
    let options = getOptionsFromPropAndItemType(kanban, prop, itemType);

    let content;
    if (prop === 'text') {
        content = (
            <TextField
                variant="outlined"
                id={prop}
                name={prop}
                value={formState[prop]}
                onChange={handleInputChange}
                label={label}
                required
                autoFocus // focus stays on the textField until you click another field
            />
        );
    } else {
        content = (
            <Select
                variant="outlined"
                id={prop}
                name={prop}
                value={formState[prop]}
                onChange={handleInputChange}
                label={label}

                required
            >
                {options.map(option => <MenuItem key={uuidv4()} value={option.id}>{option.text}</MenuItem>)}
            </Select>
        );
    }

    return (
        <Box>

            {content}

        </Box>
    )
}

export default memo(Input);
