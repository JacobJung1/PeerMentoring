import { json } from '@sveltejs/kit';

export async function GET({ params, url }) {
  const { tableId } = params;
  const filters = url.searchParams.get('filters');
  const userFieldNames = url.searchParams.get('user_field_names');

  let requestUrl = new URL(`https://api.baserow.io/api/database/rows/table/${tableId}/`);

  if (filters) {
    requestUrl.searchParams.append('filters', filters);
  }

  if (userFieldNames) {
    requestUrl.searchParams.append('user_field_names', userFieldNames);
  }

  try {
    const response = await fetch(requestUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Token ${import.meta.env.VITE_BASEROW_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      console.error('Failed to fetch table rows:', response.statusText);
      return json({ error: 'Failed to fetch table rows' }, { status: response.status });
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST({ params, request }) {
    const { tableId } = params;
    const body = await request.json();
    
    try {
      const url = `https://api.baserow.io/api/database/rows/table/${tableId}/`;
      console.log('POST request URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${import.meta.env.VITE_BASEROW_API_TOKEN}`
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        console.error('Failed to insert data:', response.statusText);
        return json({ error: 'Failed to insert data into Baserow' }, { status: response.status });
      }
  
      const data = await response.json();
      return json(data, { status: 201 });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return json({ error: 'Failed to insert data into Baserow' }, { status: 500 });
    }
}
export async function PATCH({ params, request }) {
  const { tableId, rowId } = params;
  const body = await request.json();

  try {
    const url = `https://api.baserow.io/api/database/rows/table/${tableId}/${rowId}/`;
    console.log('PATCH request URL:', url);

    const response = await fetch(url, {
      method: 'PATCH', // Use PATCH for partial updates
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${import.meta.env.VITE_BASEROW_API_TOKEN}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error('Failed to update row:', response.statusText);
      return json({ error: 'Failed to update row in Baserow' }, { status: response.status });
    }

    const data = await response.json();
    return json(data, { status: 200 });

  } catch (error) {
    console.error('Error updating row:', error);
    return json({ error: 'Failed to update row in Baserow' }, { status: 500 });
  }
}