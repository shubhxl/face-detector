import React from 'react'

export default class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmit = () => {
        fetch("https://face-detector-api-shubh.herokuapp.com/signin", {
            method:"post",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
        .then((user) => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        }  
        )
    }

    render(){
        const {onRouteChange} = this.props;
        return (
            <div>
                <article className="br4 ba dark-yellow b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                        <legend className="f2 fw6 ph0 white mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 white" for="email-address">Email</label>
                            <input 
                            onChange={this.onEmailChange}
                            className="pa2 input-reset white ba bg-transparent hover-bg-transparent hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy white f6" for="password">Password</label>
                            <input 
                            onChange={this.onPasswordChange}
                            className="b pa2 input-reset white ba bg-transparent hover-bg-transparent hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" />
                        </div>
                    
                        </fieldset>
                        <div className="">
                        <input 
                        onClick={this.onSubmit}
                        className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <span onClick={() => onRouteChange('register')} className="f6 link dim white pointer db">Not a member? <u> Register </u></span>
                      
                        </div>
                    </div>
                </main>
                </article>
            </div>
        )
    }

}
