import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import qs from 'query-string';

class Verify extends Component {
    
    constructor() {
        super();
        this.state = {
            verified: false,
            verfiyError: false,
        };
    };

    componentDidMount() {

        const parameters = qs.parse(window.location.search);

        fetch('http://localhost:8080/verify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "verfiy": {
                    "checksum": parameters.checksum,
                    "id": parameters.id,
                }
            })
        }).then(results => {

            return results.json();

        }).then(result => {

            switch(result.status.code) {
                case 200:
                    this.setState({verified: true});
                    break;
                
                case 400:
                    this.setState({error: false});
                    break;

                default:
                    break;

            }
        });
    }

    render() {
        return (
            <div>
                {!this.state.verified ? (
                    <p>Verifying...</p>
                ) : (
                    <p>Verified! You will be redirected! Did not work? Click <Link to="/login">here!</Link></p>
                    //TODO: Redirect after 2 secs here#
                    //e.g. <Redirect to="/login"/>
                )}
            </div>
        )
    }
}

export default Verify;