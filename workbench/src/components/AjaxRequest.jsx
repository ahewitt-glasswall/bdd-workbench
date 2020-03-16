import $ from 'jquery';

class AjaxRequest {
    static async bddVisRequest(content) {
        console.log("Sending ajaxRequest")
        return await $.ajax({
            type: "POST",
            url: "https://dorlk1jur0.execute-api.eu-west-2.amazonaws.com/default/BDD-Visualisor",
            data: JSON.stringify(content)
        }).then(
            function success(result) { return result; },
            function failure(result) { return result; }
        );
    }
}

export default AjaxRequest;