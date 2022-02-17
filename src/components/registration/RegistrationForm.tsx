import { useState } from 'react'
import { Button, Typography, OutlinedInput, Grid } from '@mui/material'
import { onChangeInput, onRegister } from '../../services/handleForm'
import { useNavigate } from 'react-router-dom'

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <Typography mt={5} variant="h3">Register Form</Typography>
      <form onSubmit={(e) => onRegister(e, email, navigate)}>
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