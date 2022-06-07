import React from 'react';
import FlavorForm from './forms/FlavorForm';
import Calculator from './forms/LiftingStateUp';
import NameForm from './forms/NameForm';
import SignUp from './forms/SignUpDialog';

class Forms extends React.Component {
    render() {
        return(
            <div> 
                <FlavorForm/>
                <Calculator/>
                <NameForm/>
                <SignUp/>
            </div>
        )
    }
    
}

export default Forms;