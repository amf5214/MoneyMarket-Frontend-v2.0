import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react"

interface Props {
    setShow: () => void;
    show: boolean;
}

export const SuccessfulSigninModal = ( { show, setShow }:Props ) => {

    return (
        <Modal 
            size={"md"} 
            isOpen={show} 
            onClose={setShow}
            backdrop="blur"
            classNames={{base:"", header:"border-b-[1px]", footer: "border-t-[1px]", backdrop: "bg-green-600"}}
            >
            <ModalContent className="">
                <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
                <ModalBody>
                    <p>Successful Sign In</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="shadow" color="primary" onPress={setShow}>
                    Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>    
    )
    
}