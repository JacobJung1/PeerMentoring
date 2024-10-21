import { json } from '@sveltejs/kit';

export async function PATCH({ params, request }) {
    const { tableId, rowId } = params; // Ensure rowId is correctly passed
    const body = await request.json(); // Parse the request body

    try {
        const url = `https://api.baserow.io/api/database/rows/table/${tableId}/${rowId}/`; // Check URL format
        console.log('PATCH request URL:', url);

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${import.meta.env.VITE_BASEROW_API_TOKEN}` // Verify token
            },
            body: JSON.stringify(body) // Ensure body is correctly formatted
        });

        if (!response.ok) {
            console.error('Failed to update data:', response.statusText);
            return json({ error: 'Failed to update data in Baserow' }, { status: response.status });
        }

        const data = await response.json();
        return json(data, { status: 200 });

    } catch (error) {
        console.error('Error updating data:', error);
        return json({ error: 'Failed to update data in Baserow' }, { status: 500 });
    }
}
