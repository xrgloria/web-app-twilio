import React, { Component } from 'react';

export default class SendText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sendName: '',
            sendPhoneNumber: '',
            sendMessage: '',
            isPhoneValid: null
        }

        this.onChangeSendName = this.onChangeSendName.bind(this);
        this.onChangeSendPhoneNumber = this.onChangeSendPhoneNumber.bind(this);
        this.onChangeSendMessage = this.onChangeSendMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="container">
                <h2>Send Text</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="sendName">Name: </label>
                        <input type="text"
                            name="sendName"
                            className="form-control"
                            value={this.state.sendName}
                            onChange={this.onChangeSendName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sendPhoneNumber">Phone Number: </label>
                        <small className="form-text text-muted">Please omit any international codes.</small>
                        <input
                            name="sendPhoneNumber"
                            type="text"
                            className="form-control"
                            required
                            value={this.state.sendPhoneNumber}
                            onChange={this.onChangeSendPhoneNumber}
                        />
                        { this.state.isPhoneValid === false &&
                            <small className="form-text error">Invalid phone number</small>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="sendMessage">Message: </label>
                        <textarea
                            name="sendMessage"
                            className="form-control"
                            required
                            value={this.state.sendMessage}
                            onChange={this.onChangeSendMessage}
                        />
                    </div>

                    <button type="submit" className="btn btn-outline-secondary btn-lg">Send Text</button>
                </form>
            </div>
        )
    }

    onChangeSendName(e) {
        this.setState({
            sendName: e.target.value
        });
    }
    onChangeSendPhoneNumber(e) {
        var phone = e.target.value;
        phone = phone.trim().replace(/[ .()-]/g, '');
        if (phone.match("^([0-9]{3})([0-9]{3}[0-9]{4})$") == null) {
            this.setState({ isPhoneValid: false });
        } else {
            this.setState({ isPhoneValid: true });
        }
        this.setState({
            sendPhoneNumber: e.target.value
        });
    }
    onChangeSendMessage(e) {
        this.setState({
            sendMessage: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if( this.state.isPhoneValid === true ) {
            // console.log(`Form submitted:`);
            // console.log(`Name: ${this.state.sendName}`);
            // console.log(`Number: ${this.state.sendPhoneNumber}`);
            // console.log(`Message: ${this.state.sendMessage}`);

            const outgoingText = {
                isSent: true,
                isReceived: false,
                name: this.state.sendName,
                phoneNumber: '+1' + this.state.sendPhoneNumber.trim().replace(/[ .()-]/g, ''),
                message: this.state.sendMessage
            };

            fetch('http://localhost:3001/sendText', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(outgoingText)
            }).then(res => res.json())
                .then(res => console.log(res));

            this.setState({
                sendName: '',
                sendPhoneNumber: '',
                sendMessage: ''
            })
        }
    }
}