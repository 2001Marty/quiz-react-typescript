import { useState } from 'react'
import { Button, Typography, OutlinedInput, Grid } from '@mui/material'
import { onChangeInput, onRegister } from '../../services/handleForm'
import { useNavigate } from 'react-router-dom'
import RegistrationProps from '../../types/Registration'


const RegistrationForm = (props : RegistrationProps) => {
  const {setCurrentEmail} = props;
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const setOnRegister = (e: any) => {
    onRegister(e, email, navigate)
    setCurrentEmail(email);
  }

  return (
    <>
      <Typography mt={5} variant="h3">Register Form</Typography>
      <form onSubmit={(e) => setOnRegister(e)}>
        <Grid container rowGap={2} direction="column" justifyContent={"center"} mt={5}>
          <Grid item><OutlinedInput onChange={(e) => onChangeInput(e, setEmail)} value={email} id="email" placeholder="email" type="email"></OutlinedInput></Grid>
          <Grid item>
            <Button variant="outlined" type="submit" >Register</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default RegistrationForm