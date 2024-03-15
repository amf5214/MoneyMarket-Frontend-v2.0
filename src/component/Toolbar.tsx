// React imports
import { useState } from "react";
import '../style/component/toolbar.css'

const Toolbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered className="h-full relative flex navheader">
        </Navbar>
    )
}

export default Toolbar;