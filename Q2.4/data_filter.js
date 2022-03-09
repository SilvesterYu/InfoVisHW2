export let getDataByMonth = (data, month) => {
    return data.filter( d => d.month.toLowerCase() === month.toLowerCase());
}