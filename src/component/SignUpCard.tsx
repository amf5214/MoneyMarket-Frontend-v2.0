import { Button, Card, CardBody, Divider, Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InvalidSignupModal } from "./InvalidSignupModal";
import { SuccessfulSignupModal } from "./SuccessfulSignupModal";
import { handleSignUp } from "../services/signup.service";
import { Password } from "@mui/icons-material";

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

        setEmail("");
        setPwd("");
    }
    
    return (
        <>        
            <InvalidSignupModal show={showInvalid} setShow={setShowInvalid} />
            <SuccessfulSignupModal show={showSuccess} setShow={setShowSuccess} />
            <Card className="min-w-[25vw] min-h-[50vh]">
                <CardBody className="flex flex-col justify-around items-center">
                    <Progress aria-label="Loading..." value={progress} className="max-w-md"/>
                    <h1 className="text-center font-bold text-slate-800" style={{fontSize: "x-large", fontWeight: "bold"}}>Sign In</h1>
                    <form className="flex flex-col gap-y-4 justify-around items-center"
                        style={{flex: ".5 0 auto", marginBottom: "1rem"}}>     
                        <figure >
                            <h1 className="text-center">First Name:</h1>
                            <input type="text" value={firstName} placeholder="Enter First Name" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setFirstName(e.target.value)}/>
                        </figure>
                        <Divider />
                        <figure >
                            <h1 className="text-center">Last Name:</h1>
                            <input type="text" value={lastName} placeholder="Enter Last Name" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setLastName(e.target.value)}/>
                        </figure>
                        <Divider />
                        <figure >
                            <h1 className="text-center">Username:</h1>
                            <input type="text" value={username} placeholder="Enter Username" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setUsername(e.target.value)}/>
                        </figure>
                        <Divider />
                        <figure>
                            <h1 className="text-center">Email address:</h1>
                            <input autoFocus type="email" value={email} placeholder="Enter email" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setEmail(e.target.value)}/>
                        </figure>
                        <Divider />
                        <figure >
                            <h1 className="text-center">Password:</h1>
                            <input type="password" value={pwd} placeholder="Enter password" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setPwd(e.target.value)}/>
                        </figure>
                        
                    </form>
                    <Button isDisabled={progress == 100 ? false : true} color="primary" variant="shadow" className="max-w-[100%]" onClick={handleSubmit}>
                        Submit
                    </Button>
                </CardBody>
            </Card>
        </>
    );
}