import React, { Component } from 'react';

export default class allTexts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            texts: []
        }

    }

    componentDidMount() {
        let self = this;
        fetch('/getTexts', {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ texts: data });
        }).catch(err => {
            console.log('unable to retrieve texts', err);
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Texts Sent and Recieved</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sent/Recieved</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.texts.map(text =>
                            <tr key={text._id}>
                                <td>
                                    {text.isSent === true ? 'Sent' : ''}
                                    {text.isReceived === true ? 'Received' : ''}
                                </td>
                                <td>{text.name}</td>
                                <td>{text.phoneNumber}</td>
                                <td>{text.message}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}