import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'

const register = () => {
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
                onSubmit={ (values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }, 1000)
                } }
            >
                { (props) => (
                    <Form>
                        <Field name='username'>
                            { ({ field, form }) => (
                                <FormControl mb="3" isInvalid={ form.errors.username && form.touched.username }>
                                    <FormLabel>Username</FormLabel>
                                    <Input { ...field } placeholder="Username" />
                                    <FormErrorMessage>{ form.errors.username }</FormErrorMessage>
                                </FormControl>
                            ) }

                        </Field>

                        <Field name='email'>
                            { ({ field, form }) => (
                                <FormControl mb="3" isInvalid={ form.errors.email && form.touched.email }>
                                    <FormLabel>Email</FormLabel>
                                    <Input { ...field } placeholder="Email" />
                                    <FormErrorMessage>{ form.errors.email }</FormErrorMessage>
                                </FormControl>
                            ) }

                        </Field>

                        <Field name='password'>
                            { ({ field, form }) => (
                                <FormControl mb="3" isInvalid={ form.errors.password && form.touched.password }>
                                    <FormLabel>Password</FormLabel>
                                    <Input { ...field } placeholder="Password" />
                                    <FormErrorMessage>{ form.errors.password }</FormErrorMessage>
                                </FormControl>
                            ) }

                        </Field>

                        <Button
                            mt={ 4 }
                            colorScheme='teal'
                            isLoading={ props.isSubmitting }
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