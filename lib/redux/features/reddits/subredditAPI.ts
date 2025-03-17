export async function fetchSubreddit(subredditName: string) {
    try {
        const response = await fetch(
            `https://www.reddit.com/r/${subredditName}.json`
        );
        const { data: { children } = {}} = await response.json();


        return {
            data: children,
        };
    } catch (error) {
        console.error('Error fetching subreddit data:', error);
        return {
            data: [],
        };
    }
}
