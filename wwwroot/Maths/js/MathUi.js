Init_UI();

function Init_UI() {
    renderUrlForm();
    renderTests();

}

function renderHelp() {
    eraseContent();
    $("#content").append(
        $(`
            <div class="mathContainer">
                <h2>GET: Maths endpoint</h2>
                <hr>
                <button id="backButton" class="btn btn-secondary">retour</button>
                <p>
                    ? op = + & x = number & y = number return {"op": +, "x": number, "y":number, "value": x+y}
                </p>
                <p>
                     ? op = - & x = number & y = number return {"op": -, "x": number, "y":number, "value": x-y}
                </p>
                <p>
                     ? op = * & x = number & y = number return {"op": *, "x": number, "y":number, "value": x*y}
                </p>
                 <p>
                     ? op = / & x = number & y = number return {"op": /, "x": number, "y":number, "value": x/y}
                </p>
                <p>
                     ? op = % & x = number & y = number return {"op": %, "x": number, "y":number, "value": x%y}
                </p>
                 <p>
                     ? op = ! & n = integer  return {"op": !, "n": int, "value": n!}
                </p>
                <p>
                     ? op = p & n = integer  return {"op": p, "n": int, "value": true if n is a prime number}
                </p>
                <p>
                     ? op = np & n = integer  return {"op": np, "n": int, "value": nth prime number}
                </p>

            </div>
        `));
    $("#backButton").click(function () {
        renderTests();  // Assuming you have a renderHome function
    });
}
async function renderTests() {
    eraseContent();
    const tests = await getTests();

    tests.forEach((test, index) => {
        let TestHtml = `op: ${test.op}`;
        if (test.n !== undefined) {
            TestHtml += `, n: ${test.n}`;
        } else {
            TestHtml += `, x: ${test.x}, y: ${test.y}`;
        }

        if (test.error !== undefined) {
            TestHtml += `, error: ${test.error}`;
        } else {
            TestHtml += `, Résultat: ${test.result}`;
        }

        $("#content").append(`
            <div>
                <h3> Test ${index + 1}:</h3> <p>${TestHtml}</p>
            </div>
        `);
    });

}
function renderUrlForm() {

    $("#header").append(`
        <form class="form" id="urlForm">


            <label for="Url" class="form-label">Url du service </label>
            <input 
                class="form-control"
                name="Url" 
                id="Url" 
                placeholder="Url"
                required
                RequireMessage="Veuillez entrer un url"
                InvalidMessage="L'url comporte un caractère illégal"
                value=""
            />
            <input type="submit" value="Démarrer le test" id="sendUrl" class="btn btn-primary">
            <input type="button" value="Aide" id="help" class="btn btn-secondary">
        </form>
    `);
    initFormValidation();
    $('#urlForm').on("submit", async function (event) {
        event.preventDefault();
        let formData = getFormData($("#urlForm"));

        let result = await Maths_API.Get(formData.Url);
        if (result)
            renderTests();
        else
            renderError("Une erreur est survenue!");
    });

    $('#help').on("click", function () {
        renderHelp();
    });
}
function renderError(message) {
    eraseContent();
    $("#content").append(
        $(`
            <div class="errorContainer">
                ${message}
            </div>
        `)
    );
}
function eraseContent() {
    $("#content").empty();
}
function getFormData($form) {
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}
async function getTests() {
    const response = await $.getJSON('/tests.json');
    return response;

}