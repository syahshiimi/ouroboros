export async function greet(message: string): Promise<string> {
    console.log(message)
    return `Hi! ${message}`
}