import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { handleSignin } from "../services/signin.service";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InvalidSigninModal } from "./InvalidSigninModal";
import { SuccessfulSigninModal } from "./SuccessfulSigninModal";
import { useNavigate } from "react-router-dom";

export const SignInCard = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showInvalid, setShowInvalid] = useState(false);

    const handleSubmit = async () => {
        const cookie = await handleSignin(email, pwd);

        if(await cookie != null) {
            Cookies.set("Authorization", await cookie);
            setShowSuccess(true);
        } else {
            setShowInvalid(true);
        }

        setEmail("");
        setPwd("");
    }

    const hideSuccess = () => {
        setShowSuccess(false);
        navigate("/");
    }
    
    return (
        <>        
            <InvalidSigninModal show={showInvalid} setShow={setShowInvalid} />
            <SuccessfulSigninModal show={showSuccess} setShow={hideSuccess} />
            <Card className="min-w-[25vw] min-h-[50vh]">
                <CardBody className="flex flex-col justify-around items-center">
                    <h1 className="text-center font-bold text-slate-800" style={{fontSize: "x-large", fontWeight: "bold"}}>Sign In</h1>
                    <form className="flex flex-col gap-y-4 justify-around items-center"
                        style={{flex: ".5 0 auto", lineHeight: "2rem", marginBottom: "1rem"}}>
                        <figure style={{ marginBottom: "0.5rem" }}>
                            <h1 className="text-center">Email address:</h1>
                            <input autoFocus type="email" value={email} placeholder="Enter email" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setEmail(e.target.value)}/>
                        </figure>
                        <Divider />
                        <figure >
                            <h1 className="text-center">Password:</h1>
                            <input type="password" value={pwd} placeholder="Enter password" className="text-center rounded-lg bg-slate-800 text-white" onChange={(e) => setPwd(e.target.value)}/>
                        </figure>
                    </form>
                    <Button color="primary" variant="shadow" className="max-w-[100%]" onClick={handleSubmit}>
                        Submit
                    </Button>
                </CardBody>
            </Card>
        </>
    );
}