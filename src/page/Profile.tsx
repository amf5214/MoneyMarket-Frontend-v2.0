/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yzZGxQPJoLN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Avatar, Button, Card, Divider, Textarea} from "@nextui-org/react";
import {CardContent} from "@mui/material";
import {useEffect, useState} from "react";
import Toolbar from "../component/Toolbar"
import {Footer} from "../component/Footer.tsx";
import loadUser, {checkSubscriptionStatus, loadProfile, updateProfile} from "../services/auth/account.service.ts";
import Cookies from "js-cookie";
import "../style/page/account.css"
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, useSearchParams} from "react-router-dom";
import PathService from "../services/path.service.ts";
import {Profile} from "../services/Profile.ts";
import {User} from "../services/auth/User.ts";

export const ProfilePage = () => {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const [ user, setUser ] = useState<User>();
    const [ profile, setProfile ] = useState<Profile>();

    const [editMode, setEditMode] = useState(0);

    const [subscription, setSubscription] = useState(false);

    useEffect(() => {
       const populate = async () => {
           const cookie = Cookies.get("Authorization");
           if(cookie != undefined) {
               const localUser = await loadUser(cookie);
               setUser(await localUser);
               const localProfile = await loadProfile(cookie);
               setProfile(await localProfile);
               setLocation(localProfile.citystate);
               setEducation(localProfile.education);
               const subscriptionStatus = await checkSubscriptionStatus(cookie);
               if(subscriptionStatus != null) {
                   setSubscription(subscriptionStatus);
               } else {
                   setSubscription(false);
               }

           }
       }
        populate();

       const mode = searchParams.get("edit");
       if(mode != null) {
           setEditMode(Number.parseInt(mode));
       }
    },[searchParams]);

    const completed = async () => {
        const cookie = Cookies.get("Authorization");
        if(cookie != undefined) {
            console.log(`education: {${education}}, location:{${location}}`);
            const response = await updateProfile(cookie, education, location);
            console.log(response);
        }

        navigate(PathService.ACCOUNT + "?edit=0");
        setEditMode(0);
    }

    const setEdit = () => {
        navigate(PathService.ACCOUNT + "?edit=1");
        setEditMode(1);
    }

    const [location, setLocation] = useState("");
    const [education, setEducation] = useState("");

    // @ts-ignore
    return (
            <div className="flex flex-col w-full min-h-screen">
                <Toolbar />
                <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-10 profile-content">
                    <Card className="md: w-[60%]">
                        <CardContent className="flex flex-col items-center">
                            <Card className="w-[100%]">
                                <CardContent className="flex flex-col items-center relative">
                                    {profile != null ?
                                        <Avatar className="h-40 w-40 mb-4" alt="User Avatar" src={profile.bio}/> :
                                        <Avatar className="h-40 w-40 mb-4" alt="User Avatar" src={""}/>}

                                    <figure className="flex flex-col items-center">
                                        {user != null ?
                                            <div className="text-2xl font-bold">{user.username}</div> : null}
                                        {profile != null ?
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{profile.name}</p> : null}
                                    </figure>

                                    <Divider className="md:w-[70%] mt-3 mb-3"/>

                                    {profile != null ? editMode == 0 ?
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Email: {profile.email}</p> :
                                        <Textarea className="text-xs text-gray-500 dark:text-gray-400 m-2"
                                                  variant={"bordered"} label={"Email"} placeholder={profile.email}
                                                  isDisabled/> : null}
                                    {profile != null ? editMode == 0 ?
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Education: {profile.education}</p> :
                                        <Textarea className="text-xs text-gray-500 dark:text-gray-400 m-2"
                                                  variant={"bordered"} label={"Education"} value={education}
                                                  onChange={e => setEducation(e.target.value)}/> : null}
                                    {profile != null ? editMode == 0 ?
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Location: {profile.citystate}</p> :
                                        <Textarea className="text-xs text-gray-500 dark:text-gray-400 m-2"
                                                  variant={"bordered"} label={"Location"} value={location}
                                                  onChange={e => setLocation(e.target.value)}/> : null}
                                    {profile != null && editMode == 0 && subscription ?
                                        <figure className="flex flex-row items-center mt-4">
                                            <Button color="primary">
                                                Premium Subscriber
                                            </Button>
                                        </figure>
                                        : profile != null && editMode == 0 && !subscription ?
                                            <figure className="flex flex-row items-center mt-4">
                                                <Button color="primary">
                                                     Subscribe to Access Learning Hub
                                                </Button>
                                            </figure>
                                        : null}

                                    <Button className="absolute top-2 right-2 bg-transparent"
                                            onClick={_e => setEdit()}>
                                        <EditIcon/>
                                    </Button>

                                    {editMode == 1 ? <Button color={"primary"}
                                                                 onClick={_e => completed()}>Complete</Button> : null}

                                </CardContent>
                            </Card>

                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>

    )
}