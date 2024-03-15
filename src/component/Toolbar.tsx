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
                            name={"Michael Weston"}
                            src="https://i.pravatar.cc/200?img=13"
                            color="primary"  
                            isBordered
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <User   
                                    name={"Michael Weston"}
                                    description={"Product Designer"}
                                    avatarProps={{
                                        src: "https://i.pravatar.cc/200?img=13"                                    }}
                                />
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="help">Help</DropdownItem>
                            <DropdownItem key="logout">Log Out</DropdownItem>
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
                        name={"Michael Weston"}
                        avatarProps={{
                            src: "https://i.pravatar.cc/200?img=13",
                            color: "primary",  
                            isBordered: true
                        }}
                    />
                </NavbarMenuItem>
                <Divider />
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        My Settings
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Live Markets
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
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
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Help
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="#" color={"foreground"}>
                        Log Out
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}

export default Toolbar;