export const check_inp = inp => {
    check_map(inp);
}

const check_map = inp => {
    const map = inp.Map;
    const friend = inp.Friend;

    // 長さ
    const row_length = map[0].length;
    for (const row of map) {
        console.assert(row.length === row_length, "the rows are not same length.");
    }

    // 入力値
    for (const row of map) {
        for (const tile of row) {
            console.assert([0, 1, 9].indexOf(tile) !== -1, "invalid map input: not in [0, 1, 9]");
        }
    }

    for (const f of friend) {
        const frow = f.place[0];
        const fcol = f.place[1];
        console.assert(map[frow][fcol] === 0, "map for friend is not vacant !");
    }
}
