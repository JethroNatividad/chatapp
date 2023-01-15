import { Alert, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useAuth } from '../context/AuthContext'


const register = () => {
    const { register, user } = useAuth()

    function validate(values) {
        const errors = {}

        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }

        if (!values.username) {
            errors.username = 'Required'
        } else if (values.username.length < 3) {
            errors.username = 'Username must be at least 3 characters'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters'
        } else if (values.password.length > 20) {
            errors.password = 'Password must be less than 20 characters'
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(values.password)) {
            errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }

        return errors

    }

    return (
        <Container maxW="container.sm" px="5">
            <Heading textAlign="center" mb="5">Create an account</Heading>
            <Formik
                initialValues={ { username: '' } }
                validate={ validate }
                onSubmit={ async ({ username, email, password }, { setSubmitting }) => {
                    setSubmitting(true)
                    try {
                        await register({ username, email, password })
                    } catch (error) {
                        alert(error)
                    }
                } }
            >
                { ({ errors, touched, isSubmitting }) => (
                    <Form>
                        <FormControl mb="3" isInvalid={ !!errors.username && touched.username }>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Field as={ Input } id="username" name="username" placeholder="Username" />
                            <FormErrorMessage>{ errors.username }</FormErrorMessage>
                        </FormControl>
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
        </Container>
    )
}

export default register