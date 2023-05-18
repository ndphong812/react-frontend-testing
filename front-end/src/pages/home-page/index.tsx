import {
    Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, ListItem,
    ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { styles } from './mui-style';

const itemsBox = [
    {
        name: 'User',
        icon: <AccountCircleIcon />,
        route: '/user'
    },
    {
        name: 'Articles',
        icon: <ArticleIcon />,
        route: '/articles'
    },
];

const HomePage = () => {

    const location = useLocation();

    return (
        <Box sx={styles.boxContainer}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        React Intern Testing
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={styles.drawer}
            >
                <Toolbar />
                <Box sx={styles.itemsBox}>
                    <List>
                        {itemsBox.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.route}
                                    selected={location.pathname.includes(item.route)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={styles.mainOutlet}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default HomePage;