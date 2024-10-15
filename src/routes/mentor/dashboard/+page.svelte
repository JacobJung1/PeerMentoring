<script>
    import { loggedInId } from "../../../store";
    import { goto } from "$app/navigation";

    let data;
    let mentorId = $loggedInId || 37;

    console.log("mentorID", mentorId);

    async function fetchMentees() {
        const filters = {
            filter_type: "AND",
            filters: [
                {
                    type: "link_row_has",
                    field: 2546655,
                    value: mentorId,
                },
            ],
            groups: [],
        };

        const encodedFilters = encodeURIComponent(JSON.stringify(filters));
        console.log("Encoded filters: ", encodedFilters);

        try {
            const response = await fetch(
                `/api/baserow/344022/?filters=${encodedFilters}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }

            data = await response.json();
            console.log("Mentees data: ", data.results);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }

    fetchMentees();
</script>

-
<div>
    <h1>My meetings</h1>
    {#if data && data.results}
        <div class="flex flex-row gap-4">
            <div>
                <p class="font-bold">Date</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2546666}</p>
                {/each}
            </div>
            <div>
                <p class="font-bold">Email</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2546653[0].value}</p>
                {/each}
            </div>

            <div>
                <p class="font-bold">Time</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2546712.value}</p>
                {/each}
            </div>

            <div>
                <p class="font-bold">Rating</p>
                {#each data.results as meeting}
                    {console.log(meeting.id)}
                    {#if meeting.field_2546667 !== 0}
                        <p>{meeting.field_2546667}</p>
                    {:else}
                        <button
                            on:click={() =>
                                goto(
                                    `/mentor/addRating?meetingId=${meeting.id}`,
                                )}>Add rating</button
                        >
                    {/if}
                {/each}
            </div>

            <div>
                <p class="font-bold">Comment</p>
                {#each data.results as meeting}
                    {#if meeting.field_2546713 !== ""}
                        <p>{meeting.field_2546713}</p>
                    {:else}
                        <button>Add comment</button>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
    <button on:click={() => goto("/schedule")}>Schedule meeting</button>
</div>
