<script>
    import { loggedInName, loggedInEmail, loggedInId } from "../../store";
    import { goto } from "$app/navigation";

    let email = "";
    let password = "";

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    async function loginUser() {
        let realPassword;
        let emailIsValid = isValidEmail(email);

        if (email === "") {
            alert("Please enter your email");
        } else if (password === "") {
            alert("Please enter your password");
        } else if (emailIsValid === false) {
            alert("Please enter a valid email");
        } else {
            //filter for checking if the email that is inputted is in the database
            const filters = JSON.stringify({
                filter_type: "AND",
                filters: [
                    {
                        type: "equal",
                        field: 2554089,
                        //email that user inputted
                        value: email,
                    },
                ],
                groups: [],
            });
            console.log(filters);

            const encodedFilters = encodeURIComponent(filters);

            console.log(encodedFilters);

            //fetching data from user table with the encoded filter.
            const response = await fetch(
                `/api/baserow/344790?filters=${encodedFilters}`,
            ).catch((error) => {
                console.error("Fetch error:", error);
                return;
            });
            const data = await response.json();
            //saving the password of existing email as a variable
            realPassword = data.results[0].field_2554095;
            console.log(data.results);
            console.log(email);
            console.log(realPassword);

            //checking if password that user inputted is equal to the original password
            if (password !== realPassword) {
                alert("Password is incorrect");
            } else {
                alert("Password is correct");
                //loggedInName is a global variable. We are setting the name,email,id to the fetched users data
                loggedInName.set(data.results[0].field_2554094);
                loggedInEmail.set(data.results[0].field_2554089);
                loggedInId.set(data.results[0].id);
                console.log($loggedInName);
                console.log($loggedInEmail);
                console.log($loggedInId);
                goto("/mentor/dashboard");
            }
        }
    }
</script>

<div>
    <h1>Email</h1>
    <input type="text" placeholder="Enter your email" bind:value={email} />
    <h1>Password</h1>
    <input
        type="text"
        placeholder="Enter your password"
        bind:value={password}
    />
    <button on:click={() => loginUser()}>Login</button>
</div>
-
