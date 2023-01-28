import React, {useReducer} from 'react'

const FormsuseReducer = () => {

    const initialState = {
        firstName: {
            value:'',
            error: null
        },
        lastName: {
            value:'',
            error: null
        },
        email: {
            value:'',
            error: null
        }
    };

    const [state, dispatch] = useReducer(formReducer, initialState)

    function formReducer (state, action){
        
        let errorAux = null;

        if(action.type == 'firstName' && action.payload.length < 3) errorAux = "Frist Name must be at least 2 character";
        if(action.type == 'lastName' && action.payload.length < 3) errorAux = "Last Name must be at least 2 character";
        (action.type == 'email' && action.payload.includes("@") && action.payload.includes(".com")) ? (errorAux = null) : (errorAux = "You have entered an invalid email address");
        return{
            ...state,
            [action.type] : { value:action.payload, error : errorAux }
        }
    }

    function valor (evento){
        const {name, value} = evento.target
        dispatch({
            type: name,
            payload: value
        })
    }

    return (
        <>
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputFirstName" className="form-label">First Name: </label>
                        <input onChange={ valor } type="text" name= "firstName" className="form-control" id="inputFirstName" aria-describedby="firstName"/>
                        {state.firstName.error !== null && (<p className = "text-danger"> {state.firstName.error}</p>)}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLastName" className="form-label">Last Name: </label>
                        <input onChange={ valor }  type="text" name= "lastName" className="form-control" id="inputLastName" aria-describedby="lastName"/>
                        {state.lastName.error !== null && (<p className = "text-danger"> {state.lastName.error}</p>)}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email: </label>
                        <input onChange={ valor } type="email" name= "email"  className="form-control" id="inputEmail" aria-describedby="email"/>
                        {state.email.error !== null && (<p className = "text-danger"> {state.email.error}</p>)}
                    </div>
                </form>
            </div>
            <br />
            <div>
                <p>First Name: {state.firstName.value} </p>
                <p>Last Name: {state.lastName.value} </p>
                <p>Email: {state.email.value}</p>
            </div>
        </>    

    )
}

export default FormsuseReducer