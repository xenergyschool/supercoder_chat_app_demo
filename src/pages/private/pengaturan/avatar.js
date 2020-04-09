import React, { useState, useCallback } from "react";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useData } from "../../../components/DataProvider";
import {
  storage,
  useFirebase,
  firestore
} from "../../../components/FirebaseProvider";

import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import useStyles from "./styles/avatar";

export default function UploadAvatar() {
  const { profile } = useData();
  const { user } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accept] = useState(["image/png", "image/jpeg"]);
  const classes = useStyles();
  const [maxSize] = useState("20971520");

  const onDropAccepted = useCallback(
    acceptedFiles => {
      setError("");

      const file = acceptedFiles[0];

      const reader = new FileReader();

      reader.onabort = () => {
        setError("Pembacaan file dibatalkan");
      };

      reader.onerror = () => {
        setError("Pembacaan file gagal/error");
      };

      reader.onload = ev => {
        const img = new Image();
        img.src = ev.target.result;

        img.onload = async () => {
          setLoading(true);
          try {
            const elem = document.createElement("canvas");
            const width = 250;
            const ratio = img.width / img.height;
            elem.width = width;
            const height = width / ratio;
            elem.height = height;

            const ctx = elem.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            const resizedDataURLWebP = ctx.canvas.toDataURL("image/webp", 0.75);

            const fotoRef = storage.ref(
              `profiles/${user.uid}/images/avatar.webp`
            );
            const fotoSnapshot = await fotoRef.putString(
              resizedDataURLWebP,
              "data_url"
            );
            const fotoUrl = await fotoSnapshot.ref.getDownloadURL();

            await firestore.doc(`profiles/${user.uid}`).set(
              {
                foto: fotoUrl
              },
              { merge: true }
            );
            enqueueSnackbar("Avatar berhasil diperbarui!", {
              variant: "success"
            });
          } catch (e) {
            console.log(e.message);
          }
          setLoading(false);
        };
      };

      reader.readAsDataURL(file);
    },
    [user.uid, enqueueSnackbar]
  );

  const onDropRejected = useCallback(
    rejected => {
      if (!accept.includes(rejected[0].type)) {
        setError(`Tipe file tidak didukung : ${rejected[0].type} `);
      } else if (rejected[0].size >= maxSize) {
        setError(`Ukuran file terlalu besar > 20Mb`);
      }
    },
    [accept, maxSize]
  );
  const { getInputProps, getRootProps } = useDropzone({
    accept,
    maxSize,
    onDropAccepted,
    onDropRejected,
    multiple: false
  });

  return (
    <div className={classes.avatarWrap} {...getRootProps()}>
      <input {...getInputProps()} />
      <Avatar
        className={classes.avatar}
        alt={profile.nama}
        src={profile.foto}
      />
      {loading && <CircularProgress />}
      <Typography variant="caption" color="error">
        {error}
      </Typography>
    </div>
  );
}
