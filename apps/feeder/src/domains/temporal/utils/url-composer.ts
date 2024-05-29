export async function composer(endpoint: string, date: string): Promise<string> {
    const data = new URLSearchParams();
    data.append('date', date)

   return `${endpoint}?${data.toString()}`
}