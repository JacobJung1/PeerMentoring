<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    $: meetingId = $page.url.searchParams.get("meetingId");
    let comment = "";

    async function addComment() {
        try {
            const response = await fetch(`/api/baserow/344022/${meetingId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    field_2546713: comment,
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
    <textarea rows="5" bind:value={comment}></textarea>
    <button class="mt-5" on:click={() => addComment()}>Save</button>
</div>
