import "./style.scss";
import {BackButtonIcon} from "../Assets";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Alert, Button, IconButton, InputLabel, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const Register = () => {
  const history = useNavigate();
  const [id, setId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userData = JSON.parse(localStorage.getItem('users')) || [];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    setShowAlert(false);
    const ids = [];
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    if (!ids.includes(id)) {
      ids.push(id);
    }
    setId(ids);
  }, []);

  const data = {
    users: []
  };

  const handleSubmit = useCallback(() => {
    const user = {
      id: id[0],
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }

    data.users.push(user);
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('users', dataJSON);
    setShowAlert(true);

    setTimeout(() => {
      history(-1);
    }, 1500);
  }, [id, name, email, password, confirmPassword, userData, data]);

  useEffect(() => {
    if (name === '' || email === '' || password === '' || confirmPassword === '' || password !== confirmPassword) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [name, email, password, confirmPassword]);

  return (
    <div className="App">
      {showAlert && <Alert severity="success">Kamu Berhasil Daftar!</Alert>}
      <div className="LoginContainer">
        <div className="headerRegister">
          <img
            style={{cursor: 'pointer'}}
            src={BackButtonIcon}
            alt="back-button-icon"
            onClick={() => {
              history(-1);
            }}
          />
          <span className="title" >Daftarkan akun anda</span>
        </div>
        <div className="formActionContainer">
          <div className="inputContainer">
            <InputLabel>Nama</InputLabel>
            <TextField
              value={name}
              onChange={(val) => {
                setName(val.target.value);
              }}
              variant="outlined"
              color="primary"
              placeholder="Masukan nama anda">
            </TextField>
          </div>
          <div className="inputContainer">
            <InputLabel>Email</InputLabel>
            <TextField
              value={email}
              onChange={(val) => {
                setEmail(val.target.value);
              }}
              variant="outlined"
              color="primary"
              placeholder="Masukan email anda">
            </TextField>
          </div>
          <div className="inputContainer">
            <InputLabel>Kata Sandi</InputLabel>
            <TextField
              value={password}
              onChange={(val) => {
                setPassword(val.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              color="primary"
              placeholder="Masukan kata sandi anda"
            >
            </TextField>
          </div>
          <div className="inputContainer">
            <InputLabel>Ulangi Kata Sandi</InputLabel>
            <TextField
              value={confirmPassword}
              onChange={(val) => {
                setConfirmPassword(val.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              color="primary"
              placeholder="Masukan ulang kata sandi anda"
            >
            </TextField>
          </div>
          <Button
            variant="contained"
            style={{
              backgroundColor: isDisable ? '#CBCED5' : '#87AE95',
              borderRadius: '20px',
              width: '150px'
            }}
            disabled={isDisable}
            onClick={handleSubmit}
          >
            Daftar
          </Button>
        </div>
      </div>
    </div>
  )
};

export default Register;