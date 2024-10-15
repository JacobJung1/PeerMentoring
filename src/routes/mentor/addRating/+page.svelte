<script>
    import { goto } from "$app/navigation";
    export let meetingId;

    async function setRating(rating) {
        try {
            const response = await fetch(`/api/baserow/344022/${meetingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    field_2546667: rating, // Replace with the field you're updating
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
    <p>Choose Rating</p>
    <button on:click={() => setRating(1)}>1</button>
    <button on:click={() => setRating(2)}>2</button>
    <button on:click={() => setRating(3)}>3</button>
    <button on:click={() => setRating(4)}>4</button>
    <button on:click={() => setRating(5)}>5</button>
</div>
