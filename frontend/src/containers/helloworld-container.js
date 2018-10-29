import {connect} from 'react-redux';
import HelloWorld from '../components/HelloWorld';

const HelloWorldContainer = connect()(HelloWorld);

export default HelloWorldContainer;