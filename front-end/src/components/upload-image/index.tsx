import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProgressBar from "@ramonak/react-progress-bar";
import 'firebase/storage';
import firebaseStorage from "./firebase"
import {
    getDownloadURL,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import { SwalAlert } from 'utils/sweet-alter';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { User } from 'redux/auth/type';

type Props = {
    user: User;
    setImageLink: (_link: string) => void,
}

const ImageUploader: React.FC<Props> = ({ user, setImageLink }: Props) => {
    const [imageUrl, setImageUrl] = useState(user.image);
    const [percent, setPercent] = useState(0);

    const onDrop = (acceptedFiles: File[]) => {
        if (!acceptedFiles.length) {
            SwalAlert("Opps", "Please choose an image", "error");
        }
        else {
            const file = acceptedFiles[0];
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                SwalAlert("Opps", "Please only choose PNG hoặc JPEG", "error");
                return;
            }
            const storageRef = ref(firebaseStorage, `/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percent);
                },
                (err) => alert(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setImageUrl(url);
                        setImageLink && setImageLink(url as string);
                    });
                }
            );
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <Box {...getRootProps()}>
            <input {...getInputProps()} accept=".png,.jpg" />
            <Avatar sx={{ width: 100, height: 100 }} src={imageUrl as string} alt="Uploaded image" />
            {
                percent > 0 && percent < 100 &&
                <ProgressBar
                    completed={60}
                    bgColor="#D10024"
                    baseBgColor="#E0E0E0"
                    height="15px"
                    labelAlignment="center"
                />
            }
            <Button variant="contained">Choose Image</Button>
            <Typography>Định dạng: .PNG, .JPG</Typography>
        </Box>
    );
}

export default ImageUploader;