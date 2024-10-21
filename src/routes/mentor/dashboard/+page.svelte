<script>
    import { loggedInId } from "../../../store";
    import { goto } from "$app/navigation";

    let data;
    let mentorId = $loggedInId || 37;
    console.log("mentorID", mentorId);

    async function fetchMeetings() {
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
            console.log("Meetings: ", data.results);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    }

    fetchMeetings();
</script>

<div>
    <h1>My meetings</h1>
    {#if data && data.results}
        <div class="flex flex-row gap-4">
            <div class="flex flex-col">
                <p class="font-bold">Date</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2546666}</p>
                {/each}
            </div>
            <div class="flex flex-col">
                <p class="font-bold">Time</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2546712.value}</p>
                {/each}
            </div>
            <div class="flex flex-col">
                <p class="font-bold">Mentee</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2840092[0].value}</p>
                {/each}
            </div>
            <div class="flex flex-col">
                <p class="font-bold">Rating</p>
                {#each data.results as meeting}
                    {#if meeting.id}
                        {#if meeting.field_2546667 !== 0 && meeting.field_2546667 !== null}
                            <p class="text-center">{meeting.field_2546667}</p>
                        {:else}
                            <button
                                class="my-[16px] border-none rounded-[5px]"
                                on:click={() => {
                                    console.log(
                                        "Navigating to addRating with meetingId:",
                                        meeting.id,
                                    );
                                    goto(
                                        `/mentor/addRating?meetingId=${meeting.id}`,
                                    );
                                }}
                            >
                                Add rating
                            </button>
                        {/if}
                    {/if}
                {/each}
            </div>
            <div class="flex flex-col">
                <p class="font-bold">Comment</p>
                {#each data.results as meeting}
                    {#if meeting.id}
                        {#if meeting.field_2546713 !== null && meeting.field_2546713 !== ""}
                            <p class="text-center">{meeting.field_2546713}</p>
                        {:else}
                            <button
                                class="my-[16px] border-none rounded-[5px]"
                                on:click={() => {
                                    console.log(
                                        "Navigating to addComment with meetingId:",
                                        meeting.id,
                                    );
                                    goto(
                                        `/mentor/addComment?meetingId=${meeting.id}`,
                                    );
                                }}
                            >
                                Add comment
                            </button>
                        {/if}
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
    <button
        class="border-none px-3 py-2 rounded-[5px]"
        on:click={() => goto("/mentor/schedule")}>Schedule meeting</button
    >
</div>
