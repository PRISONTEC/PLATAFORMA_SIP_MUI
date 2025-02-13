

export default class fetchingData {
    static getData(ipUril, URI, callback) {

        const params = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        }
        console.log(ipUril + URI);

        fetch(ipUril + URI, params)
            .then((response) => {
                response.json()
                    .then(
                        data => {
                            callback(data)
                        }
                    )
            }
            )
    }

    static deleteData(ipUril, URI, callback) {

        const params = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            }
        }

        fetch(ipUril + URI, params)
            .then((response) => {
                callback(response)
            })
    }
}