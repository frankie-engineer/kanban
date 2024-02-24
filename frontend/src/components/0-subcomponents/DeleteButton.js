import React, { useContext, memo } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { capitalize } from '../../helpers/helpers.js';
import { KanbanContext } from '../../contexts/KanbanContext.js';

function DeleteButton({ item, itemType }) {
    const { deleteItem } = useContext(KanbanContext);

    const handleDeleteClick = () => deleteItem(itemType, item.id);

    return (
        <Tooltip title={`Delete ${capitalize(itemType)}`}>
            <IconButton className="delete-button" color="primary" onClick={handleDeleteClick}><DeleteIcon /></IconButton>
        </Tooltip>
    )
}

export default memo(DeleteButton);
