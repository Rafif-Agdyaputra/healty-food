import {Button, IconButton, InputAdornment, InputLabel, TextField} from "@mui/material";
import "./style.scss";
import {OurlyFoodTypo} from "../Assets";
import {useEffect, useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (email === '' || password === '') {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  return (
    <div className="App">
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
              placeholder="Masukan email anda"
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