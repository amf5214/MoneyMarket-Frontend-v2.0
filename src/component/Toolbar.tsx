// React imports
import { useEffect, useState } from "react";

// NextUI imports
import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from "@nextui-org/react";

// Other imports
import SearchIcon from '@mui/icons-material/Search';
import Cookies from "js-cookie";

// Style imports
import '../style/component/toolbar.css'
import loadUser from "../services/auth/account.service";
import Path from "../services/path.service";

const Toolbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const updateUser = async () => {
            if(Cookies.get("Authorization")) {
                const user = await loadUser(Cookies.get("Authorization"));
                setUser(await user);
            }
        }

        updateUser();
    }, []);


    const handleSignout = () => {
        Cookies.set("Authorization", "");
        setUser(null);
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered className="h-full relative flex navheader">
            {/* Logo and company name */ }
            <NavbarContent className="sm" justify="start">
                <NavbarBrand>
                    <Link href="/" color={"foreground"}>
                        <Avatar src="logo.jpg" className="rounded" style={{marginRight: ".5rem"}}/>
                        <p style={{ marginLeft: ".5rem" }}>Money Market</p>
                    </Link>  
                </NavbarBrand>
            </NavbarContent>
             {/* Nav buttons in the middle of the screen - Visibility = Wide screen */ }
            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <Link href="#" color={"foreground"}>
                    Live Markets
                </Link>
                <Link href={Path.MARKET_NEWS} color={"foreground"}>
                    Market News
                </Link>
                <Link href="#" color={"foreground"}>
                    Learning Hub
                </Link>
                <Link href="#" color={"foreground"}>
                    Content Hub
                </Link>
            </NavbarContent>
            
            {/* Search bar and avatar - Visibility = Wide screen */ }
            <NavbarContent className="hidden md:flex gap-4" justify="end">
                <NavbarItem>
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<SearchIcon />}
                        type="search"
                    />
                </NavbarItem>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar   
                            as={"button"}
                            name={user != null ? user["firstName"] + " " + user["lastName"] : "Not signed in"}
                            src="https://i.pravatar.cc/200?img=13"
                            color="primary"  
                            isBordered
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <User   
                                    name={user != null ? user["firstName"] + " " + user["lastName"] : "Not signed in"}
                                    description={user != null ? user["username"] : "Not signed in"}
                                    avatarProps={{
                                        src: "https://i.pravatar.cc/200?img=13"                                    }}
                                />
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="help">Help</DropdownItem>
                            {user != null ?
                            <DropdownItem onClick={handleSignout} key="logout">Log Out</DropdownItem>
                            : <DropdownItem href="/signin" key="signin">Sign In</DropdownItem>}
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            {/* Menubar toogle button - Visibility = Narrow screen */ }
            <NavbarContent className="sm:hidden" justify="end">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>

            {/* Menubar with nav links - Visibility = Narrow screen */ }
            <NavbarMenu>
                <NavbarMenuItem style={{marginTop: ".5rem"}}>
                    <User  
                        as={"button"}
                        name={user != null ? user["firstName"] + " " + user["lastName"] : "Not signed in"}
                        avatarProps={{
                            src: "https://i.pravatar.cc/200?img=13",
                            color: "primary",  
                            isBordered: true
                        }}
                    />
                </NavbarMenuItem>
                <NavbarMenuItem>
                    {user != null ?
                    <Link onClick={handleSignout} key="logout">Log Out</Link>
                    : <Link href="/signin" key="signin">Sign In</Link>}
                </NavbarMenuItem>
                <Divider />
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Live Markets
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href={Path.MARKET_NEWS} color={"foreground"}>
                        Market News
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Learning Hub
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Content Hub
                    </Link>
                </NavbarMenuItem>
                <Divider />
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        My Settings
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Help
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}

export default Toolbar;