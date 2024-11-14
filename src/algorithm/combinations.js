const combinations = (array, size, uniqueCombinationsOnly = true) => {
    let result = [];

    const generate = (current, remaining) => {
        result.push(current);

        for (let i = 0; i < remaining.length; i++) {
            generate([...current, remaining[i]], remaining.slice(i + 1));
        }
    };

    generate([], array);

    result = result.filter((r) => r.length === size);

    if (uniqueCombinationsOnly) {
        const uniqueResults = [];
        const uniqueResultsSet = new Set();
        for (let r of result) {
            const sorted = r.slice().sort();
            const key = sorted.join(',');
            if (!uniqueResultsSet.has(key)) {
                uniqueResults.push(r);
                uniqueResultsSet.add(key);
            }
        }
        return uniqueResults;
    }

    return result;
}

export default combinations;