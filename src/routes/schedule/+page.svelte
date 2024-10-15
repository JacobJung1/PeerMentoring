<script>
    import { goto } from "$app/navigation";
    let mentees;
    async function fetchMentees() {
        const filters = JSON.stringify({
            filter_type: "AND",
            filters: [
                {
                    type: "single_select_equal",
                    field: 2554096,
                    value: 1941405,
                },
            ],
            groups: [],
        });
        const encodedFilters = encodeURIComponent(filters);
        console.log(encodedFilters);

        try {
            const response = await fetch(
                `/api/baserow/344790/?filters=${encodedFilters}`,
            );
            if (!response.ok) {
                console.error(
                    "Failed to fetch data from Baserow API",
                    response.statusText,
                );
                return;
            }
            mentees = await response.json();
            console.log(mentees.results);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }

    // async function fetchMeetingsData() {
    //     try {
    //         const response = await fetch(
    //             `/api/baserow/344022/`,
    //         );
    //         if (!response.ok) {
    //             console.error(
    //                 "Failed to fetch data from Baserow API",
    //                 response.statusText,
    //             );
    //             return;
    //         }
    //          let meetings = await response.json();
    //          console.log(meetings.results);
    //     } catch (err) {
    //         console.error("Error fetching data:", err);
    //     }
    // }
    // fetchMeetingsData();

    fetchMentees();

    $: date = new Date().toISOString().split("T")[0]; // Format the date as yyyy-MM-dd
    $: time = 1941407;
    $: selectedMentee = 36;

    $: meetingData = {
        //Mentees
        field_2546653: [selectedMentee],
        //Mentors
        field_2546655: [35],
        //Date
        field_2546666: date,
        //Rating
        field_2546667: 0,
        //Time
        field_2546712: time,
        //Mentor comment
        field_2546713: "",
    };

    async function createMeeting() {
        console.log(meetingData);
        const response = await fetch(`/api/baserow/344022/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(meetingData),
        });
        const orderResponse = await response.json();
        console.log(orderResponse);
        goto("/mentor/dashboard");
    }
</script>

<h1>Schedule a meeting</h1>
<p>Select a date</p>
<input type="date" bind:value={date} />
<p>Select a time</p>
<select bind:value={time}>
    <option value={1941407}>Break</option>
    <option value={1941408}>Lunch 1</option>
    <option value={1941409}>Lunch 2</option>
</select>
<p>Select Mentee</p>
<select bind:value={selectedMentee}>
    {#if mentees && mentees.results}
        {#each mentees.results as mentee, index}
            <option value={index + 1}>{mentee.field_2554094} </option>
        {/each}
    {/if}
</select>
<div><button on:click={() => createMeeting()}>Create meeting</button></div>
