import { Tab, Tabs } from "@nextui-org/react";
import { SignInCard } from "../component/SignInCard";
import { SignUpCard } from "../component/SignUpCard";

const SignInPage = () => {

    return (
        <>
            <div className="body-content"> 
                <Tabs aria-label="Options">
                    <Tab key="signin" title="Sign In">
                        <SignInCard />
                    </Tab>
                    <Tab key="signup" title="Sign up">
                        
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default SignInPage;
