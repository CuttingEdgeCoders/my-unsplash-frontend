import React, { FormEvent, useState } from 'react'

/* Styles */
import { Container, Text, Anchor } from './styles'
import { screens } from '@src/styles/theme'

/* Components */
import { Wrapper } from '@components/atoms'
import {
   Form,
   Header,
   Button,
   Input,
   Message,
   Transition,
   FormField
} from 'semantic-ui-react'

/* Constants */
import { routes } from '@src/constants'

/* Utils */
import handleErrors from '@src/utils/handleErrors'

/* Redux */
import { login } from '@src/redux/actions/authentication'
import { useDispatch, useSelector } from 'react-redux'

/* Types */
import { State } from '@src/interfaces'

const Login = (): JSX.Element => {
   /* States */
   const dispatch = useDispatch()
   const [user, setUser] = useState({
      username: '',
      password: ''
   })
   const { status, error } = useSelector((state: State) => state.auth)
   const isInvalid = !user.password || !user.username

   /* Methods */
   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      dispatch(login(user))
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      })
   }

   return (
      <Container>
         <Wrapper breakpoint={screens.xs}>
            <Form error={!!error} onSubmit={handleSubmit} method="POST">
               <Header as="h2">Login</Header>
               <FormField
                  name="username"
                  id="username"
                  control={Input}
                  label="Username"
                  type="text"
                  placeholder="Enter your username..."
                  error={null}
                  onChange={handleChange}
               />

               <FormField
                  id="password"
                  control={Input}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password..."
                  error={null}
                  onChange={handleChange}
               />
               <Transition visible={!!error} animation="shake" duration={500}>
                  <Message
                     error
                     header={`${error?.response?.data.error || 'Error'}: ${
                        error?.response?.data.statusCode || 500
                     }`}
                     content={handleErrors(error?.response?.data.message)}
                  />
               </Transition>

               <Button
                  loading={status === 'loading'}
                  disabled={isInvalid || status === 'loading'}
                  fluid
                  primary
                  type="submit"
               >
                  Login
               </Button>

               <Text>
                  I don&apos;t have an{' '}
                  <Anchor to={routes.SIGNUP}>account</Anchor> yet.
               </Text>
            </Form>
         </Wrapper>
      </Container>
   )
}

export default Login
