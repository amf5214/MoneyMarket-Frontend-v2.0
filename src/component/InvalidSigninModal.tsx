import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react"

interface Props {
    setShow: (show:boolean) => void;
    show: boolean;
}

export const InvalidSigninModal = ( { show, setShow }:Props ) => {

    const handleClose = () => {
        setShow(false);
    }

    return (
        <Modal 
            size={"md"} 
            isOpen={show} 
            onClose={handleClose}
            backdrop="blur"
            classNames={{base:"", header:"border-b-[1px]", footer: "border-t-[1px]", backdrop: "bg-red-500"}}
            >
            <ModalContent className="">
                <ModalHeader className="flex flex-col gap-1">Invalid Sign In</ModalHeader>
                <ModalBody>
                    <p>The credentials provided are incorrect</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="shadow" color="primary" onPress={handleClose}>
                    Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>    
    )
    
}