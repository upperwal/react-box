import Web3 from 'web3'
import Web3EventCompatibility from 'web3-event-compatibility'

let getWeb3 = new Promise(function(resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function() {
        var results
        var web3 = window.web3

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider.
            web3 = new Web3(web3.currentProvider)

            var web3Events = new Web3EventCompatibility(web3, window.web3);
            web3 = web3Events.web3
            
            console.log('Injected web3 detected.');
        } else {
            // Fallback to localhost if no web3 injection. We've configured this to
            // use the development console's port by default.
            var provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545')

            web3 = new Web3(provider)

            console.log('No web3 instance injected, using Local web3.');
        }
        
        results = {
            web3: web3
        }

        resolve(results)

    })
})

export default getWeb3
