import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useData } from "../../../components/DataProvider";

import {
  useFirebase,
  firestore,
  FieldValue
} from "../../../components/FirebaseProvider";
import { useSnackbar } from "notistack";
import isEmail from "validator/lib/isEmail";

export default function EditDialog({ open, handleClose, fieldMode }) {
  const { profile } = useData();
  const { user } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    nama: profile.nama,
    deskripsi: profile.deskripsi || "",
    email: user.email,
    password: ""
  });

  const [error, setError] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError({
      ...error,
      [e.target.name]: ""
    });
  };

  const updateProfile = async () => {
    const fieldName = fieldMode.toLowerCase();

    if (!form[fieldName]) {
      return setError({
        [fieldName]: `${fieldMode} wajib diisi`
      });
    }

    setSubmitting(true);
    try {
      await firestore.doc(`profiles/${user.uid}`).set(
        {
          [fieldName]: form[fieldName],
          updated_at: FieldValue.serverTimestamp()
        },
        { merge: true }
      );

      enqueueSnackbar(`${fieldMode} berhasil diperbarui`, {
        variant: "success"
      });

      handleClose();
    } catch (e) {
      setError({
        [fieldName]: e.message
      });
    }
    setSubmitting(false);
  };

  const updateEmail = async e => {
    const { email } = form;

    if (!email) {
      setError({
        email: "Email wajib diisi"
      });
    } else if (!isEmail(email)) {
      setError({
        email: "Email tidak valid"
      });
    } else if (email !== user.email) {
      setError({
        email: ""
      });
      setSubmitting(true);
      try {
        await user.updateEmail(email);

        enqueueSnackbar("Email berhasil diperbarui", { variant: "success" });
        handleClose();
      } catch (e) {
        let emailError = "";
        switch (e.code) {
          case "auth/email-already-in-use":
            emailError = "Email sudah digunakan oleh pengguna lain";
            break;
          case "auth/invalid-email":
            emailError = "Email tidak valid";
            break;
          case "auth/requires-recent-login":
            emailError =
              "Silahkan logout, kemudian login kembali untuk memperbarui email";
            break;
          default:
            emailError = "Terjadi kesalahan silahkan coba lagi";
            break;
        }

        setError({
          email: emailError
        });
      }

      setSubmitting(false);
    } else {
      handleClose();
    }
  };

  const updatePassword = async e => {
    const { password } = form;

    if (!password) {
      setError({
        password: "Password wajib diisi"
      });
    } else if (password.length < 6) {
      setError({
        password: "Password minimal 6 karakter"
      });
    } else {
      setSubmitting(true);
      try {
        await user.updatePassword(password);

        enqueueSnackbar("Password berhasil diperbarui", { variant: "success" });
        handleClose();
      } catch (e) {
        let errorPassword = "";

        switch (e.code) {
          case "auth/weak-password":
            errorPassword = "Password terlalu lemah";
            break;
          case "auth/requires-recent-login":
            errorPassword =
              "Silahkan logout, kemudian login kembali untuk memperbarui password";
            break;
          default:
            errorPassword = "Terjasi kesalahan silahkan coba lagi";
            break;
        }

        setError({
          password: errorPassword
        });
      }
      setSubmitting(false);
    }
  };

  const handleSimpan = async e => {
    switch (fieldMode) {
      case "Email":
        //panggil update email
        await updateEmail();
        break;
      case "Password":
        // panggil update password
        await updatePassword();
        break;
      default:
        await updateProfile();
        break;
    }
  };
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">Ubah {fieldMode}</DialogTitle>
      <DialogContent>
        {isSubmitting && <LinearProgress />}
        {fieldMode === "Nama" && (
          <TextField
            id="nama"
            name="nama"
            label="Nama"
            fullWidth
            margin="dense"
            autoFocus
            value={form.nama}
            onChange={handleChange}
            error={error.nama ? true : false}
            helperText={error.nama}
            disabled={isSubmitting}
          />
        )}

        {fieldMode === "Deskripsi" && (
          <TextField
            id="deskripsi"
            name="deskripsi"
            label="Deskripsi"
            fullWidth
            margin="dense"
            autoFocus
            value={form.deskripsi}
            onChange={handleChange}
            error={error.deskripsi ? true : false}
            helperText={error.deskripsi}
            disabled={isSubmitting}
          />
        )}

        {fieldMode === "Email" && (
          <TextField
            id="email"
            name="email"
            label="Alamat Email"
            type="email"
            fullWidth
            autoFocus
            margin="dense"
            value={form.email}
            onChange={handleChange}
            helperText={error.email}
            error={error.email ? true : false}
            disabled={isSubmitting}
          />
        )}

        {fieldMode === "Password" && (
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            autoFocus
            margin="dense"
            value={form.password}
            onChange={handleChange}
            helperText={error.password}
            error={error.password ? true : false}
            disabled={isSubmitting}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={handleClose} color="primary">
          Batal
        </Button>
        <Button disabled={isSubmitting} onClick={handleSimpan} color="primary">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
