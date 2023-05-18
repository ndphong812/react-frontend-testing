const drawerWidth = 240;

export const styles = {
    boxContainer: {
        display: 'flex'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
        },
    },
    itemsBox: {
        overflow: 'auto'
    },
    mainOutlet: {
        flexGrow: 1,
        p: 3
    }
};