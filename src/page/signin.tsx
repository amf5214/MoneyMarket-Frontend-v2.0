import { Tab, Tabs } from "@nextui-org/react";
import { SignInCard } from "../component/SignInCard";
import { SignUpCard } from "../component/SignUpCard";
import Toolbar from "../component/Toolbar";

const SignInPage = () => {

    return (
        <>
            <Toolbar />
            <div className="body-content"> 
                <Tabs aria-label="Options">
                    <Tab key="signin" title="Sign In">
                        <SignInCard />
                    </Tab>
                    <Tab key="signup" title="Sign up">
                        <SignUpCard />
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default SignInPage;
