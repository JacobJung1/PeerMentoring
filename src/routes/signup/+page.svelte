<script>
    import { goto } from "$app/navigation";

    let fullName = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let userType;

    $: userData = {
        field_2554094: fullName,
        field_2554089: email,
        field_2554095: password,
        field_2554096: userType,
    };

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    async function createUser() {
        let emailIsVaild = isValidEmail(email);

        if (fullName === "") {
            alert("Please enter your full name");
        } else if (email === "") {
            alert("PLease enter your email");
        } else if (password === "") {
            alert("PLease enter your password");
        } else if (emailIsVaild === false) {
            alert("PLease enter a valid email");
        } else if (confirmPassword !== password) {
            alert("Please confirm your password");
        } else {
            console.log(userData);
            //creating new data to the users table. putting in the user data in sign up page
            const response = await fetch(`/api/baserow/344790/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log(data);
            alert("Successfully signed up. PLease login");
            goto("/login");
        }
    }
</script>

<div>
    <h1>Full Name</h1>
    <input
        type="text"
        placeholder="Enter your full name"
        bind:value={fullName}
    />
    <h1>Email</h1>
    <input type="text" placeholder="Enter your email" bind:value={email} />
    <h1>Password</h1>
    <input
        type="text"
        placeholder="Enter your password"
        bind:value={password}
    />
    <h1>Confirm Password</h1>
    <input
        type="text"
        placeholder="Confirm your password"
        bind:value={confirmPassword}
    />
    {#if confirmPassword !== password && confirmPassword !== ""}
        <p style="color: red;">Passwords do not match</p>
    {:else if confirmPassword === password && confirmPassword !== ""}
        <p style="color: green;">Passwords match</p>
    {/if}
    <h1>User Type</h1>
    <p>Select your role</p>
    <select bind:value={userType}>
        <option value="" disabled selected>Select your role</option>
        <option value={1941406}>Mentor</option>
        <option value={1941405}>Mentee</option>
        <option value={1941404}>Teacher</option>
    </select>
    <button on:click={() => createUser()}>Sign up</button>
</div>
