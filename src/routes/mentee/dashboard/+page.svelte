<script>
    import { loggedInId } from "../../../store";
    import { goto } from "$app/navigation";

    let data;
    let menteeId = $loggedInId || 36;
    console.log("menteeID", menteeId);

    async function fetchMeetings() {
        const filters = {
            filter_type: "AND",
            filters: [
                {
                    type: "link_row_has",
                    field: 2546653,
                    value: menteeId,
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
            console.log("Fetched meetings: ", data.results);
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
                <p class="font-bold">Mentor</p>
                {#each data.results as meeting}
                    <p>{meeting.field_2546655[0].value}</p>
                {/each}
            </div>
            <!-- <div class="flex flex-col">
                <p class="font-bold">Rating</p>
                {#each data.results as meeting}
                    {#if meeting.id}
                        <button
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
                {/each}
            </div>
            <div class="flex flex-col">
                <p class="font-bold">Comment</p>
                {#each data.results as meeting}
                    {#if meeting.field_2546713 !== ""}
                        <p>{meeting.field_2546713}</p>
                    {:else}
                        <button>Add comment</button>
                    {/if}
                {/each}
            </div> -->
        </div>
    {/if}
</div>
