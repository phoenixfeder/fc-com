import React, {Component} from 'react';

class FAQ extends Component {

    componentDidMount(){
        document.title='FAQ';
    }

    render() {
        return (
            <div id="faq">
                <p>Ich bin die FAQ-Seite</p>
            </div>
        );
    }

}

export default FAQ;