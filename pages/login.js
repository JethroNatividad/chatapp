import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import NextLink from 'next/link'


const Login = () => {
    const { login, user } = useAuth()
    const router = useRouter()

    function validate(values) {
        const errors = {}

        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }

        if (!values.password) {
            errors.password = 'Required'
        }

        return errors
    }

    if (user) {
        router.push('/')
    }


    return (
        <Container maxW="container.sm" px="5">
            <Heading textAlign="center" mb="5">Login</Heading>
            <Formik
                initialValues={ { email: '', password: '' } }
                validate={ validate }
                onSubmit={ async ({ email, password }, { setSubmitting }) => {
                    setSubmitting(true)
                    try {
                        await login({ email, password })
                        router.push('/')
                    } catch (error) {
                        alert(error)
                    }
                } }
            >
                { ({ errors, touched, isSubmitting }) => (
                    <Form>
                        <FormControl mb="3" isInvalid={ !!errors.email && touched.email }>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Field as={ Input } id="email" name="email" placeholder="Email" />
                            <FormErrorMessage>{ errors.email }</FormErrorMessage>
                        </FormControl>
                        <FormControl mb="3" isInvalid={ !!errors.password && touched.password }>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Field as={ Input } type="password" id="password" name="password" placeholder="Password" />
                            <FormErrorMessage>{ errors.password }</FormErrorMessage>
                        </FormControl>
                        <Button
                            mt={ 4 }
                            colorScheme='teal'
                            isLoading={ isSubmitting }
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>

                ) }
            </Formik>
            <Text textAlign="center" fontSize='md'>Don't have an account? <Link as={ NextLink } href="/register">Register</Link></Text>


        </Container>
    )
}

export default Login