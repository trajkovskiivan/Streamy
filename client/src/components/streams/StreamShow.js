import React from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';

import {fetchStream} from '../../actions'

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }



    componentDidMount() {
        const {id} = this.props.match.params;
        // console.log("Video Ref", this.videoRef);
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        // console.log('I was unmounted!!!')
        this.player.destroy();
    }


    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const {id} = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }


    render() {
        // console.log(this.props)

        if (!this.props.stream) {
            return <div>Loading....</div>
        }
        const {title, description} = this.props.stream
        return (
            <div className=''>
                <video
                    ref={this.videoRef}
                    style={{width: '100%'}}
                    // controls={true}
                    controls
                />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log('State  ', state)
    // console.log('ownProps  ', ownProps)
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow)

