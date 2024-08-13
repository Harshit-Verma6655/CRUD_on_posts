import React from "react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    Avatar,
    ThemeProvider
} from "@material-tailwind/react";

export function DrawerDefault() {
    const [open, setOpen] = React.useState(false);
    const theme = {
        drawer: {
            defaultProps: {
                size: 300,
                overlay: true,
                placement: "left",
                overlayProps: undefined,
                className: "",
                dismiss: undefined,
                onClose: undefined,
                transition: {
                    type: "tween",
                    duration: 0.3,
                },
            },
            styles: {
                base: {
                    drawer: {
                        position: "fixed",
                        zIndex: "z-[9999]",
                        pointerEvents: "pointer-events-auto",
                        backgroundColor: "bg-white",
                        boxSizing: "box-border",
                        width: "w-full",
                        boxShadow: "shadow-2xl shadow-blue-gray-900/10",
                    },
                    overlay: {
                        position: "absolute",
                        inset: "inset-0",
                        width: "w-full",
                        height: "h-full",
                        pointerEvents: "pointer-events-auto",
                        zIndex: "z-[9995]",
                        backgroundColor: "bg-black",
                        // backgroundOpacity: "bg-opacity-80",
                        // backdropBlur: "backdrop-blur-sm",
                    },
                },
            },
        },
    };
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <ThemeProvider value={theme} >
            <React.Fragment className="bg-white" >
                <Button onClick={openDrawer}>Open Drawer</Button>
                <Drawer open={open} onClose={closeDrawer} className="p-4 bg-white z-[100]">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" withBorder={true} />
                            <div>
                                <Typography variant="h6">Tania Andrew</Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    Web Developer
                                </Typography>
                            </div>
                        </div>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <Typography color="gray" className="mb-8 bg-white pr-4 font-normal">
                        <p className="my-3">Name : </p>
                        <p className="my-3">Email : </p>
                        <p className="my-3">Company : </p>
                        <p className="my-3">Website : </p>
                    </Typography>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outlined">
                            Documentation
                        </Button>
                        <Button size="sm">Log Out</Button>
                    </div>
                </Drawer>
            </React.Fragment>
        </ThemeProvider>
    );
}