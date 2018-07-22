import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null
        }
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3.then(results => {
            this.setState({
                web3: results.web3
            }, () => {
                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            
        })
    }

    instantiateContract() {

        var simpleStorageInstance = new this.state.web3.eth.Contract(SimpleStorageContract.abi, SimpleStorageContract.networks['5777'].address)

        var accountsList;
        var self = this;
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            // Stores a given value, 5 by default.
            accountsList = accounts
            console.log(accountsList)
            
            simpleStorageInstance.methods.set(5).send({from: accountsList[0]}).then(transHash => {
                console.log(transHash)
                // Get the value from the contract to prove it worked.
                return simpleStorageInstance.methods.get().call({from: accountsList[0]})
            }).then(result => {
                // Update state with the result.
                console.log('final result: ' + result)
                return self.setState({ storageValue: result })
            })
        })
        
        // Subscribe to StorageVal event to get updates
        simpleStorageInstance.events.StorageVal((error, result) => {
            console.log(result)
        })

    }

    render() {
        return (
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-1">
                            <h1>Good to Go!</h1>
                            <p>Your Truffle Box is installed and ready.</p>
                            <h2>Smart Contract Example</h2>
                            <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
                            <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
                            <p>The stored value is: {this.state.storageValue}</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App
