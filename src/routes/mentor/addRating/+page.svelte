<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    $: meetingId = $page.url.searchParams.get("meetingId");

    async function addRating(rating) {
        try {
            const response = await fetch(`/api/baserow/344022/${meetingId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    field_2546667: rating,
                }),
            });

            if (!response.ok) {
                console.error("Failed to update the row:", response.statusText);
                return;
            }

            const data = await response.json();
            console.log("Row updated successfully:", data);

            goto("/mentor/dashboard");
        } catch (error) {
            console.error("Error updating the row:", error);
        }
    }
</script>

<div class="flex flex-col items-left justify-center">
    <p>Meeting ID: {meetingId}</p>
    <div class="flex flex-row items-center gap-2">
        <p>Choose Rating:</p>
        <div>
            <button on:click={() => addRating(1)}>1</button>
            <button on:click={() => addRating(2)}>2</button>
            <button on:click={() => addRating(3)}>3</button>
            <button on:click={() => addRating(4)}>4</button>
            <button on:click={() => addRating(5)}>5</button>
        </div>
    </div>
</div>
