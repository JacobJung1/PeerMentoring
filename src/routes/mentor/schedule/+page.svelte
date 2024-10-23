<script>
    import { goto } from "$app/navigation";
    import { loggedInId } from "../../../store";

    let mentees = {};

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
        // console.log(encodedFilters);

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
            // console.log("Mentees");
            // console.log(mentees.results);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }
    fetchMentees();

    $: date = new Date().toISOString().split("T")[0];
    $: time = 1941407;
    $: selectedMentee = 36;

    $: meetingData = {
        //Mentors
        field_2546655: [$loggedInId],
        //Date
        field_2546666: date,
        //Time
        field_2546712: time,
        //Mentees
        field_2840092: [selectedMentee],
        //Rating
        // field_2546667: null,
        //Mentor comment
        // field_2546713: "",
    };

    async function createMeeting() {
        console.log("Meeting data");
        console.log(meetingData);
        const response = await fetch(`/api/baserow/344022/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(meetingData),
        });
        const orderResponse = await response.json();
        // console.log(orderResponse);
        goto("/mentor/dashboard");
    }
</script>

<div>
    <h1>Schedule a meeting</h1>
    <div>
        <p>Select a date</p>
        <input type="date" bind:value={date} />
    </div>
    <div>
        <p>Select a time</p>
        <select bind:value={time}>
            <option value={1941407}>Break</option>
            <option value={1941408}>Lunch 1</option>
            <option value={1941409}>Lunch 2</option>
        </select>
    </div>
    <div>
        <p>Select Mentee</p>
        {#if mentees && mentees.results}
            <select bind:value={selectedMentee}>
                {#each mentees.results as mentee}
                    <option value={mentee.id}>{mentee.field_2554094}</option>
                {/each}
            </select>
        {/if}
    </div>

    <button
        class="mt-5 px-3 py-2 border-none rounded-[5px]"
        on:click={() => createMeeting()}>Create meeting</button
    >
</div>
