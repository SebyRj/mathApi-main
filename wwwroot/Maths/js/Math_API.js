class Maths_API {
    static API_URL() { return "https://servermathrick.glitch.me/api/maths" };

    static async Get(url) {
        return new Promise(resolve => {
            const [baseUrl, params] = url.split("?");
            console.log("Query String:", params);
            $.ajax({
                url: this.API_URL() + "?" + params,
                success: contacts => { resolve(contacts); },
                error: (xhr) => { console.log(xhr); resolve(null); }
            });
        });
    }
} 