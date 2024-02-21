import { useState, useEffect, memo } from 'react';
import NavTop from './navs/NavTop.js';
import NavLeft from './navs/NavLeft.js';
import Form from './forms/Form.js';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { fetchWrapper } from '../helpers/fetchWrapper.js';
import { port } from './KanbanApp.js';

function Board({ board, boards, darkMode, setDarkMode }) {
    // Styles
    const stylesLeft = { display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'baseline' };
    const stylesNavLeft = { width: '10%', minWidth: 230, height: '100%', bgcolor: 'background.secondary' };
    const stylesCenter = { width: '90%', bgcolor: 'background.primary' };
    const stylesNavTop = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 2, bgcolor: 'background.secondary' };
    const stylesBoardsArea = { display: 'flex', flexDirection: 'row', padding: 4 };
    const stylesBoard = { width: 300, minWidth: 300 };
    const stylesTask = { padding: 1 };
    const stylesAddStatusButton = { marginTop: 2 };

    // Get Statuses
    const [statuses, setStatuses] = useState([]);
    const getStatuses = async () => {
        const res = await fetch(`http://localhost:${port}/statuses`);
        const data = await res.json();
        setStatuses(data);
    };

    useEffect(() => {
        getStatuses();
    }, [])

    // Get Tasks
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        const res = await fetch(`http://localhost:${port}/tasks?board_id=${board.id}`);
        const data = await res.json();
        setTasks(data);
    };

    useEffect(() => {
        getTasks();
    }, [])


    return (
        <Paper>
            <Box sx={stylesLeft} >
                <Box
                    className='left'
                    sx={stylesNavLeft} >
                    <NavLeft
                        boards={boards}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                </Box>
                <Box className='center' sx={stylesCenter}>
                    <Box sx={stylesNavTop} >
                        <NavTop board={board} />
                    </Box>
                    <Box sx={stylesBoardsArea}>
                        {statuses.map(status =>
                            <Box key={uuidv4()} className='top' sx={stylesBoard}>
                                <h2>{status.text}</h2>
                                {tasks.map(task =>
                                    (status.id === task.status_id) ?
                                        <Box key={uuidv4()} sx={stylesTask}>
                                            <Form formType='EDIT' itemType='task' item={task} />
                                        </Box> : null)}
                            </Box>
                        )}
                        <Box sx={stylesAddStatusButton} >
                            <Form formType='ADD' itemType='status' />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper >
    );
}

export default memo(Board);
