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
import loadUser, {loadProfile} from "../services/auth/account.service.ts";
import Cookies from "js-cookie";
import "../style/page/account.css"
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, useSearchParams} from "react-router-dom";
import PathService from "../services/path.service.ts";
import Path from "../services/path.service.ts";

export const ProfilePage = () => {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const [editMode, setEditMode] = useState(0);

    useEffect(() => {
       const populate = async () => {
           const cookie = Cookies.get("Authorization");
           if(cookie != undefined) {
               const localUser = await loadUser(cookie);
               setUser(await localUser);
               const localProfile = await loadProfile(cookie);
               setProfile(await localProfile);
               console.log(await localProfile);
           }
       }
        populate();

       const mode = searchParams.get("edit");
       if(mode != null) {
           setEditMode(Number.parseInt(mode));
       }
    },[]);

    const completed = () => {
        navigate(PathService.ACCOUNT + "?edit=0");
        setEditMode(0);
    }

    const setEdit = () => {
        navigate(PathService.ACCOUNT + "?edit=1");
        setEditMode(1);
    }

    // @ts-ignore
    return (
            <div className="flex flex-col w-full min-h-screen">
                <Toolbar />
                <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-10 profile-content">
                    <Card className="md: w-[60%]">
                        <CardContent className="flex flex-col items-center">
                            <Card className="w-[100%]">
                                <CardContent className="flex flex-col items-center relative">
                                    { profile != null ? <Avatar className="h-40 w-40 mb-4" alt="User Avatar" src={profile.bio}/> :
                                        <Avatar className="h-40 w-40 mb-4" alt="User Avatar" src={""}/> }

                                    <figure className="flex flex-col items-center">
                                        { user != null ? <div className="text-2xl font-bold">{user.username}</div> : null }
                                        { profile != null ? <p className="text-xs text-gray-500 dark:text-gray-400">{profile.name}</p> : null }
                                    </figure>

                                    <Divider className="md:w-[70%] mt-3 mb-3"/>

                                    {profile != null ? editMode == 0 ?
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Email: {profile.email}</p> :
                                        <Textarea className="text-xs text-gray-500 dark:text-gray-400 m-2" variant={"bordered"} label={"Email"} value={profile.email} isDisabled/> : null}
                                    {profile != null ? editMode == 0 ?
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Education: {profile.education}</p> :
                                        <Textarea className="text-xs text-gray-500 dark:text-gray-400 m-2" variant={"bordered"} label={"Education"} value={profile.education} /> : null}
                                    {profile != null ? editMode == 0 ?
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Location: {profile.citystate}</p> :
                                        <Textarea className="text-xs text-gray-500 dark:text-gray-400 m-2" variant={"bordered"} label={"Location"} value={profile.citystate} /> : null}

                                    <Button className="absolute top-2 right-2 bg-transparent" onClick={_e => setEdit()}>
                                        <EditIcon />
                                    </Button>

                                    {editMode == 1 ? <Button color={"primary"} onClick={_e => completed()} >Complete</Button> : null}

                                </CardContent>
                            </Card>

                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>

    )
}