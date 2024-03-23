import { Button, Card, CardBody, Divider, Input, Progress, ScrollShadow, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InvalidSignupModal } from "./InvalidSignupModal";
import { SuccessfulSignupModal } from "./SuccessfulSignupModal";
import { handleSignUp } from "../services/auth/signup.service";
import { Password } from "@mui/icons-material";

import "../style/page/signin.css"

// Regular expressions to serve as validation rules for input fields
const NAME_REGEX = /^[a-zA-Z-]{3,30}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,35}$/;


export const SignUpCard = () => {

    // State variables to hold input data currently input by user
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");

    // State variables that hold booleans representing whether or not the required fields have valid inputs
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    // State variable holding current progress value for the progress bar
    const [progress, setProgress] = useState(0);

    // Effect to update validation variable for username field
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setUsernameValid(result);
    }, [username]);

    // Effect to update validation variable for password field
    useEffect(() => {
        const result = PASSWORD_REGEX.test(pwd);
        setPasswordValid(result);
    }, [pwd]);

    // Effect to update validation variable for first name field
    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        setFirstNameValid(result);
    }, [firstName]);

    // Effect to update validation variable for last name field
    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        setLastNameValid(result);
    }, [lastName]);

    // Effect to update validation variable for email field
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setEmailValid(result);
    }, [email]);

    // Effect to update progress bar percentage
    useEffect(() => {
        let prog = 0;
        if(firstNameValid) {
            prog++;
        }
        if(lastNameValid) {
            prog++;
        }
        if(emailValid) {
            prog++;
        }
        if(usernameValid) {
            prog++;
        }
        if(passwordValid) {
            prog++;
        }
        setProgress(prog * 20);
    }, [firstNameValid, lastNameValid, emailValid, usernameValid, passwordValid]);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showInvalid, setShowInvalid] = useState(false);

    const handleSubmit = async () => {
        const result = await handleSignUp(firstName, lastName, email, pwd, username);

        if(await result != null) {
            setShowSuccess(true);
        } else {
            setShowInvalid(true);
        }

        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPwd("");
    }
    
    return (
        <>        
            <InvalidSignupModal show={showInvalid} setShow={setShowInvalid} />
            <SuccessfulSignupModal show={showSuccess} setShow={setShowSuccess} />
            <Card className="min-w-[25vw] min-h-[50vh]" style={{padding: "2rem"}}>
                <CardBody className="flex flex-col justify-around items-center">
                    <ScrollShadow className="flex flex-col justify-around items-center">
                        <Progress aria-label="Loading..." value={progress} className="max-w-md"/>
                        <h1 className="text-center font-bold text-slate-800" style={{fontSize: "x-large", fontWeight: "bold"}}>Sign Up</h1>
                        <form className="flex flex-col gap-y-4 justify-around items-center"
                            style={{flex: ".5 0 auto", margin: "2rem"}}>     
                            <div className={`flex justify-center gap-x-4 gap-y-4 signup-row`}>
                                <figure >
                                    <Input type="text" variant="bordered" value={firstName} label="First Name:" placeholder="Enter First Name" isInvalid={!firstNameValid} className="text-center rounded-lg" onChange={(e) => setFirstName(e.target.value)}/>
                                </figure>
                                <figure >
                                    <Input type="text" variant="bordered" value={lastName} label="Last Name:" placeholder="Enter Last Name" isInvalid={!lastNameValid} className="text-center rounded-lg" onChange={(e) => setLastName(e.target.value)}/>
                                </figure>
                            </div>
                            <div className={`flex justify-center gap-x-4 gap-y-4 signup-row`}>
                                <figure >
                                    <Input type="text" variant="bordered" value={username} label="Username:" placeholder="Enter Username" isInvalid={!usernameValid} className="text-center rounded-lg" onChange={(e) => setUsername(e.target.value)}/>
                                </figure>
                                <figure>
                                    <Input variant="bordered" type="email" value={email} label="Email address:" placeholder="Enter email" isInvalid={!emailValid} className="text-center rounded-lg" onChange={(e) => setEmail(e.target.value)}/>
                                </figure>
                            </div>
                            <figure >
                                <Input variant="bordered" type="password" value={pwd} label="Password:" placeholder="Enter password" isInvalid={!passwordValid} className="text-center rounded-lg" onChange={(e) => setPwd(e.target.value)}/>
                            </figure>
                            
                        </form>
                        <Button isDisabled={progress == 100 ? false : true} color="primary" variant="shadow" className="max-w-[100%]" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ScrollShadow>
                </CardBody>
            </Card>
        </>
    );
}