import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { handleSignin } from "../services/auth/signin.service";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { InvalidSigninModal } from "./InvalidSigninModal";
import { SuccessfulSigninModal } from "./SuccessfulSigninModal";
import { useNavigate } from "react-router-dom";
import AuthContext from "../provider/AuthProvider";
import loadUser from "../services/auth/account.service";

export const SignInCard = () => {

    const navigate = useNavigate();

    // @ts-ignore
    const {user, setUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showInvalid, setShowInvalid] = useState(false);

    const handleSubmit = async () => {
        const cookie = await handleSignin(email, pwd);

        if(await cookie != null) {
            Cookies.set("Authorization", await cookie);
            if(cookie != undefined) {
                const user = await loadUser(await cookie);
                setUser(await user);
            }
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
            <Card className="min-w-[25vw] min-h-[50vh]" style={{filter: "drop-shadow(10px 10px 10px)", padding: "2rem"}}>
                <CardBody className="flex flex-col justify-around items-center">
                    <h1 className="text-center font-bold text-slate-800" style={{fontSize: "x-large", fontWeight: "bold"}}>Sign In</h1>
                    <form className="flex flex-col gap-y-4 justify-around items-center"
                        style={{flex: ".5 0 auto", lineHeight: "2rem", marginBottom: "1rem", backgroundColor: "white"}}>
                        <figure className="rounded-lg" style={{ marginBottom: "0.5rem", padding: "1rem"}}>
                            <Input variant="underlined" label="Email Address:" labelPlacement="outside" autoFocus type="email" value={email} placeholder="Enter email" className="rounded-lg " onChange={(e) => setEmail(e.target.value)}/>
                        </figure>
                        <figure className="rounded-lg" style={{ padding: "1rem"}}>
                            <Input variant="underlined" label="Password:" labelPlacement="outside" type="password" value={pwd} placeholder="Enter password" className="rounded-lg " onChange={(e) => setPwd(e.target.value)}/>
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