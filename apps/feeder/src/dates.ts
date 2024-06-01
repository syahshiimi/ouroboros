import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/workflow/humidity';
const headers = {
    'content-type': 'application/json',
};

async function sendRequest(date: string): Promise<void> {
    const body = { date };
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (response.ok) {
        console.log(`Request for ${date} sent successfully`);
    } else {
        console.error(`Request for ${date} failed with status ${response.status}`);
    }
}

async function sendRequestsForDates(): Promise<void> {
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date(2024, 0, 31); // January 31, 2024

    let currentDate = startDate;
    const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds

    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        await sendRequest(formattedDate);

        currentDate = new Date(currentDate.getTime() + oneDay);
    }
}

sendRequestsForDates()
    .then(() => console.log('All requests sent successfully'))
    .catch((error) => console.error('An error occurred:', error));