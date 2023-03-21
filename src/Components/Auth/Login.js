import {Alert, Button, IconButton, InputLabel, TextField} from "@mui/material";
import "./style.scss";
import {OurlyFoodTypo} from "../Assets";
import {useCallback, useEffect, useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userData = JSON.parse(localStorage.getItem('users')) || [];
  const [showToast, setShowToast] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (email === '' || password === '') {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleSubmit = useCallback(() => {
    const dataEmail = userData.users[0].email;
    const dataPassword = userData.users[0].password;

    if (dataEmail !== email || dataPassword !== password) {
      setShowToast('Email dan/atau password salah!');
    } else {
      setShowToast('');
    }
  }, [email, password, userData.users]);

  return (
    <div className="App">
      {showToast && <Alert severity="error">{showToast}</Alert>}
      <div className="LoginContainer">
        <img src={OurlyFoodTypo} alt="name-test" width="300px"/>
        <span className="sloganLabel">Masuk ke akun anda</span>
        <div className="formActionContainer">
          <div className="inputContainer">
            <InputLabel>Email</InputLabel>
            <TextField
              value={email}
              onChange={(value) => {
                setEmail(value.target.value);
              }}
              style={{borderColor: '#565656'}}
              variant="outlined"
              color="primary"
              placeholder="Masukan email anda">
            </TextField>
          </div>
          <div className="inputContainer">
            <InputLabel>Kata Sandi</InputLabel>
            <TextField
              value={password}
              onChange={(value) => {
                setPassword(value.target.value);
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
          <Button
            variant="contained"
            style={{
              backgroundColor: isDisable ? '#CBCED5' : '#87AE95',
              borderRadius: '20px',
              width: '150px'
            }}
            disabled={isDisable}
            onClick={() => {
              handleSubmit()
            }}
          >
            Login
          </Button>
          <div className="registeredBox">
            <span>Belum Punya akun?{" "}</span>
            <a href="/register">Daftar disini</a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;