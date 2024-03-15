// React imports
import { useState } from "react";

// NextUI imports
import { Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from "@nextui-org/react";

// Other imports
import SearchIcon from '@mui/icons-material/Search';

// Style imports
import '../style/component/toolbar.css'

const Toolbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                 {/* Nav buttons in the middle of the screen - Visibility = Wide screen */ }
                 <NavbarContent className="hidden lg:flex gap-4" justify="center">
                    <Link href="#" color={"foreground"}>
                        Live Markets
                    </Link>
                    <Link href="#" color={"foreground"}>
                        Market News
                    </Link>
                    <Link href="#" color={"foreground"}>
                        Learning Hub
                    </Link>
                    <Link href="#" color={"foreground"}>
                        Content Hub
                    </Link>
                </NavbarContent>
            </NavbarContent>
        </Navbar>
    )
}

export default Toolbar;