// React imports
import { useContext, useEffect, useState } from "react";

// NextUI imports
import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from "@nextui-org/react";

// Other imports
import SearchIcon from '@mui/icons-material/Search';
import Cookies from "js-cookie";

// Style imports
import '../style/component/toolbar.css'
import loadUser from "../services/auth/account.service";
import Path from "../services/path.service";
import AuthContext from "../provider/AuthProvider";
import { useLocation } from "react-router-dom";
import { ApiError } from "../services/error.service";
import { TickerAutocomplete } from "./TickerAutocomplete";

const Toolbar = () => {

    const { user, setUser } = useContext(AuthContext);

    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [localUser, setLocalUser] = useState(user);

    const handleSignout = () => {
        Cookies.set("Authorization", "");
        setUser(null);
    }

    useEffect(() => {
        setLocalUser(user);
    }, [user])

    useEffect(() => {
        console.log(location);
    }, [location])

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered className="h-full relative flex navheader">
            {/* Logo and company name - Visibility = Narrow Screen */ }
            <NavbarContent className="sm md:hidden" justify="start">
                <NavbarBrand>
                    <Link href="/" color={"foreground"}>
                        <Avatar src="/logo.jpg" className="rounded" style={{marginRight: ".5rem"}}/>
                        <p style={{ marginLeft: ".5rem" }}>Money Market</p>
                    </Link>  
                </NavbarBrand>
            </NavbarContent>

            {/* Nav buttons and brand logo on wide screens - Visibility = Wide screen */ }
            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarBrand>
                    <Link href="/" color={"foreground"}>
                        <Avatar src="/logo.jpg" className="rounded" style={{marginRight: ".5rem"}}/>
                        <b style={{ marginLeft: ".5rem" }} className="text-xl">Money Market</b>
                    </Link>  
                </NavbarBrand>
                <Link href={Path.LIVE_MARKETS} color={location.pathname.includes(Path.LIVE_MARKETS) ? "primary" : "foreground"}>
                    Live Markets
                </Link>
                <Link href={Path.MARKET_NEWS} color={location.pathname == Path.MARKET_NEWS ? "primary" : "foreground"}>
                    Market News
                </Link>
                <Link href="#" color={location.pathname.includes(Path.LEARNING_HUB) ? "primary" : "foreground"}>
                    Learning Hub
                </Link>
                <Link href="#" color={location.pathname.includes(Path.CONTENT_HUB) ? "primary" : "foreground"}>
                    Content Hub
                </Link>
            </NavbarContent>
            
            
            {/* Search bar and avatar - Visibility = Wide screen */ }
            {(localUser != null && localUser != ApiError.UNAUTHORIZED) ?
                <NavbarContent className="hidden md:flex gap-4" justify="end">
                    <NavbarItem>
                        <TickerAutocomplete />
                    </NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar   
                                as={"button"}
                                name={(localUser != null && localUser != ApiError.UNAUTHORIZED) ? localUser["firstName"] + " " + localUser["lastName"] : "Not signed in"}
                                src="https://i.pravatar.cc/200?img=13"
                                color="primary"  
                                isBordered
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <User   
                                        name={(localUser != null && localUser != ApiError.UNAUTHORIZED) ? localUser["firstName"] + " " + localUser["lastName"] : "Not signed in"}
                                        description={(localUser != null && localUser != ApiError.UNAUTHORIZED) ? localUser["username"] : "Not signed in"}
                                        avatarProps={{
                                            src: "https://i.pravatar.cc/200?img=13"                                    }}
                                    />
                                </DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="help">Help</DropdownItem>
                                <DropdownItem onClick={handleSignout} key="logout">Log Out</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                
            :   
                <NavbarContent className="hidden md:flex gap-4" justify="end">
                    <NavbarItem>
                        <Link href="/signin" key="signin">Sign In</Link>
                    </NavbarItem> 
                </NavbarContent> 
            }

            {/* Menubar toogle button - Visibility = Narrow screen */ }
            {(localUser && localUser != ApiError.UNAUTHORIZED) != null ?
                <NavbarContent className="md:hidden" justify="end">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                </NavbarContent>
            : null}

            {/* Menubar with nav links - Visibility = Narrow screen */ }
            {(localUser && localUser != ApiError.UNAUTHORIZED) != null ?
                <NavbarMenu>
                    <NavbarMenuItem style={{marginTop: ".5rem"}}>
                        <User  
                            as={"button"}
                            name={localUser != null ? localUser["firstName"] + " " + localUser["lastName"] : "Not signed in"}
                            avatarProps={{
                                src: "https://i.pravatar.cc/200?img=13",
                                color: "primary",  
                                isBordered: true
                            }}
                        />
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <Link onClick={handleSignout} key="logout">Log Out</Link>
                    </NavbarMenuItem>
                    <Divider />
                    <NavbarMenuItem>
                        <Link href={Path.LIVE_MARKETS} color={"foreground"}>
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
            :
            <NavbarContent className="sm:hidden gap-4" justify="end">
                <NavbarItem>
                    <Link href="/signin" key="signin">Sign In</Link>
                </NavbarItem>   
            </NavbarContent>
            }

        </Navbar>
    )
}

export default Toolbar;