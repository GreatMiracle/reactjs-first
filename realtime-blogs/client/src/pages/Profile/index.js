import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';
import { updateProfilePictureApi } from '../../services/userService';
import toast from 'react-hot-toast';
import { SetUser } from '../../redux/userSlice';

function Profile() {

    const { user } = useSelector(state => state.userReducer);
    const [image, setImage] = useState("");
    const dispatch = useDispatch();

    const onFileSelect = async (e) => {
        const file = e.target.files[0];
        const render = new FileReader(file);
        render.readAsDataURL(file);
        render.onload = async () => {
            console.log("Image>>>>>>>>", render.result);
            setImage(render.result)
        }
        console.log("file", file);
    }

    useEffect(() => {
        if (user?.profilePic) {
            setImage(user.profilePic)
        }
    }, [user])

    const updateProfilePicture = async () => {

        try {
            dispatch(ShowLoader());
            const response = await updateProfilePictureApi(image);
            dispatch(HideLoader());
            if (response.success) {
                toast.success("Profile Picture Updated");
                dispatch(SetUser(response.data));
            } else {
                toast.error(response.error)
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message)
        }

    }

    return (
        user && (
            <div className='text-xl font-semibold uppercase text-gray-500 flex gap-2 flex-col p-2 shadow-md border w-max border-gray-500'>
                <h1>
                    {user.name}
                </h1>
                <h1>
                    {user.email}
                </h1>
                <h1>
                    Created At: {moment(user.createdAt).format("MMM DD YYYY, hh:mm:ss")}
                </h1>

                {image && (
                    <img src={image} alt='profile pic' className='w-32 h-32 rounded-full' />
                )}

                <div className='flex gap-2'>
                    <label htmlFor='file-input' className='cursor-pointer'>
                        Update Profile Picture
                    </label>
                    <input type='file'
                        onChange={onFileSelect}
                        className='file-input border-0'
                        id='file-input'
                    />
                    <button className='outline-btn'
                        onClick={updateProfilePicture}>
                        Update
                    </button>
                </div>

            </div>)
    )
}

export default Profile