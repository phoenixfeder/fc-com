import React, {Component} from 'react';

class Home extends Component {

    componentDidMount(){
        document.title='Home';
    }

    render() {
        return (

            <div>
                <p>Ich bin die Startseite</p>
            </div>

        );
    }
}
export default Home;
