import {useState} from 'react'

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    return [values, e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.strasse]: e.target.value,
            [e.target.nummer]: e.target.value,
            [e.target.plz]: e.target.value,
            [e.target.ort]: e.target.value,
            [e.target.vorname]: e.target.value,
            [e.target.nachname]: e.target.value,
            [e.target.nutzername]: e.target.value,
            [e.target.password]: e.target.value

        });
    }]
}